import type { Member } from '@/shared/data/mockMembers';
import { create } from 'zustand';

interface AuthState {
  user: Member | null;
  accessToken: string | null;
  setAuth: (payload: { user?: Partial<Member>; token?: string }) => void;
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
      user: user ? ({ ...prevState.user, ...user } as Member) : prevState.user,
      accessToken: token ?? prevState.accessToken,
    })),

  clearAuth: () => set({ user: null, accessToken: null }),
}));
