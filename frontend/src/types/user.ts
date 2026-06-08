export interface User {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  role: 'USER' | 'ADMIN';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}