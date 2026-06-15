import React from 'react';
import { FiBookOpen, FiEye, FiHeart } from 'react-icons/fi';

interface StatsGridProps {
  postsCount: number;
  totalViews: number;
  totalLikes: number;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ postsCount, totalViews, totalLikes }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
    <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-4">
      <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl"><FiBookOpen size={22} /></div>
      <div>
        <p className="text-xs font-medium text-slate-400">Maqolalarim</p>
        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{postsCount} ta</h4>
      </div>
    </div>

    <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-4">
      <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl"><FiEye size={22} /></div>
      <div>
        <p className="text-xs font-medium text-slate-400">Ko‘rishlar soni</p>
        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{totalViews} marta</h4>
      </div>
    </div>

    <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-4">
      <div className="p-3 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-xl"><FiHeart size={22} /></div>
      <div>
        <p className="text-xs font-medium text-slate-400">Umumiy Likelar</p>
        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{totalLikes} ta</h4>
      </div>
    </div>
  </div>
);