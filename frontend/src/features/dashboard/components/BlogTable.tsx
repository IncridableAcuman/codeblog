import React from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiHeart, FiEdit2, FiTrash2 } from 'react-icons/fi';
import type { BlogPost } from '../../../types/blog';

interface ExtendedBlogTableProps {
  posts: BlogPost[];
  onDelete: (id: number, title: string) => void;
  onEditClick: (post: BlogPost) => void; // Modalni ochish uchun yangi prop
}

export const BlogTable: React.FC<ExtendedBlogTableProps> = ({ posts, onDelete, onEditClick }) => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700">
      <h3 className="font-bold text-slate-900 dark:text-white">Mening maqolalarim</h3>
    </div>
    <div className="overflow-x-auto">
      {posts.length > 0 ? (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 dark:bg-slate-900/40 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase border-b border-slate-100 dark:border-slate-700">
              <th className="px-6 py-3.5">Mavzu</th>
              <th className="px-6 py-3.5">Kategoriya</th>
              <th className="px-6 py-3.5">Sana</th>
              <th className="px-6 py-3.5">Statistika</th>
              <th className="px-6 py-3.5 text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm text-slate-700 dark:text-slate-300">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white max-w-xs truncate">
                  <Link to={`/blog/${post.id}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {post.title}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs px-2.5 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 font-medium">
                    {post.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-slate-500">
                  {post.createdAt ? new Date(post.createdAt).toLocaleDateString('uz-UZ') : "Noma'lum"}
                </td>
                <td className="px-6 py-4 text-xs">
                  <div className="flex items-center gap-3 text-slate-500">
                    <span className="flex items-center gap-1"><FiEye /> {post.views}</span>
                    <span className="flex items-center gap-1"><FiHeart /> {post.likes}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {/* Link o'rniga Dialog ochuvchi Button o'rnatildi */}
                    <button 
                      onClick={() => onEditClick(post)}
                      title="Tahrirlash"
                      className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition-all cursor-pointer"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button 
                      onClick={() => onDelete(post.id, post.title)}
                      title="O'chirish"
                      className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-all cursor-pointer"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-12 text-slate-500 dark:text-slate-400">
          Sizda hali yozilgan maqolalar mavjud emas.
        </div>
      )}
    </div>
  </div>
);