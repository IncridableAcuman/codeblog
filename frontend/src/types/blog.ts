export interface UserResponse {
  id: number;
  fullName: string;
  email: string;
  avatarUrl?: string; // Agar backendda bor bo'lsa
}

export type BlogCategory = 'FRONTEND' | 'BACKEND';

export interface BlogPost {
  id: number;          // Backendda Long -> Frontendda number
  user: UserResponse;  // author emas, user!
  title: string;
  description: string;
  content: string;
  category: BlogCategory;
  coverImage: string;
  views: number;
  likes: number;
  createdAt: string;   // LocalDateTime string bo'lib keladi
  updatedAt: string;
}