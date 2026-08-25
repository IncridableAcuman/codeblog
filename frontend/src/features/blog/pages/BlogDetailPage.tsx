import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useBlogDetail } from '../hooks/useBlogDetail';
import { BlogHeader } from '../components/BlogHeader';
import { BlogContent } from '../components/BlogContent';
import { BlogComments } from '../components/BlogComments';
import { FiHeart } from 'react-icons/fi';

export const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const pdfRef = useRef<HTMLDivElement>(null);

  const {
    user,
    loading,
    post,
    comments,
    commentText,
    setCommentText,
    isLiked,
    handleLike,
    handleCommentSubmit
  } = useBlogDetail(id);

  if (loading) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 animate-pulse">
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
          <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
        </div>
    );
  }

  if (!post) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Maqola topilmadi</h2>
        </div>
    );
  }

  return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <BlogHeader />

          {/* Like tugmasi */}
          <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isLiked
                      ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
          >
            <FiHeart className={isLiked ? 'fill-current text-red-500' : ''} />
            <span>{post.likes}</span>
          </button>
        </div>

        <BlogContent post={post} pdfRef={pdfRef} />

        <hr className="border-slate-100 dark:border-slate-800" />

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