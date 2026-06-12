import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { AuthLayout } from "../components/AuthLayout";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../../services/api";

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Parollar bir-biriga mos kelmadi!");
      return;
    }

    setIsLoading(true);

    try {
      await axiosInstance.post("/auth/reset-password", {
        password,
        confirmPassword,
      });
      // Kelajakda: authService.resetPassword({ email, password })
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Muvaffaqiyatli o'zgargandan keyin login sahifasiga
      navigate("/login");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Parolni yangilashda xatolik yuz berdi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title={t("resetPasswordTitle")}
      subtitle={t("resetPasswordSubTitle")}
    >
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-950/30 dark:text-red-400 rounded-lg"
          >
            {error}
          </motion.div>
        )}

        <div className="space-y-3">
          {/* Yangi parol */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              {t("newPassword")}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <FiLock size={18} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-10 py-2.5 border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          {/* Yangi parolni tasdiqlash */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              {t("confirmNewPassword")}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <FiLock size={18} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>
        </div>

        <div>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:opacity-50 shadow-md transition-all"
          >
            {isLoading ? t("saving") : t("updatePassword")}
          </motion.button>
        </div>
      </form>
    </AuthLayout>
  );
};
