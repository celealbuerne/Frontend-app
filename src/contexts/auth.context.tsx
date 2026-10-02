import { createContext, useContext, useState, type ReactNode } from 'react';
import type { RegisterPayload, User } from '../models/user.model.ts';
import { login, register } from '../services/auth.service.ts';

interface AuthContextType {
  currentUser: User | null;
  isLogged: boolean;
  loginUser: (user: string, password: string) => Promise<void>;
  logoutUser: () => void;
  registerUser: (data: RegisterPayload) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLogged, setIsLogged] = useState(() => {
    return !!localStorage.getItem('sessionToken');
  });
  const [currentUser, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('sessionUser');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      localStorage.removeItem('sessionUser');
      return null;
    }
  });

  const loginUser = async (user: string, password: string) => {
    const res = await login(user, password);

    localStorage.setItem('sessionToken', res.data.token);
    localStorage.setItem('sessionUser', JSON.stringify(res.data.usuario));
    setIsLogged(true);
    setUser(res.data.usuario);

    console.log(res.mensaje, res.data.token);
  };

  const logoutUser = () => {
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('sessionUser');
    setUser(null);
    setIsLogged(false);
  };

  const registerUser = async (data: RegisterPayload) => {
    const res = await register(data);

    console.log(res.mensaje, res.data);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, isLogged, loginUser, logoutUser, registerUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
}
