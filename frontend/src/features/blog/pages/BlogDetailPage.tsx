import React, { useState, useEffect, useRef } from 'react'; // 1. useRef qo'shildi
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiEye, FiCalendar, FiUser, FiArrowLeft, FiMessageSquare, FiDownload } from 'react-icons/fi'; // 2. FiDownload qo'shildi
import { mockBlogs } from '../../../services/mockData';
// @ts-ignore (html2pdf uchun turlar topilmasa xatolik bermasligi uchun)
import html2pdf from 'html2pdf.js';
import { UseAuth } from '../../../context/AuthContext';
import type { BlogPost } from '../../../types/blog';

export const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = UseAuth();
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // PDF-ga chiqarilishi kerak bo'lgan soha uchun ref
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const foundPost = mockBlogs.find((b) => b.id === id);
    if (foundPost) {
      setPost(foundPost);
    }
  }, [id]);

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">Maqola topilmadi</h2>
        <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block">Bosh sahifaga qaytish</Link>
      </div>
    );
  }

  // PDF yaratish va yuklab olish mantig'i
  const handleDownloadPDF = () => {
    if (!pdfContainerRef.current) return;
    setIsDownloading(true);

    const element = pdfContainerRef.current;
    
    // PDF sozlamalari
    const options = {
      margin:       [15, 15, 15, 15],
      filename:     `${post.title.toLowerCase().replace(/ /g, '-')}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, letterRendering: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Eksport qilish
    html2pdf()
      .from(element)
      .set(options)
      .save()
      .then(() => {
        setIsDownloading(false);
      })
      .catch((err: any) => {
        console.error(err);
        setIsDownloading(false);
      });
  };

  const handleLike = () => {
    if (!isAuthenticated) {
      alert("Like bosish uchun avval tizimga kiring!");
      return;
    }
    setIsLiked(!isLiked);
    setPost((prev) => 
      prev ? { ...prev, likes: isLiked ? prev.likes - 1 : prev.likes + 1 } : null
    );
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !user) return;

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: {
        id: user.id,
        fullName: user.fullName,
        avatarUrl: user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
      },
      content: commentText,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setPost((prev) => 
      prev ? { ...prev, comments: [newComment, ...prev.comments] } : null
    );
    setCommentText('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Yuqori boshqaruv paneli (Tugmalar) */}
      <div className="flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <FiArrowLeft /> Bosh sahifaga qaytish
        </Link>

        {/* PDF Yuklab olish tugmasi */}
        <button
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-all active:scale-95 disabled:opacity-50 shadow-sm"
        >
          <FiDownload className={isDownloading ? "animate-bounce" : ""} />
          {isDownloading ? "Tayyorlanmoqda..." : "PDF yuklash"}
        </button>
      </div>

      {/* 🌟 MANA SHU REF ICHIDAGI ELEMENTLARGINA PDF'GA CHIQADI */}
      <div ref={pdfContainerRef} className="space-y-6 bg-transparent p-1">
        {/* Maqola sarlavhasi va metama'lumotlari */}
        <div className="space-y-4">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-lg">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 pt-2 border-b border-slate-100 dark:border-slate-800 pb-4">
            <span className="flex items-center gap-1.5"><FiUser /> {post.author.fullName}</span>
            <span className="flex items-center gap-1.5"><FiCalendar /> {post.createdAt}</span>
            <span className="flex items-center gap-1.5"><FiEye /> {post.views} marta ko‘rilgan</span>
          </div>
        </div>

        {/* Maqola muqova rasmi */}
        <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Maqola matni */}
        <div 
          className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      {/* Like va Interaktiv tugmalar paneli (PDF-ga kirmaydi) */}
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
          <FiHeart className={isLiked ? 'fill-current text-red-500' : ''} size={18} />
          <span>{post.likes} Likelar</span>
        </motion.button>

        <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <FiMessageSquare /> {post.comments.length} ta fikrlar
        </div>
      </div>

      {/* Kommentariyalar Bo‘limi (PDF-ga kirmaydi) */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Fikr-mulohazalar</h3>

        {/* Komment yozish formasi */}
        {isAuthenticated ? (
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

        {/* Sharhlar ro‘yxati */}
        <div className="space-y-4">
          <AnimatePresence>
            {post.comments.map((comment) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                key={comment.id}
                className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-750 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={comment.author.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'} alt={comment.author.fullName} className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{comment.author.fullName}</span>
                  </div>
                  <span className="text-xs text-slate-400">{comment.createdAt}</span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 pl-8 leading-relaxed">
                  {comment.content}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>

          {post.comments.length === 0 && (
            <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-6">Hali hech kim fikr bildirmagan. Birinchi bo‘ling!</p>
          )}
        </div>
      </div>
    </div>
  );
};