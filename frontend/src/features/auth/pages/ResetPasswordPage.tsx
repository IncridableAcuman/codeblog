import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { AuthLayout } from "../components/AuthLayout";
import { useResetPassword } from "../hooks/useResetPassword";
import { ResetPasswordFormFields } from "../components/ResetPasswordFormFields";
import { AlertMessage } from "../components/AlertMessage";

export const ResetPasswordPage: React.FC = () => {
  const { t } = useTranslation();
  
  const {
    password, setPassword,
    confirmPassword, setConfirmPassword,
    showPassword, setShowPassword,
    error,
    success,
    isLoading,
    handleSubmit
  } = useResetPassword();

  return (
    <AuthLayout title={t("resetPasswordTitle")} subtitle={t("resetPasswordSubtitle")}>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        
        {/* Statik xabarnomalar */}
        {error && <AlertMessage message={error} type="error" />}
        {success && <AlertMessage message={success} type="success" />}

        {/* Parol input maydonlari */}
        <ResetPasswordFormFields
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />

        {/* Tasdiqlash tugmasi */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isLoading ? "Yangilanmoqda..." : "Parolni saqlash"}
        </motion.button>
      </form>
    </AuthLayout>
  );
};