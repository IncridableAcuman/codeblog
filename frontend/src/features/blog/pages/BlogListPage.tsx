import React from "react";
import { motion } from "framer-motion";
import { BlogCard } from "../components/BlogCard";
import { useBlogList } from "../hooks/useBlogList";
import { BlogSearchHeader } from "../components/BlogSearchHeader";
import { CategoryFilters } from "../components/CategoryFilters";


export const BlogListPage: React.FC = () => {
  const {
    filteredBlogs,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    loading,
  } = useBlogList();

  if (loading) {
    return <div className="text-center py-20 text-slate-600 dark:text-slate-400">Maqolalar yuklanmoqda...</div>;
  }

  return (
    <div className="space-y-8">
      {/* 1. Sarlavha va Qidiruv */}
      <BlogSearchHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* 2. Kategoriya Filtrlari */}
      <CategoryFilters selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />

      {/* 3. Blog Kartalari Ro'yxati */}
      {filteredBlogs.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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