import type { User } from '@/features/user/types/userTypes';
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  setAuth: (payload: { user?: Partial<User>; token?: string }) => void;
  clearAuth: () => void;
  isInitializing: boolean;
  setIsInitializing: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isInitializing: true,
  setIsInitializing: (status) => set({ isInitializing: status }),
  setAuth: ({ user, token }) =>
    set((prevState) => ({
      user: user ? ({ ...prevState.user, ...user } as User) : prevState.user,
      accessToken: token ?? prevState.accessToken,
    })),

  clearAuth: () => set({ user: null, accessToken: null }),
}));
