import React from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface ResetPasswordFormFieldsProps {
  password: string;
  setPassword: (val: string) => void;
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
}

export const ResetPasswordFormFields: React.FC<ResetPasswordFormFieldsProps> = ({
  password, setPassword,
  confirmPassword, setConfirmPassword,
  showPassword, setShowPassword
}) => (
  <>
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
        Yangi parol
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full pl-4 pr-10 py-2.5 border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="••••••••"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
        Parolni tasdiqlash
      </label>
      <input
        type={showPassword ? "text" : "password"}
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="block w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        placeholder="••••••••"
      />
    </div>
  </>
);