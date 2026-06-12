import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthLayout } from "../components/AuthLayout";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../../services/api";

export const VerifyOtpPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "sizning emailingiz";

  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);

  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Kodni qayta yuborish taymeri
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Agar raqam kiritilsa, keyingi inputga fokus berish
    if (element.value !== "" && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    // Backspace bosilganda orqaga qaytish
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join("");

    if (fullOtp.length < 4) {
      setError("Iltimos, barcha kataklarni to'ldiring.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await axiosInstance.post("/auth/verify-register", { email:email, code:fullOtp });
      // Kelajakda: authService.verifyOtp({ email, otp: fullOtp })
      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Kodni tasdiqlashda xatolik yuz berdi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    setTimer(60);
    setError("");
    // Kelajakda: API orqali kodni qayta jo'natish
  };

  return (
    <AuthLayout title={t("verifyOtpTitle")} subtitle={t("verifyOtpSubtitle")}>
      <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-950/30 dark:text-red-400 rounded-lg text-center"
          >
            {error}
          </motion.div>
        )}

        {/* OTP Inputlar guruhi */}
        <div className="flex justify-center gap-4">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              ref={(el) => (inputRefs.current[index] = el as HTMLInputElement)}
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-14 h-14 text-center text-2xl font-bold border-2 border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          ))}
        </div>

        <div>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:opacity-50 shadow-md transition-all"
          >
            {isLoading ? t("verifying") : t("verifyCode")}
          </motion.button>
        </div>

        {/* Qayta yuborish taymeri */}
        <div className="text-center text-sm text-slate-600 dark:text-slate-400">
          {timer > 0 ? (
            <span>
              {t("resendCode")}{" "}
              <strong className="text-blue-600 dark:text-blue-400">
                {timer}s
              </strong>
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 underline transition-colors"
            >
              {t("regenerateCode")}
            </button>
          )}
        </div>
      </form>
    </AuthLayout>
  );
};
