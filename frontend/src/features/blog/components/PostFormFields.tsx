import React from 'react';
import type { BlogCategory } from '../../../types/blog';

const CATEGORIES: BlogCategory[] = ['FRONTEND', 'BACKEND'];

interface PostFormFieldsProps {
  title: string;
  setTitle: (val: string) => void;
  category: BlogCategory;
  setCategory: (val: BlogCategory) => void;
  description: string;
  setDescription: (val: string) => void;
}

export const PostFormFields: React.FC<PostFormFieldsProps> = ({
  title, setTitle,
  category, setCategory,
  description, setDescription
}) => (
  <>
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
        placeholder="Sarlavha..."
      />
    </div>

    {/* Kategoriya va Qisqa tavsif */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-1">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Kategoriya</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as BlogCategory)}
          className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Qisqa tavsif</label>
        <input
          type="text"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Maqola haqida qisqacha..."
        />
      </div>
    </div>
  </>
);