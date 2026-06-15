import React from "react";
import type { BlogCategory } from "../../../types/blog";
import type { CategoryFiltersProps } from "../interfaces/CategoryFiltersProps";

const CATEGORIES: ("All" | BlogCategory)[] = ["All", "FRONTEND", "BACKEND"];


export const CategoryFilters: React.FC<CategoryFiltersProps> = ({ selectedCategory, onCategorySelect }) => (
  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
    {CATEGORIES.map((category) => (
      <button
        key={category}
        onClick={() => onCategorySelect(category)}
        className={`px-4 py-1.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
          selectedCategory === category
            ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
            : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
        }`}
      >
        {category}
      </button>
    ))}
  </div>
);