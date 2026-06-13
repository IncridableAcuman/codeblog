import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEye, FiHeart } from 'react-icons/fi';
import type { BlogPost } from '../../../types/blog';

interface BlogCardProps {
  post: BlogPost; // Endi to'liq tiplashtirilgan
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  // Backenddan kelayotgan user ma'lumotlari
  const authorName = post.user?.fullName || "Noma'lum muallif";
  const avatar = post.user?.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100";
  
  // Sana formatlash (2026-06-13T14:15... -> 13.06.2026)
  const dateFormatted = post.createdAt ? new Date(post.createdAt).toLocaleDateString('uz-UZ') : "Yaqinda";

  // Backend rasm nomini qaytaradi (masalan: "uuid-image.png"), unga to'liq URL beramiz
  const imageUrl = post.coverImage 
    ? `http://localhost:8080/files/${post.coverImage}` // Backend static resurslar yo'li
    : "https://images.unsplash.com/photo-1677442136019-21780efad99a";

  return (
    <motion.article
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="flex flex-col bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-750 transition-all duration-300"
    >
      {/* Muqova rasmi */}
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        <img 
          src={imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover" 
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
            <img src={avatar} alt={authorName} className="w-5 h-5 rounded-full object-cover" />
            <span>{authorName}</span>
            <span>•</span>
            <span>{dateFormatted}</span>
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

        {/* Statistika va O'qish tugmasi */}
        <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><FiEye /> {post.views}</span>
            <span className="flex items-center gap-1 text-red-500"><FiHeart className="fill-current" /> {post.likes}</span>
          </div>
          
          <Link to={`/blog/${post.id}`} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            O‘qish →
          </Link>
        </div>
      </div>
    </motion.article>
  );
};