import { create } from 'zustand';

interface AvatarStore {
  selectedAvatarId: string;
  selectedBgColor: string | null;
  isDrawerOpen: boolean;
  setAvatarId: (id: string) => void;
  setBgColor: (color: string) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

export const useAvatarStore = create<AvatarStore>((set) => ({
  selectedAvatarId: '0',
  selectedBgColor: null,
  isDrawerOpen: false,
  setAvatarId: (id) => set({ selectedAvatarId: id }),
  setBgColor: (color) => set({ selectedBgColor: color }),
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
}));
