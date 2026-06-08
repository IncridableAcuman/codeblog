# ⚡ CodeBlog - Advanced Developer Blogging Platform

Zamonaviy, yuqori unumdorlikka ega va dasturchilar uchun maxsus ishlab chiqilgan blog platformasi. Loyiha **React 19**, **TypeScript**, **Tailwind CSS v4** va **Vite** ekotizimida eng ilg'or arxitektura qoidalari (Loose Coupling & Feature-Driven) asosida qurilgan.

---

## 🚀 Loyiha Xususiyatlari (Features)

*   **🌓 Global Dynamic Theme:** `ThemeProvider` va Tailwind v4 orqali mukammal Dark/Light mode integratsiyasi.
*   **🌐 Multi-language (i18n):** `react-i18next` yordamida dinamik til o'zgartirish (UZ, EN, RU).
*   **🔒 Secure Authentication:** Global `AuthContext` va xavfsiz marshrutlar (`ProtectedRoute`) tizimi.
*   **🔍 Advanced Search & Filter:** Maqolalarni real vaqtda matn orqali qidirish va kategoriyalar bo'yicha silliq filtrlash.
*   **📝 Rich Text Editor:** Maqolalarni chiroyli formatlash uchun **Tiptap Editor** va kod bloklari qo'llab-quvvatlanishi.
*   **🤖 AI Assistant Interface:** Dasturchilarga maqola yozishda yordam beruvchi sun'iy intellekt yordamchisi paneli.
*   **📄 PDF Export:** Maqolalarni reklama va ortiqcha tugmalarsiz, toza formatda PDF ko'rinishida yuklab olish (`html2pdf.js`).
*   **📊 Developer Dashboard:** Mualliflar uchun shaxsiy statistika (views, likes) va maqolalarni boshqarish jadvali.

---

## 📂 Papkalar Tuzilishi (Project Architecture)

Loyiha kengayuvchan va tartibli bo'lishi uchun **Feature-Driven Architecture** asosida tashkil etilgan:

```text
src/
├── components/          # Global umumiy komponentlar (Editor, Layouts, h.k.)
├── context/             # Global holat boshqaruvchilari (Auth, Theme)
├── features/            # Mustaqil funksional modullar (Features)
│   ├── auth/            # Login, Register, AuthLayout
│   ├── blog/            # BlogList, BlogDetail, BlogCard, CreatePost
│   └── dashboard/       # DashboardPage, ProfilePage
├── i18n/                # Ko'p tillik tizim sozlamalari va lug'atlar
├── routes/              # Yo'naltirish tizimi va Protected Route-lar
├── services/            # Mock ma'lumotlar ombori va API xizmatlari
├── types/               # TypeScript turlari va interfeyslari (Blog, Auth)
├── App.tsx              # Asosiy ilova qobig'i (Providers & Router)
├── index.css            # Tailwind v4 konfiguratsiyasi va global CSS
└── main.tsx             # Loyihaning kirish nuqtasi (Entry Point)