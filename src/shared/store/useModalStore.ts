import { create } from 'zustand';
import type { ModalPayload } from '@/shared/types/modalTypes';

interface ModalState {
  stack: ModalPayload[];
  isLoading: boolean;
  openModal: (payload: ModalPayload) => void;
  closeModal: () => void;
  backModal: () => void;
  setLoading: (isLoading: boolean) => void;
}

const useModalStore = create<ModalState>((set) => ({
  stack: [],
  isLoading: false,
  openModal: (payload) => set((state) => ({ stack: [...state.stack, payload] })),
  closeModal: () => set({ stack: [], isLoading: false }),
  backModal: () =>
    set((state) => ({
      stack: state.stack.length > 1 ? state.stack.slice(0, -1) : [],
      isLoading: false,
    })),
  setLoading: (isLoading) => set({ isLoading }),
}));

export default useModalStore;
