import React, {  useRef } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiMessageSquare } from 'react-icons/fi';
import { useBlogDetail } from '../hooks/useBlogDetail';
import { Link, useParams } from 'react-router-dom';
import { BlogHeader } from '../components/BlogHeader';
import { BlogContent } from '../components/BlogContent';
import { BlogComments } from '../components/BlogComments';



export const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  // Custom Hook orqali barcha ma'lumotlar va mantiqni olamiz
  const {
    user,
    loading,
    post,
    comments,
    commentText,
    setCommentText,
    isLiked,
    handleLike,
    handleCommentSubmit,
  } = useBlogDetail(id);


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

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 1. Sarlavha Paneli */}
      <BlogHeader />

      {/* 2. Asosiy Maqola Mazmuni */}
      <BlogContent post={post} pdfRef={pdfContainerRef} />

      {/* 3. Interaktiv Reyting Paneli */}
      <div className="flex items-center justify-between py-4 border-y border-slate-100 dark:border-slate-800">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            isLiked ? 'bg-red-50 dark:bg-red-950/30 text-red-500' : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-red-500'
          }`}
        >
          <motion.div animate={{ scale: isLiked ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.3 }}>
            <FiHeart className={isLiked ? 'fill-current text-red-500' : ''} size={18} />
          </motion.div>
          <span>{post.likes} Likelar</span>
        </motion.button>

        <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <FiMessageSquare /> {comments.length} ta fikrlar
        </div>
      </div>

      {/* 4. Izohlar Tizimi */}
      <BlogComments
        user={user}
        comments={comments}
        commentText={commentText}
        setCommentText={setCommentText}
        onSubmit={handleCommentSubmit}
      />
    </div>
  );
};