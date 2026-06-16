import { useState, useEffect, useMemo } from 'react';
import { blogApiService } from '../../../services/blogService';
import { UseAuth } from '../../../context/AuthContext';
import type { BlogPost } from '../../../types/blog';

export const useDashboard = () => {
  const { user } = UseAuth();
  const [loading, setLoading] = useState(true);
  const [myPosts, setMyPosts] = useState<BlogPost[]>([]);
  
  // Modal boshqaruvi uchun statelar
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    blogApiService.getMyBlogs()
      .then((data) => setMyPosts(data))
      .catch((err) => console.error("Yuklashda xatolik:", err))
      .finally(() => setLoading(false));
  }, [user]);

  // Tahrirlash tugmasi bosilganda modalni ochish
  const openEditModal = (post: BlogPost) => {
    setSelectedPost(post);
    setIsEditModalOpen(true);
  };

  // Backendga o'zgarishlarni yuborish mantiqi
  const handleEditSave = async (id: number, formData: FormData) => {
    try {
      // blogApiService dagi 5-metod chaqiriladi (@PatchMapping)
      const updatedPost = await blogApiService.editBlog(id, formData);
      
      // Statedagi eski maqolani yangisiga almashtirish
      setMyPosts((prev) => prev.map((post) => post.id === id ? updatedPost : post));
      alert("Maqola muvaffaqiyatli yangilandi!");
    } catch (err) {
      console.error("Yangilashda xatolik:", err);
      alert("Maqolani yangilab bo'lmadi.");
      throw err;
    }
  };

  // O'chirish (Delete) mantiqi
  const handleDelete = (id: number, title: string) => {
    if (window.confirm(`"${title}" maqolasini o‘chirib tashlamoqchimisiz?`)) {
      blogApiService.deleteBlog(id)
        .then(() => {
          alert("Maqola muvaffaqiyatli o‘chirildi.");
          setMyPosts((prev) => prev.filter((b) => b.id !== id));
        })
        .catch((err) => console.error(err));
    }
  };

  const totalViews = useMemo(() => myPosts.reduce((acc, curr) => acc + (curr.views || 0), 0), [myPosts]);
  const totalLikes = useMemo(() => myPosts.reduce((acc, curr) => acc + (curr.likes || 0), 0), [myPosts]);

  return {
    loading,
    myPosts,
    totalViews,
    totalLikes,
    handleDelete,
    // Yangi qo'shilganlar:
    isEditModalOpen,
    setIsEditModalOpen,
    selectedPost,
    openEditModal,
    handleEditSave
  };
};