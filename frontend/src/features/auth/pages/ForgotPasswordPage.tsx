import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import { AuthLayout } from '../components/AuthLayout';
import {motion} from 'framer-motion'
import { useTranslation } from 'react-i18next';
import axiosInstance from '../../../services/api';
export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await axiosInstance.post("/auth/forgot-password", { email });
      setIsSent(true);
      
      // Simulyatsiya o'rniga haqiqiy OTP sahifasiga yo'llaymiz!
      setTimeout(() => {
        navigate('/verify-otp', { state: { email, from: 'forgot-password' } });
      }, 2000);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || "Emailga kod yuborishda xatolik bo'ldi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title={t('forgotPasswordTitle')}
      subtitle={t('forgotPasswordSubtitle')}
    >
      {!isSent ? (
        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-950/30 dark:text-red-400 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              {t('emailLabel')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <FiMail size={18} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="example@domain.com"
              />
            </div>
          </div>

          <div>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:opacity-50 shadow-md transition-all"
              >
                {isLoading ? t('sending') : t('sendVerificationCode')}
              </button>
            </motion.div>
          </div>

          <div className="text-center">
            <Link to="/login" className="inline-flex items-center text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors gap-1">
              <FiArrowLeft /> {t('returnToLogin')}
            </Link>
          </div>
        </form>
      ) : (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-4 bg-green-55/10 border border-green-200 dark:border-green-900 rounded-xl mt-6 space-y-2"
        >
          <p className="text-sm text-green-600 dark:text-green-400 font-medium">
            Tasdiqlash havolasi muvaffaqiyatli yuborildi!
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Siz avtomatik ravishda parolni yangilash sahifasiga yo'naltirilyapsiz...
          </p>
        </motion.div>
      )}
    </AuthLayout>
  );
};