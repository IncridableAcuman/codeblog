import React from 'react';
import { FiUser, FiCalendar, FiEye } from 'react-icons/fi';
import type { BlogContentProps } from '../interfaces/BlogContentProps';

export const BlogContent: React.FC<BlogContentProps> = ({ post, pdfRef }) => {
  const authorName = post.user?.fullName || "Noma'lum muallif";
  const dateFormatted = post.createdAt ? new Date(post.createdAt).toLocaleDateString('uz-UZ') : "Yaqinda";
  const imageUrl = post.coverImage
    ? `http://localhost:8080/files/${post.coverImage}`
    : "https://images.unsplash.com/photo-1677442136019-21780efad99a";

  return (
    <div ref={pdfRef} className="space-y-6 bg-transparent p-1">
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
  );
};