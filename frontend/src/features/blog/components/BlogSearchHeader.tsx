import React from "react";
import { FiSearch } from "react-icons/fi";

interface BlogSearchHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const BlogSearchHeader: React.FC<BlogSearchHeaderProps> = ({ searchQuery, onSearchChange }) => (
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div>
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        Dasturlash bo‘yicha maqolalar
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
        Eng so‘nggi texnologiyalar, darsliklar va tajribalar dunyosi.
      </p>
    </div>

    <div className="relative max-w-md w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
        <FiSearch size={18} />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        placeholder="Maqolalarni izlash..."
      />
    </div>
  </div>
);