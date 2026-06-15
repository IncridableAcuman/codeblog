import React from 'react';
import { RichEditor } from '../../../components/editor/RichEditor';
import { useCreatePost } from '../hooks/useCreatePost';
import { PostFormFields } from '../components/PostFormFields';
import { ImageUpload } from '../components/ImageUpload';
import { AiAssistantPanel } from '../components/AiAssistantPanel';


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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Chap tomondagi asosiy Forma bo'limi */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Yangi maqola yozish
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 1. Matnli asosiy maydonlar */}
          <PostFormFields
            title={title}
            setTitle={setTitle}
            category={category}
            setCategory={setCategory}
            description={description}
            setDescription={setDescription}
          />

          {/* 2. Muqova rasmini yuklash bo'limi */}
          <ImageUpload image={image} onFileChange={handleFileChange} />

          {/* 3. Rich Text Editor (RichEditor o'z state'ini to'g'ridan-to'g'ri yangilaydi) */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Maqola kontenti
            </label>
            <RichEditor content={content} onChange={setContent} />
          </div>

          {/* Amal tugmasi */}
          <div className="flex justify-end gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? "Chop etilmoqda..." : "Maqolani chop etish"}
            </button>
          </div>
        </form>
      </div>

      {/* O'ng tomondagi AI Paneli */}
      <div className="lg:col-span-1">
        <AiAssistantPanel />
      </div>
    </div>
  );
};