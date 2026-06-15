import { useState, useEffect, useMemo } from 'react';
import { blogApiService } from '../../../services/blogService';
import { UseAuth } from '../../../context/AuthContext';
import type { BlogPost } from '../../../types/blog';

export const useDashboard = () => {
  const { user } = UseAuth();
  const [loading,setLoading] = useState(true);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    blogApiService.getAllBlogs()
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Maqolalarni yuklashda xatolik:", err))
      .finally(() => setLoading(false));
  }, [setLoading]);

  // Faqat joriy foydalanuvchiga tegishli maqolalar
  const myPosts = useMemo(() => {
    if (!user) return [];
    return blogs.filter((post) => post.user?.id === user.id);
  }, [blogs, user]);

  // Statistikalar
  const totalViews = useMemo(() => myPosts.reduce((acc, curr) => acc + (curr.views || 0), 0), [myPosts]);
  const totalLikes = useMemo(() => myPosts.reduce((acc, curr) => acc + (curr.likes || 0), 0), [myPosts]);

  const handleDelete = (id: number, title: string) => {
    if (window.confirm(`"${title}" maqolasini o‘chirib tashlamoqchimisiz?`)) {
      blogApiService.deleteBlog(id)
        .then(() => {
          alert("Maqola muvaffaqiyatli o‘chirildi.");
          setBlogs((prev) => prev.filter((b) => b.id !== id));
        })
        .catch((err) => {
          console.error("O'chirishda xatolik yuz berdi:", err);
          alert("Maqolani o‘chirish imkoni bo‘lmadi.");
        });
    }
  };

  return {
    loading,
    myPosts,
    totalViews,
    totalLikes,
    handleDelete
  };
};