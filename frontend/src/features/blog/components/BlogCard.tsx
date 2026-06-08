import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEye, FiHeart, FiMessageSquare } from 'react-icons/fi';
import type { BlogPost } from '../../../types/blog';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <motion.article
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="flex flex-col bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-750 transition-all duration-300"
    >
      {/* Muqova rasmi */}
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <span className="absolute top-4 left-4 text-xs font-semibold px-2.5 py-1 bg-blue-600/90 text-white backdrop-blur-sm rounded-lg">
          {post.category}
        </span>
      </div>

      {/* Kontent qismi */}
      <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Muallif ma'lumoti */}
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <img src={post.author.avatarUrl} alt={post.author.fullName} className="w-5 h-5 rounded-full object-cover" />
            <span>{post.author.fullName}</span>
            <span>•</span>
            <span>{post.createdAt}</span>
          </div>

          {/* Sarlavha */}
          <Link to={`/blog/${post.id}`}>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2">
              {post.title}
            </h3>
          </Link>

          {/* Qisqa matn */}
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
            {post.description}
          </p>
        </div>

        {/* Statistika va tugma */}
        <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><FiEye /> {post.views}</span>
            <span className="flex items-center gap-1 text-red-500"><FiHeart className="fill-current" /> {post.likes}</span>
            <span className="flex items-center gap-1"><FiMessageSquare /> {post.comments.length}</span>
          </div>
          
          <Link to={`/blog/${post.id}`} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            O‘qish →
          </Link>
        </div>
      </div>
    </motion.article>
  );
};