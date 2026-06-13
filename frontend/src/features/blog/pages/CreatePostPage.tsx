import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Yo'naltirish uchun
import {  FiUpload } from 'react-icons/fi'; // Rasm uchun belgi
import type { BlogCategory } from '../../../types/blog';
import { RichEditor } from '../../../components/editor/RichEditor';
import { blogApiService } from '../../../services/blogService'; // API import

const CATEGORIES: BlogCategory[] = ['FRONTEND', 'BACKEND'];

export const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<BlogCategory>('FRONTEND');
  const [image, setImage] = useState<File | null>(null); // Rasm uchun state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // AI State-lari
  // const [aiPrompt, setAiPrompt] = useState('');
  // const [aiResponse, setAiResponse] = useState('');
  // const [isAiLoading, setIsAiLoading] = useState(false);

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

    // Backend @ModelAttribute kutayotgani uchun FormData ochamiz
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('content', content);
    formData.append('category', category);
    formData.append('image', image); // MultipartFile rasm

    try {
      await blogApiService.createBlog(formData);
      alert("Maqola muvaffaqiyatli chop etildi!");
      navigate('/'); // Bosh sahifaga qaytish
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Xatolik yuz berdi!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... AI generatsiya funksiyasi joyida qoladi ...

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Yangi maqola yozish
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Sarlavha */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Maqola sarlavhasi
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Sarlavha..."
            />
          </div>

          {/* Muqova rasmi yuklash (Yangi qo'shildi) */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Muqova rasmi
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:border-slate-700 dark:hover:bg-slate-700">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FiUpload className="w-8 h-8 mb-3 text-slate-400" />
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {image ? `Tanlangan rasm: ${image.name}` : "Rasm yuklash uchun bosing yoki sudrab keling"}
                  </p>
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} required />
              </label>
            </div>
          </div>

          {/* Kategoriya va Qisqa tavsif */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Kategoriya</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as BlogCategory)}
                className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white-sm"
              >
                {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Qisqa tavsif</label>
              <input
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Rich Text Editor */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Maqola kontenti</label>
            <RichEditor content={content} onChange={setContent} />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl disabled:opacity-50"
            >
              {isSubmitting ? "Chop etilmoqda..." : "Maqolani chop etish"}
            </button>
          </div>
        </form>
      </div>

      {/* AI Assistant paneli o'zgarishsiz qoladi... */}
    </div>
  );
};