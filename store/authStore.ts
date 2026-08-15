'use client';

import { create } from 'zustand';

export interface UserProfile {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatarUrl?: string;
  role: string;
  client?: {
    id: number;
    phone?: string;
    whatsapp?: string;
    country?: string;
    notes?: string;
  };
}

interface AuthState {
  accessToken: string | null;
  user: UserProfile | null;
  isAuthenticated: boolean;
  setAuth: (data: { accessToken: string; user?: UserProfile | null }) => void;
  setUser: (user: UserProfile | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null,
  user: typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null,
  isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('accessToken') : false,

  setAuth: ({ accessToken, user }) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    }
    set((state) => ({
      accessToken,
      user: user !== undefined ? user : state.user,
      isAuthenticated: true,
    }));
  },

  setUser: (user) => {
    if (typeof window !== 'undefined') {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    }
    set({ user });
  },

  clearAuth: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    }
    set({ accessToken: null, user: null, isAuthenticated: false });
  },
}));
