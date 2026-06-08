import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import { mockBlogs } from '../../../services/mockData';
import { BlogCard } from '../components/BlogCard';
import type { BlogCategory } from '../../../types/blog';

const CATEGORIES: ('All' | BlogCategory)[] = ['All', 'Frontend', 'Backend', 'Mobile', 'DevOps', 'AI & ML'];

export const BlogListPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | BlogCategory>('All');

  // Qidiruv va filtrlash mantig'i
  const filteredBlogs = useMemo(() => {
    return mockBlogs.filter((blog) => {
      const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            blog.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Sarlavha va Qidiruv Paneli */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Dasturlash bo‘yicha maqolalar
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Eng so‘nggi texnologiyalar, darsliklar va tajribalar dunyosi.
          </p>
        </div>

        {/* Qidiruv inputi */}
        <div className="relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <FiSearch size={18} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Maqolalarni izlash..."
          />
        </div>
      </div>

      {/* Kategoriya Filter Tugmalari */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-1.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === category
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Kartalari Paneli */}
      {filteredBlogs.length > 0 ? (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredBlogs.map((post) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={post.id}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
          <p className="text-slate-500 dark:text-slate-400">Hech qanday maqola topilmadi.</p>
        </div>
      )}
    </div>
  );
};