export interface User {
  id: number;
  fullName: string;
  isActive: boolean;
  email: string;
  avatarUrl?: string;
  role: 'USER' | 'ADMIN';
}

export interface AuthState {
  user: User | null;
  isActive: boolean;
  token: string | null;
}