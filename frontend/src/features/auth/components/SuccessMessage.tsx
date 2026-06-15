import React from 'react';
import { motion } from 'framer-motion';

export const SuccessMessage: React.FC = () => (
  <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="text-center p-4 bg-green-500/10 border border-green-200 dark:border-green-900 rounded-xl mt-6 space-y-2"
  >
    <p className="text-sm text-green-600 dark:text-green-400 font-medium">
      Tasdiqlash havolasi muvaffaqiyatli yuborildi!
    </p>
    <p className="text-xs text-slate-500 dark:text-slate-400">
      Siz avtomatik ravishda parolni yangilash sahifasiga yo'naltirilyapsiz...
    </p>
  </motion.div>
);