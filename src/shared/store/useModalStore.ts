import { create } from 'zustand';
import type { ModalPayload } from '@/shared/types/modalTypes';

interface ModalState {
  stack: ModalPayload[];
  openModal: (payload: ModalPayload) => void;
  resetModal: () => void;
  backModal: () => void;
  setLoading: (isLoading: boolean) => void;
}

const useModalStore = create<ModalState>((set) => ({
  stack: [],
  openModal: (payload) =>
    set((state) => ({ stack: [...state.stack, { ...payload, isLoading: false }] })),
  resetModal: () => set({ stack: [] }),
  backModal: () =>
    set((state) => {
      if (state.stack.length <= 1) return { stack: [] };
      const newStack = state.stack.slice(0, -1);
      const lastStackIndex = newStack.length - 1;
      newStack[lastStackIndex] = { ...newStack[lastStackIndex], isLoading: false };
      return { stack: newStack };
    }),
  setLoading: (isLoading) =>
    set((state) => {
      const stackLen = state.stack.length;
      if (stackLen === 0) return state;
      const updatedStack = [...state.stack];
      updatedStack[stackLen - 1] = { ...updatedStack[stackLen - 1], isLoading };
      return { stack: updatedStack };
    }),
}));

export default useModalStore;
