import { create } from 'zustand';
import type { SortState } from '@/features/board/types/sortTypes';
import { DIRECTION, SORT_BY } from '@/features/board/constants/sortConstants';

export const useSortStore = create<SortState>((set) => ({
  sortBy: SORT_BY.CREATED_AT,
  direction: DIRECTION.ASC,

  setSortBy: (newSortBy) =>
    set(() => ({
      sortBy: newSortBy,
    })),

  toggleDirection: () =>
    set((state) => ({
      direction: state.direction === DIRECTION.ASC ? DIRECTION.DESC : DIRECTION.ASC,
    })),

  resetSort: () =>
    set(() => ({
      sortBy: SORT_BY.CREATED_AT,
      direction: DIRECTION.ASC,
    })),
}));
