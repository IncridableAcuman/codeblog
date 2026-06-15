import React from "react";
import { useTranslation } from "react-i18next";

interface TimerSectionProps {
  timer: number;
  onResend: () => void;
}

export const TimerSection: React.FC<TimerSectionProps> = ({ timer, onResend }) => {
  const { t } = useTranslation();

  return (
    <div className="text-center text-sm text-slate-600 dark:text-slate-400">
      {timer > 0 ? (
        <span>
          {t("resendCode")}{" "}
          <strong className="text-blue-600 dark:text-blue-400">{timer}s</strong>
        </span>
      ) : (
        <button
          type="button"
          onClick={onResend}
          className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 underline transition-colors"
        >
          {t("regenerateCode")}
        </button>
      )}
    </div>
  );
};