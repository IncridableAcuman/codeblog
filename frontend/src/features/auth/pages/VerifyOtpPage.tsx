import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { AuthLayout } from "../components/AuthLayout";
import { useVerifyOtp } from "../hooks/useVerifyOtp";
import { OtpInputGroup } from "../components/OtpInputGroup";
import { TimerSection } from "../components/TimerSection";
import { AlertMessage } from "../components/AlertMessage";

export const VerifyOtpPage: React.FC = () => {
  const { t } = useTranslation();
  const {
    email,
    otp,
    isLoading,
    error,
    timer,
    inputRefs,
    handleChange,
    handleKeyDown,
    handleSubmit,
    handleResend,
  } = useVerifyOtp();

  return (
    <AuthLayout title={t("verifyOtpTitle")} subtitle={`${t("verifyOtpSubtitle")} ${email || ""}`}>
      <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
        
        {/* 1. Xatolik xabari */}
        {error && <AlertMessage message={error} type="error" />}

        {/* 2. 4-xonali OTP inputlar bloki */}
        <OtpInputGroup
          otp={otp}
          inputRefs={inputRefs}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        {/* Tasdiqlash tugmasi */}
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

        {/* 3. Taymer yoki qayta tiklash bloki */}
        <TimerSection timer={timer} onResend={handleResend} />
      </form>
    </AuthLayout>
  );
};