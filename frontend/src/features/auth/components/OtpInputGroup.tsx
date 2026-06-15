import React from "react";
import type { OtpInputGroupProps } from "../interfaces/OtpInputGroupProps";

export const OtpInputGroup: React.FC<OtpInputGroupProps> = ({
  otp,
  inputRefs,
  onChange,
  onKeyDown,
}) => (
  <div className="flex justify-center gap-4">
    {otp.map((data, index) => (
      <input
        key={index}
        type="text"
        maxLength={1}
        ref={(el) => (inputRefs.current[index] = el as HTMLInputElement)}
        value={data}
        onChange={(e) => onChange(e.target, index)}
        onKeyDown={(e) => onKeyDown(e, index)}
        className="w-14 h-14 text-center text-2xl font-bold border-2 border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
      />
    ))}
  </div>
);