import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ErrorMessage } from './ErrorMessage';
import type { ForgotPasswordFormProps } from '../interfaces/ForgotPasswordFormProps';


export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  email,
  setEmail,
  isLoading,
  error,
  onSubmit
}) => {
  const { t } = useTranslation();

  return (
    <form className="mt-6 space-y-5" onSubmit={onSubmit}>
      {error && <ErrorMessage message={error} />}

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
  );
};