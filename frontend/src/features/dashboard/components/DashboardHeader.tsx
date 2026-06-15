import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

export const DashboardHeader: React.FC = () => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        Boshqaruv paneli
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
        Maqolalaringiz statistikasi va ularni boshqarish tizimi.
      </p>
    </div>
    <Link
      to="/create-post"
      className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all self-start active:scale-95"
    >
      <FiPlus /> Yangi maqola
    </Link>
  </div>
);