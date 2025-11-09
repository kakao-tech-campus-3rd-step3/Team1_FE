import type { User } from '@/features/user/types/userTypes';
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  setAuth: (payload: { user?: Partial<User>; accessToken?: string }) => void;
  clearAuth: () => void;
  isInitializing: boolean;
  setIsInitializing: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isInitializing: true,
  setIsInitializing: (status) => set({ isInitializing: status }),
  setAuth: ({ user, accessToken }) =>
    set((prevState) => ({
      user: user ? ({ ...prevState.user, ...user } as User) : prevState.user,
      accessToken: accessToken ?? prevState.accessToken,
    })),

  clearAuth: () => set({ user: null, accessToken: null }),
}));
