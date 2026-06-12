import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {  FiEye, FiEyeOff } from "react-icons/fi";
import { AuthLayout } from "../components/AuthLayout";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../../services/api";

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const token = location.state?.token;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Parollar bir-biriga mos kelmadi!");
      return;
    }

    setIsLoading(true);

    try {
      // Backend: ResetPasswordRequest (token, password, confirmPassword)
      await axiosInstance.post("/auth/reset-password", {
        token,
        password,
        confirmPassword
      });

      setSuccess("Parolingiz muvaffaqiyatli yangilandi! Login sahifasiga o'tyapsiz...");
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || "Parolni yangilashda xatolik yuz berdi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title={t("resetPasswordTitle")} subtitle={t("resetPasswordSubtitle")}>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        {error && <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg text-center border border-red-200">{error}</div>}
        {success && <div className="p-3 text-sm text-green-600 bg-green-50 rounded-lg text-center border border-green-200">{success}</div>}

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Yangi parol</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-4 pr-10 py-2.5 border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="••••••••"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400">
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Parolni tasdiqlash</label>
          <input
            type={showPassword ? "text" : "password"}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="••••••••"
          />
        </div>

        <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-all shadow-md">
          {isLoading ? "Yangilanmoqda..." : "Parolni saqlash"}
        </motion.button>
      </form>
    </AuthLayout>
  );
};