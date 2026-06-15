import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { BlogCommentsProps } from '../interfaces/BlogCommentsProps';

export const BlogComments: React.FC<BlogCommentsProps> = ({ user, comments, commentText, setCommentText, onSubmit }) => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Fikr-mulohazalar</h3>

    {user ? (
      <form onSubmit={onSubmit} className="space-y-3">
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
);