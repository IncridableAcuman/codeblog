import type { BlogPost } from "../types/blog";

export const mockBlogs: BlogPost[] = [
  {
    id: 'post-1',
    title: 'React 19 va Undagi Yangi Hooklar Tahlili',
    description: 'React 19 versiyada taqdim etilgan useActionState, useFormStatus va server komponentlarining ishlash prinsiplari.',
    content: '<h1>React 19 Kelajagi</h1><p>Dasturlash dunyosida eng ommabop kutubxonalardan biri bo\'lgan React o\'zining navbatdagi katta yangilanishini taqdim etdi...</p>',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
    category: 'Frontend',
    author: {
      id: 'usr_1',
      fullName: 'Eshmat Toshmatov',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
    },
    likes: 42,
    likedBy: [],
    views: 312,
    comments: [
      { id: 'c-1', author: { id: 'usr_2', fullName: 'Ali Valiyev', avatarUrl: '' }, content: 'Juda foydali maqola bo‘libdi!', createdAt: '2026-06-07' }
    ],
    createdAt: '2026-06-05'
  },
  {
    id: 'post-2',
    title: 'Node.js va Express-da Event-Driven Arxitektura',
    description: 'Katta yuklamali tizimlarda Node.js Event Emitter-lardan to‘g‘ri foydalanish va asinxronlikni boshqarish.',
    content: '<h1>Event-Driven Tizimlar</h1><p>Microservice-lar dunyosida asinxron aloqa o\'rnatish va hodisalarga asoslangan arxitektura qurish juda muhim...</p>',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    category: 'Backend',
    author: {
      id: 'usr_3',
      fullName: 'Olimjon Qodirov',
      avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80'
    },
    likes: 28,
    likedBy: [],
    views: 189,
    comments: [],
    createdAt: '2026-06-01'
  },
  {
    id: 'post-3',
    title: 'Sun\'iy Intellekt (AI) Integratsiyasi: LLM Modellar bilan Ishlash',
    description: 'Frontend va Backend dasturlarda OpenAI hamda muqobil LLM modellarni API orqali qulay integratsiya qilish yo\'riqnomasi.',
    content: '<h1>AI va Dasturlash</h1><p>Hozirgi kunda har qanday dasturiy mahsulotga sun\'iy intellekt elementlarini qo\'shish talab etilmoqda...</p>',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80',
    category: 'AI & ML',
    author: {
      id: 'usr_1',
      fullName: 'Eshmat Toshmatov',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
    },
    likes: 85,
    likedBy: [],
    views: 524,
    comments: [],
    createdAt: '2026-05-28'
  }
];