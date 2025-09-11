import { create } from 'zustand';

interface SortState {
  criteria: 'created' | 'deadline';
  order: 'asc' | 'desc';
  setCriteria: (c: 'created' | 'deadline') => void;
  toggleOrder: () => void;
}

export const useSortStore = create<SortState>((set) => ({
  criteria: 'created',
  order: 'asc',
  setCriteria: (c) => set({ criteria: c }),
  toggleOrder: () => set((state) => ({ order: state.order === 'asc' ? 'desc' : 'asc' })),
}));
