import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiDownload } from 'react-icons/fi';

interface BlogHeaderProps {
  onDownload: () => void;
  isDownloading: boolean;
}

export const BlogHeader: React.FC<BlogHeaderProps> = ({ onDownload, isDownloading }) => (
  <div className="flex items-center justify-between">
    <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
      <FiArrowLeft /> Bosh sahifaga qaytish
    </Link>
    <button
      onClick={onDownload}
      disabled={isDownloading}
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-all active:scale-95 disabled:opacity-50 shadow-sm"
    >
      <FiDownload className={isDownloading ? "animate-bounce" : ""} />
      {isDownloading ? "Tayyorlanmoqda..." : "PDF yuklash"}
    </button>
  </div>
);