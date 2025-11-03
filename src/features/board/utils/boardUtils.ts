import { columnStatus } from '@/features/board/types/boardTypes';

export const getTitleByStatus = (status: (typeof columnStatus)[number]['status']) => {
  const column = columnStatus.find((c) => c.status === status);
  return column?.title ?? '';
};
