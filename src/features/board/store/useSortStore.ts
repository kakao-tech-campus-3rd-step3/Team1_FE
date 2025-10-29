import { create } from 'zustand';
import type { SortState } from '@/features/board/types/sortTypes';
import {
  DIRECTION_ASC,
  DIRECTION_DESC,
  SORT_BY_CREATED_AT,
} from '@/features/board/constants/sortConstants';

export const useSortStore = create<SortState>((set) => ({
  sortBy: SORT_BY_CREATED_AT,
  direction: DIRECTION_ASC,

  setSortBy: (newSortBy) =>
    set(() => ({
      sortBy: newSortBy,
    })),

  toggleDirection: () =>
    set((state) => ({
      direction: state.direction === DIRECTION_ASC ? DIRECTION_DESC : DIRECTION_ASC,
    })),

  resetSort: () =>
    set(() => ({
      sortBy: SORT_BY_CREATED_AT,
      direction: DIRECTION_ASC,
    })),
}));