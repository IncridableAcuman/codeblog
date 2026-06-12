import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types/user';
import axiosInstance from '../services/api';

interface AuthContextType {
  user: User | null;
  loading:boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async ()=> {
      try {
        const {data} = await axiosInstance.get("/auth/me");
        setUser(data);
      } catch (error) {
        console.log(error);
        setUser((null))
      } finally {
         setLoading(false);
      }
    }
    fetchUser();
  }, []);



  return (
    <AuthContext.Provider value={{ user,loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};