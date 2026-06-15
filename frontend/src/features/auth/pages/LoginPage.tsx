import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AuthLayout } from '../components/AuthLayout';
import { useLogin } from '../hooks/useLogin';
import { LoginFormFields } from '../components/LoginFormFields';
import { ErrorMessage } from '../components/ErrorMessage';

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  
  const {
    email, setEmail,
    password, setPassword,
    showPassword, setShowPassword,
    error,
    isLoading,
    handleSubmit
  } = useLogin();

  return (
    <AuthLayout title={t('loginTitle')} subtitle={t('loginSubtitle')}>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        
        {/* 1. Xatolik xabarnomasi */}
        {error && <ErrorMessage message={error} />}

        {/* 2. Form Inputlari */}
        <LoginFormFields
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />

        {/* Parolni unutdingizmi? */}
        <div className="flex items-center justify-end text-sm">
          <Link
            to="/forgot-password"
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            {t('forgotPassword')}
          </Link>
        </div>

        {/* Kirish Tugmasi */}
        <div>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-500/20"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              t('loginBtn')
            )}
          </motion.button>
        </div>

        {/* Ro'yxatdan o'tishga havola */}
        <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-4">
          {t('noAccount')}{' '}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            {t('registerLink')}
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};