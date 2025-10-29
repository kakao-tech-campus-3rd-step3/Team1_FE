import type { Direction, SortBy } from '@/features/board/types/sortTypes';

export const SORT_BY_CREATED_AT: SortBy = 'CREATED_AT';
export const SORT_BY_DUE_DATE: SortBy = 'DUE_DATE';

export const DIRECTION_ASC: Direction = 'ASC';
export const DIRECTION_DESC: Direction = 'DESC';

export const SORT_OPTIONS = [
  { label: '생성일자순', value: SORT_BY_CREATED_AT },
  { label: '마감일자순', value: SORT_BY_DUE_DATE },
] as const;
