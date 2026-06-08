import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  uz: {
    translation: {
      loginTitle: "Xush Kelibsiz!",
      loginSubtitle: "Dasturlash blogingizga kiring",
      emailLabel: "Email Pochta",
      passwordLabel: "Parol",
      forgotPassword: "Parolni unutdingizmi?",
      loginBtn: "Tizimga kirish",
      noAccount: "Hisobingiz yo'qmi?",
      registerLink: "Ro'yxatdan o'tish",
      // ... boshqa tarjimalar
    }
  },
  en: {
    translation: {
      loginTitle: "Welcome Back!",
      loginSubtitle: "Sign in to your coding blog",
      emailLabel: "Email Address",
      passwordLabel: "Password",
      forgotPassword: "Forgot password?",
      loginBtn: "Sign In",
      noAccount: "Don't have an account?",
      registerLink: "Register",
    }
  },
  ru: {
    translation: {
      loginTitle: "Добро пожаловать!",
      loginSubtitle: "Войдите в свой блог для программистов",
      emailLabel: "Email Почта",
      passwordLabel: "Пароль",
      forgotPassword: "Забыли пароль?",
      loginBtn: "Войти",
      noAccount: "Нет аккаунта?",
      registerLink: "Зарегистрироваться",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'uz',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false }
  });

export default i18n;