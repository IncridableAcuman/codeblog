export interface Author {
  id: string;
  fullName: string;
  avatarUrl: string;
}

export interface Comment {
  id: string;
  author: Author;
  content: string;
  createdAt: string;
}

export type BlogCategory = 'Frontend' | 'Backend' | 'Mobile' | 'DevOps' | 'AI & ML';

export interface BlogPost {
  id: string;
  title: string;
  description: string; // Qisqa matn (Karta uchun)
  content: string;     // Rich text formatidagi to'liq matn
  coverImage: string;
  category: BlogCategory;
  author: Author;
  likes: number;
  likedBy: string[];   // Liked foydalanuvchilar ID ro'yxati (kelajak uchun)
  comments: Comment[];
  views: number;
  createdAt: string;
}