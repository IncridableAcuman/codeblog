import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogApiService } from '../../../services/blogService';
import type { BlogCategory } from '../../../types/blog';

export const useCreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<BlogCategory>('FRONTEND');
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      alert("Iltimos, maqola uchun muqova rasmini yuklang!");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('content', content);
    formData.append('category', category);
    formData.append('image', image);

    try {
      await blogApiService.createBlog(formData);
      alert("Maqola muvaffaqiyatli chop etildi!");
      navigate('/');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Xatolik yuz berdi!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    title, setTitle,
    description, setDescription,
    content, setContent,
    category, setCategory,
    image, handleFileChange,
    isSubmitting,
    handleSubmit
  };
};