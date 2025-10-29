export type SortBy = 'CREATED_AT' | 'DUE_DATE';
export type Direction = 'ASC' | 'DESC';

export interface SortState {
  sortBy: SortBy;
  direction: Direction;
  setSortBy: (newSortBy: SortBy) => void;
  toggleDirection: () => void;
  resetSort: () => void;
}
