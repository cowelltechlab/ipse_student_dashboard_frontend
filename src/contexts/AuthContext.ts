import { createContext } from 'react';

export type UserRole = 'student' | 'teacher' | 'admin';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
