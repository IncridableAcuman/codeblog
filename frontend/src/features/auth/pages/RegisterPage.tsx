import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { AuthLayout } from "../components/AuthLayout";
import { useRegister } from "../hooks/useRegister";
import { ErrorMessage } from "../components/ErrorMessage";
import { RegisterFormFields } from "../components/RegisterFormFields";
import { Link } from "react-router-dom";

export const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  
  const {
    fullName, setFullName,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    showPassword, setShowPassword,
    error,
    isLoading,
    handleSubmit
  } = useRegister();

  return (
    <AuthLayout title={t("registerTitle")} subtitle={t("registerSubtitle")}>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        
        {/* 1. Xatolik xabarnomasi */}
        {error && <ErrorMessage message={error} />}

        {/* 2. Input maydonlari */}
        <RegisterFormFields
          fullName={fullName}
          setFullName={setFullName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />

        {/* Submit tugmasi */}
        <div>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 shadow-md shadow-blue-500/20 transition-all"
          >
            {isLoading ? t("creatingAccount") : t("registerLink")}
          </motion.button>
        </div>

        {/* Login havolasi */}
        <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-4">
          {t("haveAProfile")}{" "}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
            {t("loginBtn")}
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};