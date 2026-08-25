import React from 'react';
import { useBlogList } from '../hooks/useBlogList';
import { BlogSearchHeader } from '../components/BlogSearchHeader';
import { CategoryFilters } from '../components/CategoryFilters';
import { BlogCard } from '../components/BlogCard';

export const BlogListPage: React.FC = () => {
  const {
    filteredBlogs,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    loading
  } = useBlogList();

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <BlogSearchHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
        />

        <CategoryFilters
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
        />

        {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="h-80 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-2xl" />
              ))}
            </div>
        ) : filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((post) => (
                  <BlogCard key={post.id} post={post} />
              ))}
            </div>
        ) : (
            <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
              <p className="text-slate-500 dark:text-slate-400">Maqolalar topilmadi.</p>
            </div>
        )}
      </div>
  );
};