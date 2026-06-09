import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiCamera, FiCheck } from 'react-icons/fi';
import { UseAuth } from '../../../context/AuthContext';

export const ProfilePage: React.FC = () => {
  const { user } = UseAuth();
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
    // Kelajakda: API orqali profilni yangilash
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Shaxsiy kabinet
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Profil ma'lumotlaringizni boshqaring va yangilang.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Avatar qismi */}
          <div className="flex flex-col items-center sm:flex-row gap-6 pb-6 border-b border-slate-100 dark:border-slate-700">
            <div className="relative group">
              <img
                src={user?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
                alt="Avatar"
                className="w-24 h-24 rounded-2xl object-cover border-4 border-slate-50 dark:border-slate-900 shadow-md"
              />
              <button type="button" className="absolute inset-0 bg-black/40 text-white flex items-center justify-center rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                <FiCamera size={20} />
              </button>
            </div>
            <div className="text-center sm:text-left space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{fullName || 'Foydalanuvchi'}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Mualliflik statusi: Faol</p>
            </div>
          </div>

          {/* Inputlar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                To‘liq ism-sharifingiz
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400"><FiUser /></span>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Email manzilingiz
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400"><FiMail /></span>
                <input
                  type="email"
                  disabled
                  value={email}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-500 cursor-not-allowed transition-all text-sm"
                />
              </div>
            </div>
          </div>

          {/* Saqlash tugmasi */}
          <div className="flex justify-end pt-2">
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition-all shadow-sm"
            >
              {isSaved ? (
                <>
                  <FiCheck /> Saqlandi!
                </>
              ) : (
                'O‘zgarishlarni saqlash'
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};