import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCpu } from 'react-icons/fi';
import type { BlogCategory } from '../../../types/blog';

const CATEGORIES: BlogCategory[] = ['Frontend', 'Backend', 'Mobile', 'DevOps', 'AI & ML'];

export const CreatePostPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<BlogCategory>('Frontend');
  
  // AI State-lari
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // AI orqali sarlavha yoki g'oyalar generatsiya qilish simulyatsiyasi
  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    setAiResponse('');

    try {
      // Kelajakda: deepseek yoki openai API integratsiyasi
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const mockAiSuggestions = `✨ AI tavsiya etgan maqola tuzilmasi (${category}):\n\n1. Kirish: Zamonaviy tendensiyalar.\n2. Asosiy muammolar va ularning yechimlari.\n3. Amaliy kod misollari va tahlil.\n4. Xulosa va kelajak istiqbollari.`;
      setAiResponse(mockAiSuggestions);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setAiResponse("Xatolik yuz berdi. Qaytadan urinib ko'ring.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, description, content, category });
    alert("Maqola muvaffaqiyatli saqlandi! (Mock)");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Chap va Markaz: Maqola Formasi */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Yangi maqola yozish
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Foydali bilimlar ulashing va dasturlash hamjamiyatini rivojlantiring.
          </p>
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
              placeholder="Masalan: TypeScript-da Advanced Turlardan foydalanish"
            />
          </div>

          {/* Kategoriya va Qisqa tavsif */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Kategoriya
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as BlogCategory)}
                className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Karta uchun qisqa tavsif
              </label>
              <input
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Ro'yxat sahifasida ko'rinib turadigan 2-3 qatorli qisqa matn..."
              />
            </div>
          </div>

          {/* Rich Text Editor */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Maqola kontenti
            </label>
            <RichEditor content={content} onChange={setContent} />
          </div>

          {/* Saqlash tugmasi */}
          <div className="flex justify-end gap-3">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition-all shadow-md shadow-blue-500/10"
            >
              Maqolani chop etish
            </button>
          </div>
        </form>
      </div>

      {/* O'ng tomon: AI Assistant Interfeysi */}
      <div className="space-y-6">
        <div className="p-6 bg-linear-to-br from-indigo-50 to-blue-50 dark:from-slate-850 dark:to-slate-800 rounded-2xl border border-indigo-100/50 dark:border-slate-700/50 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <FiCpu size={20} className="animate-pulse" />
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">AI Assistant</h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Nima haqida yozishni bilmayapsizmi yoki yordam kerakmi? Mavzuni yozing va AI sizga reja yoki g'oyalar taqdim etadi.
          </p>

          <div className="space-y-3 pt-2">
            <textarea
              rows={3}
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-xs leading-relaxed"
              placeholder="Masalan: Microservice arxitekturasi haqida maqola rejasi tuzib ber..."
            />

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleAiGenerate}
              disabled={isAiLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs rounded-xl disabled:opacity-50 transition-all shadow-sm"
            >
              <FiSparkles />
              {isAiLoading ? 'AI o‘ylamoqda...' : 'G‘oyalarni generatsiya qilish'}
            </motion.button>
          </div>

          {/* AI Javob oynasi */}
          {aiResponse && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-750 rounded-xl text-xs text-slate-700 dark:text-slate-300 font-medium whitespace-pre-line leading-relaxed shadow-inner"
            >
              {aiResponse}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};