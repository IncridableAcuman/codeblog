import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  uz: {
    translation: {
      loginTitle: "Xush Kelibsiz!",
      loginSubtitle: "Dasturlash blogingizga kiring",
      registerTitle: "Hisob yaratish",
      registerSubtitle: "Dasturlash hamjamiyatimizga qo'shiling",
      forgotPasswordTitle: "Parolni tiklash",
      forgotPasswordSubtitle: "Profilingiz bog'langan email pochtangizni kiriting",
      emailLabel: "Email Pochta",
      passwordLabel: "Parol",
      forgotPassword: "Parolni unutdingizmi?",
      confirmPassword: "Parolni tasdiqlash",
      loginBtn: "Tizimga kirish",
      noAccount: "Hisobingiz yo'qmi?",
      registerLink: "Ro'yxatdan o'tish",
      haveAProfile: "Profil bormi?",
      fullName: "Ism va familiya",
      sendVerificationCode: "Tasdiqlash kodini yuborish",
      sending: "Yuborilmoqda...",
      returnToLogin: "Tizimga kirishga qaytish",
      creatingAccount: "Hisob yaratilmoqda...",
      resetPasswordTitle: "Yangi parol",
      resetPasswordSubTitle: "Profilingiz uchun kuchliroq parol tanlang",
      newPassword: "Yangi parol",
      confirmNewPassword: "Yangi parolni tasdiqlash",
      updatePassword: "Parolni yangilash",
      saving: "Saqlanmoqda...",
      entrance: "Kirish",
      exit: "Chiqish",
    }
  },
  en: {
    translation: {
      loginTitle: "Welcome Back!",
      loginSubtitle: "Sign in to your coding blog",
      emailLabel: "Email Address",
      passwordLabel: "Password",
      forgotPassword: "Forgot password?",
      forgotPasswordTitle: "Reset Password",
      forgotPasswordSubtitle: "Enter the email address associated with your profile",
      loginBtn: "Sign In",
      noAccount: "Don't have an account?",
      registerLink: "Register",
      registerTitle: "Create an account",
      registerSubtitle: "Join our programming community",
      fullName: "First and Last Name",
      confirmPassword: "Confirm Password",
      haveAProfile: "Do you have a profile?",
      sendVerificationCode: "Send verification code",
      sending: "Sending...",
      returnToLogin: "Return to login",
      creatingAccount: "Creating account...",
      resetPasswordTitle: "New password",
      resetPasswordSubTitle: "Choose a stronger password for your profile",
      newPassword: "New password",
      confirmNewPassword: "Confirm new password",
      updatePassword: "Update password",
      saving: "Saving...",
      entrance: "Entrance",
      exit: "Exit",
    }
  },
  ru: {
    translation: {
      loginTitle: "Добро пожаловать!",
      loginSubtitle: "Войдите в свой блог для программистов",
      emailLabel: "Email Почта",
      passwordLabel: "Пароль",
      forgotPassword: "Забыли пароль?",
      forgotPasswordTitle: "Сбросить пароль",
      forgotPasswordSubtitle: "Введите адрес электронной почты, связанный с вашим профилем",
      loginBtn: "Войти",
      noAccount: "Нет аккаунта?",
      registerLink: "Зарегистрироваться",
      registerTitle: "Создать учетную запись",
      registerSubtitle: "Присоединяйтесь к нашему сообществу программистов",
      fullName: "Имя и фамилия",
      confirmPassword: "Подтвердите пароль",
      haveAProfile: "У вас есть профиль?",
      sendVerificationCode: "Отправить код подтверждения",
      sending: "Отправка...",
      returnToLogin: "Вернуться к авторизации",
      creatingAccount: "Создание учетной записи...",
      resetPasswordTitle: "Новый пароль",
      resetPasswordSubTitle: "Выберите более надежный пароль для своего профиля",
      newPassword: "Новый пароль",
      confirmNewPassword: "Подтвердите новый пароль",
      updatePassword: "Обновить пароль",
      saving: "Экономия...",
      entrance: "Вход",
      exit: "Выход",
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