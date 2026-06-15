import { useState, useEffect } from 'react';
import { blogApiService } from '../../../services/blogService';
import { UseAuth } from '../../../context/AuthContext';
import type { BlogPost } from '../../../types/blog';
import type { CommentType } from '../../../types/comment';

export const useBlogDetail = (id: string | undefined) => {
  const { user, loading, setLoading } = UseAuth();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      Promise.all([
        blogApiService.getBlogById(id),
        blogApiService.getComments(id)
      ])
        .then(([postData, commentsData]) => {
          setPost(postData);
          setIsLiked(postData.isLiked);
          setComments(commentsData);
        })
        .catch((err) => console.error("Ma'lumotlarni yuklashda xatolik:", err))
        .finally(() => setLoading(false));
    }
  }, [id, setLoading]);

  const handleLike = async () => {
    if (!user || !post) return alert("Like bosish uchun avval tizimga kiring!");

    const currentLikedStatus = isLiked;
    setIsLiked(!currentLikedStatus);
    setPost((prev) => prev ? { ...prev, likes: currentLikedStatus ? prev.likes - 1 : prev.likes + 1 } : null);

    try {
      await blogApiService.toggleLike(post.id);
    } catch (err) {
      console.error(err);
      setIsLiked(currentLikedStatus);
      setPost((prev) => prev ? { ...prev, likes: currentLikedStatus ? prev.likes + 1 : prev.likes - 1 } : null);
      alert("Tizimda xatolik, like saqlanmadi.");
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !user || !post) return;

    try {
      const savedComment = await blogApiService.addComment(post.id, commentText);
      setComments((prev) => [savedComment, ...prev]);
      setCommentText('');
    } catch (err) {
      console.error(err);
      alert("Izoh yuborishda muammo yuz berdi.");
    }
  };

  return {
    user,
    loading,
    post,
    comments,
    commentText,
    setCommentText,
    isLiked,
    handleLike,
    handleCommentSubmit
  };
};