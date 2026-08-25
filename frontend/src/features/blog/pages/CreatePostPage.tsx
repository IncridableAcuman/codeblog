import React from 'react';
import { useCreatePost } from '../hooks/useCreatePost';
import { PostFormFields } from '../components/PostFormFields';
import { ImageUpload } from '../components/ImageUpload';

export const CreatePostPage: React.FC = () => {
  const {
    title, setTitle,
    description, setDescription,
    content, setContent,
    category, setCategory,
    image, handleFileChange,
    isSubmitting,
    handleSubmit
  } = useCreatePost();

  return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 dark:border-slate-700 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Yangi maqola yaratish</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Jamiyat bilan o'z bilimlaringiz va tajribangizni ulashing.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <PostFormFields
                title={title}
                setTitle={setTitle}
                category={category}
                setCategory={setCategory}
                description={description}
                setDescription={setDescription}
            />

            <ImageUpload image={image} onFileChange={handleFileChange} />

            {/* Maqola to'liq matni */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Maqola matni (HTML / Plain Text)
              </label>
              <textarea
                  rows={10}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  placeholder="<p>Maqolangiz matnini yozing...</p>"
              />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-xl transition-all shadow-md shadow-blue-500/20"
            >
              {isSubmitting ? 'Chop etilmoqda...' : 'Chop etish'}
            </button>
          </form>
        </div>
      </div>
  );
};