import React from 'react';

export const AiAssistantPanel: React.FC = () => {
  return (
    <div className="p-5 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-slate-800/60 dark:to-slate-900/40 rounded-2xl border border-blue-100/50 dark:border-slate-700/50 space-y-4">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
        ✨ AI Assistant
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Tez orada bu yerda DeepSeek/Gemini API orqali maqolalarni avtomatik generatsiya qilish va reja tuzish paneli joylashadi.
      </p>
      {/* AI form elementlari shu yerga yoziladi */}
    </div>
  );
};