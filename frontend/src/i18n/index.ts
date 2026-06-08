import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: { translation: { welcome: "Welcome to Coding Blog" } },
  uz: { translation: { welcome: "Dasturlash blogiga xush kelibsiz" } },
  ru: { translation: { welcome: "Добро пожаловать в блог" } }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'uz',
    interpolation: { escapeValue: false }
  });

export default i18n;