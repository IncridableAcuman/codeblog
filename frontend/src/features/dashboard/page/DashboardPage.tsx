import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiBookOpen, FiEye, FiHeart, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { blogApiService } from '../../../services/blogService'; // Real API ulanishi
import { UseAuth } from '../../../context/AuthContext'; // Foydalanuvchini aniqlash uchun
import type { BlogPost } from '../../../types/blog';

export const DashboardPage: React.FC = () => {
  const { user } = UseAuth();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Ma'lumotlarni yuklash funksiyasi


  useEffect(() => {
      const fetchMyBlogs = () => {
    setLoading(true);
    blogApiService.getAllBlogs()
      .then((data) => {
        setBlogs(data);
      })
      .catch((err) => console.error("Maqolalarni yuklashda xatolik:", err))
      .finally(() => setLoading(false));
  };
  fetchMyBlogs()
  }, []);

  // Faqat joriy tizimga kirgan foydalanuvchiga tegishli maqolalarni filtrlaymiz
  const myPosts = useMemo(() => {
    if (!user) return [];
    // Backend DTO dagi `user.id` bilan context dagi `user.id` solishtiriladi
    return blogs.filter((post) => post.user?.id === user.id);
  }, [blogs, user]);

  // Statistikani hisoblash
  const totalViews = useMemo(() => myPosts.reduce((acc, curr) => acc + (curr.views || 0), 0), [myPosts]);
  const totalLikes = useMemo(() => myPosts.reduce((acc, curr) => acc + (curr.likes || 0), 0), [myPosts]);

  // Maqolani o'chirish mantig'i
  const handleDelete = (id: number, title: string) => {
    if (window.confirm(`"${title}" maqolasini o‘chirib tashlamoqchimisiz?`)) {
      blogApiService.deleteBlog(id) // Xizmatda deleteBlog(id) mavjud deb hisoblaymiz
        .then(() => {
          alert("Maqola muvaffaqiyatli o‘chirildi.");
          // State'ni yangilash (qaytadan chaqirmasdan o'zini o'chirish)
          setBlogs((prev) => prev.filter((b) => b.id !== id));
        })
        .catch((err) => {
          console.error("O'chirishda xatolik yuz berdi:", err);
          alert("Maqolani o‘chirish imkoni bo‘lmadi.");
        });
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-slate-600 dark:text-slate-400">Dashboard yuklanmoqda...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Sarlavha qismi */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Boshqaruv paneli
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Maqolalaringiz statistikasi va ularni boshqarish tizimi.
          </p>
        </div>
        <Link
          to="/create-post"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all self-start"
        >
          <FiPlus /> Yangi maqola
        </Link>
      </div>

      {/* Statistika Kartalari Grid paneli */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl"><FiBookOpen size={22} /></div>
          <div>
            <p className="text-xs font-medium text-slate-400">Maqolalarim</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{myPosts.length} ta</h4>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl"><FiEye size={22} /></div>
          <div>
            <p className="text-xs font-medium text-slate-400">Ko‘rishlar soni</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{totalViews} marta</h4>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-xl"><FiHeart size={22} /></div>
          <div>
            <p className="text-xs font-medium text-slate-400">Umumiy Likelar</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{totalLikes} ta</h4>
          </div>
        </div>
      </div>

      {/* Maqolalar Jadvali */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700">
          <h3 className="font-bold text-slate-900 dark:text-white">Mening maqolalarim</h3>
        </div>
        <div className="overflow-x-auto">
          {myPosts.length > 0 ? (
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
                {myPosts.map((post) => (
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
                        <Link 
                          to={`/edit-post/${post.id}`}
                          className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition-all inline-block"
                        >
                          <FiEdit2 size={16} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(post.id, post.title)}
                          className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-all"
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
    </div>
  );
};