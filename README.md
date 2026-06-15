# ⚡ CodeBlog - Full-Stack Developer Blogging Platform

Zamonaviy, yuqori unumdorlikka ega va dasturchilar uchun maxsus ishlab chiqilgan to'liq siklli (Full-Stack) blog platformasi. Loyiha zamonaviy **Java 21 / Spring Boot 4** backend hamda **React 19 / Tailwind v4** frontend ekotizimida, eng ilg'or arxitektura qoidalari asosida qurilgan.

---

## 🚀 Loyiha Xususiyatlari (Features)

* **🌓 Global Dynamic Theme:** `ThemeProvider` va Tailwind v4 orqali mukammal Dark/Light mode integratsiyasi.
* **🌐 Multi-language (i18n):** `react-i18next` yordamida dinamik til o'zgartirish (UZ, EN, RU).
* **🔒 Secure Authentication & Security:** Spring Security va JWT (Json Web Token) asosidagi xavfsiz autentifikatsiya. Ro'yxatdan o'tishda OTP kod tasdiqlash va parolni elektron pochta (Spring Mail) orqali tiklash tizimi.
* **🔍 Advanced Search & Filter:** Maqolalarni real vaqtda matn orqali tezkor qidirish va kategoriyalar bo'yicha silliq filtrlash.
* **📝 Rich Text Editor:** Maqolalarni chiroyli formatlash, rasmlar joylash va kod bloklarini qo'llab-quvvatlash uchun **Tiptap Editor** integratsiyasi.
* **💬 Interactive Community:** Maqolalarga fikrlar (izohlar) qoldirish va interaktiv reyting (Like) tizimi.
* **📊 Developer Dashboard:** Mualliflar uchun shaxsiy umumiy statistika (views, likes), interaktiv diagrammalar (`recharts`) va maqolalarni boshqarish/tahrirlash jadvali.

---

## 🛠 Texnologiyalar Bayoni (Tech Stack)

### ☕ Backend
* **Asosiy freymvork:** Spring Boot 4.0.6 (Java 21)
* **Xavfsizlik:** Spring Security, JWT (io.jsonwebtoken v0.11.5)
* **Ma'lumotlar bazasi:** PostgreSQL, Spring Data JPA (Hibernate)
* **Tizimli muloqot:** Spring Mail (OTP va Parol tiklash xatlari uchun)
* **Hujjatlashtirish:** Springdoc OpenAPI (Swagger UI v3.0.2)
* **Yig'uvchi:** Gradle

### ⚛️ Frontend
* **Kutubxona:** React 19 (Functional Components, Custom Hooks)
* **Til:** TypeScript (Strict Mode)
* **Stillar:** Tailwind CSS v4 (Modern CSS-variables configuration)
* **Yig'uvchi:** Vite 8
* **Animatsiyalar:** Framer Motion
* **Diagrammalar:** Recharts

---

## 📂 Loyiha Tuzilishi (Project Architecture)

Loyiha ikkita mustaqil va alohida (Loose Coupling) moduldan iborat:

### 📁 Backend (`/backend`)
```text
backend/
├── src/main/java/com/blog/
│   ├── config/          # Spring Security, CORS, JWT va Web MVC sozlamalari
│   ├── controller/      # API Endpointlar (Auth, Post, Comment, File)
│   ├── entity/          # PostgreSQL ma'lumotlar bazasi modellari (User, Post, Comment)
│   ├── repository/      # Spring Data JPA interfeyslari
│   ├── security/        # JWT Filter, UserDetails va Autentifikatsiya provayderi
│   └── service/         # Asosiy biznes mantiq qatlami (Mail, Auth, Post xizmatlari)
├── src/main/resources/
│   └── application.properties # Spring Boot konfiguratsiyasi
└── build.gradle         # Backend bog'liqliklar ro'yxati