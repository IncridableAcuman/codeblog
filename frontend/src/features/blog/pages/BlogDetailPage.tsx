import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiEye, FiCalendar, FiUser, FiArrowLeft, FiMessageSquare, FiDownload } from 'react-icons/fi';
import html2pdf from 'html2pdf.js';
import { UseAuth } from '../../../context/AuthContext';
import { blogApiService } from '../../../services/blogService';
import type { BlogPost } from '../../../types/blog';

// Izohlar uchun interfeys (Backend CommentResponse modeliga mos)
interface CommentType {
  id: number;
  user: {
    id: number;
    fullName: string;
    avatarUrl?: string;
  };
  content: string;
  createdAt: string;
}

export const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = UseAuth();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]); // 🌟 Haqiqiy kommentariyalar uchun state
  const [loading, setLoading] = useState<boolean>(true);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const pdfContainerRef = useRef<HTMLDivElement>(null);

  // Ma'lumotlarni yuklab olish
  useEffect(() => {
    if (id) {
      setLoading(true);
      // 🌟 Maqola va izohlarni parallel yuklaymiz (Performance uchun optimization)
      Promise.all([
        blogApiService.getBlogById(id),
        blogApiService.getComments(id)
      ])
        .then(([postData, commentsData]) => {
          setPost(postData);
          setIsLiked(postData.isLiked);
          setComments(commentsData); // Backenddan kelgan real izohlar
        })
        .catch((err) => {
          console.error("Ma'lumotlarni yuklashda xatolik:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-slate-600 dark:text-slate-400">Maqola yuklanmoqda...</div>;
  }

  if (!post) {
    return (
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">Maqola topilmadi</h2>
          <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block">Bosh sahifaga qaytish</Link>
        </div>
    );
  }

  const authorName = post.user?.fullName || "Noma'lum muallif";
  const dateFormatted = post.createdAt ? new Date(post.createdAt).toLocaleDateString('uz-UZ') : "Yaqinda";

  const imageUrl = post.coverImage
      ? `http://localhost:8080/files/${post.coverImage}`
      : "https://images.unsplash.com/photo-1677442136019-21780efad99a";

  const handleDownloadPDF = () => {
    if (!pdfContainerRef.current) return;
    setIsDownloading(true);

    const element = pdfContainerRef.current;
    const options = {
      margin:       [15, 15, 15, 15],
      filename:     `${post.title.toLowerCase().replace(/ /g, '-')}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, letterRendering: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf()
        .from(element)
        .set(options)
        .save()
        .then(() => setIsDownloading(false))
        .catch((err: any) => {
          console.error(err);
          setIsDownloading(false);
        });
  };

  const handleLike = async () => {
    if (!user) {
      alert("Like bosish uchun avval tizimga kiring!");
      return;
    }

    try {
      const currentLikedStatus = isLiked;
      setIsLiked(!currentLikedStatus);
      setPost((prev: any) =>
          prev ? { ...prev, likes: currentLikedStatus ? prev.likes - 1 : prev.likes + 1 } : null
      );

      await blogApiService.toggleLike(post.id);
    } catch (err) {
      console.error("Like bosishda xatolik yuz berdi:", err);
      setIsLiked(isLiked);
      setPost((prev: any) =>
          prev ? { ...prev, likes: isLiked ? prev.likes + 1 : prev.likes - 1 } : null
      );
      alert("Tizimda xatolik, like saqlanmadi.");
    }
  };

  // 🌟 Real API ga izoh yuborish mantiqi
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !user) return;

    try {
      // API orqali backendga saqlash (/api/v1/blogs/{id}/comments)
      const savedComment = await blogApiService.addComment(post.id, commentText);
      
      // Backend qaytargan real yangi izohni ro'yxatning eng yuqorisiga qo'shish
      setComments((prev) => [savedComment, ...prev]);
      setCommentText('');
    } catch (err) {
      console.error("Izoh qoldirishda xatolik:", err);
      alert("Izoh yuborishda muammo yuz berdi. Qaytadan urinib ko'ring.");
    }
  };

  return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <FiArrowLeft /> Bosh sahifaga qaytish
          </Link>

          <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-all active:scale-95 disabled:opacity-50 shadow-sm"
          >
            <FiDownload className={isDownloading ? "animate-bounce" : ""} />
            {isDownloading ? "Tayyorlanmoqda..." : "PDF yuklash"}
          </button>
        </div>

        <div ref={pdfContainerRef} className="space-y-6 bg-transparent p-1">
          <div className="space-y-4">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-lg">
            {post.category}
          </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 pt-2 border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="flex items-center gap-1.5"><FiUser /> {authorName}</span>
              <span className="flex items-center gap-1.5"><FiCalendar /> {dateFormatted}</span>
              <span className="flex items-center gap-1.5"><FiEye /> {post.views} marta ko‘rilgan</span>
            </div>
          </div>

          <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img src={imageUrl} alt={post.title} crossOrigin="anonymous" className="w-full h-full object-cover" />
          </div>

          <div
              className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        <div className="flex items-center justify-between py-4 border-y border-slate-100 dark:border-slate-800">
          <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isLiked
                      ? 'bg-red-50 dark:bg-red-950/30 text-red-500'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-red-500'
              }`}
          >
            <motion.div animate={{ scale: isLiked ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.3 }}>
              <FiHeart className={isLiked ? 'fill-current text-red-500' : ''} size={18} />
            </motion.div>
            <span>{post.likes} Likelar</span>
          </motion.button>

          <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            {/* 🌟 Local array uzunligi real-time aks ettiriladi */}
            <FiMessageSquare /> {comments.length} ta fikrlar
          </div>
        </div>

        {/* Kommentariyalar bo'limi */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Fikr-mulohazalar</h3>

          {user ? (
              <form onSubmit={handleCommentSubmit} className="space-y-3">
            <textarea
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                placeholder="Fikringizni qoldiring..."
                required
            />
                <div className="flex justify-end">
                  <button type="submit" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition-all shadow-sm">
                    Yuborish
                  </button>
                </div>
              </form>
          ) : (
              <p className="text-sm p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-slate-500 dark:text-slate-400 text-center border border-dashed border-slate-200 dark:border-slate-700">
                Fikr qoldirish uchun iltimos <Link to="/login" className="text-blue-600 dark:text-blue-400 underline font-medium">tizimga kiring</Link>.
              </p>
          )}

          <div className="space-y-4">
            <AnimatePresence>
              {comments.map((comment) => (
                  <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      key={comment.id}
                      className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-750 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img 
                          src={comment.user?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'} 
                          alt={comment.user?.fullName} 
                          className="w-6 h-6 rounded-full object-cover" 
                        />
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">{comment.user?.fullName}</span>
                      </div>
                      <span className="text-xs text-slate-400">
                        {new Date(comment.createdAt).toLocaleDateString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 pl-8 leading-relaxed">
                      {comment.content}
                    </p>
                  </motion.div>
              ))}
            </AnimatePresence>

            {comments.length === 0 && (
                <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-6">Hali hech kim fikr bildirmagan. Birinchi bo‘ling!</p>
            )}
          </div>
        </div>
      </div>
  );
};