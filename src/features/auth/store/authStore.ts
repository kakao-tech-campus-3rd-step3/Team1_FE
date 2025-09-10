import { create } from 'zustand';
interface User {
  id: string;
  name: string;
  profileEmoji: string;
  createdAt: Date;
  updatedAt: Date;
}
interface AuthState {
  user: User | null;
  accessToken: string | null;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  setAuth: (user, token) => set({ user, accessToken: token }),
  clearAuth: () => set({ user: null, accessToken: null }),
}));
