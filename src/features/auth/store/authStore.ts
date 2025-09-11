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
  setAuth: (payload: { user?: User; token?: string }) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  setAuth: ({ user, token }) =>
    set((prevState) => ({
      user: user !== undefined ? user : prevState.user,
      accessToken: token !== undefined ? token : prevState.accessToken,
    })),

  clearAuth: () => set({ user: null, accessToken: null }),
}));
