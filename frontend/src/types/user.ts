export interface User {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  role: 'USER' | 'ADMIN';
}

export interface AuthState {
  user: User | null;
  isActive: boolean;
  token: string | null;
}