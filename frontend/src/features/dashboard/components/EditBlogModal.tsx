import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import type { BlogPost } from '../../../types/blog';

interface EditBlogModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: number, formData: FormData) => Promise<void>;
}

export const EditBlogModal: React.FC<EditBlogModalProps> = ({ post, isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Modal ochilganda tanlangan maqola ma'lumotlarini formaga yuklash
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setCategory(post.category);
      setDescription(post.description || '');
      setContent(post.content);
      setImageFile(null); // Yangi rasm tanlanmaguncha null
    }
  }, [post, isOpen]);

  if (!isOpen || !post) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('content', content);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      await onSave(post.id, formData);
      onClose(); // Muaffaqiyatli saqlangach yopish
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-100 dark:border-slate-700 shadow-xl p-6 relative">
        
        {/* Yopish tugmasi */}
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          <FiX size={20} />
        </button>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Maqolani tahrirlash</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Mavzu</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 text-sm"
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Kategoriya</label>
            <input 
              type="text" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 text-sm"
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Qisqa ta'rif (Description)</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 text-sm"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Muqova rasmi (Ixtiyoriy)</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 dark:file:bg-slate-900 file:text-blue-600 dark:file:text-blue-400 hover:file:bg-blue-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Maqola mazmuni</label>
            <textarea 
              value={content} 
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 text-sm font-mono"
              rows={6}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              Bekor qilish
            </button>
            <button 
              type="submit" 
              disabled={submitting}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-all"
            >
              {submitting ? "Saqlanmoqda..." : "Saqlash"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};