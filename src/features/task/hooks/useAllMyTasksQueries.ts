import { useInfiniteMyTasksByStatusQuery } from '@/features/task/hooks/useInfiniteMyTasksByStatusQuery';
import type { Status } from '@/features/board/types/boardTypes';
import type { TaskQuery } from '@/features/task/types/taskTypes';
import type { Direction, SortBy } from '@/features/board/types/sortTypes';
import { DIRECTION_ASC, SORT_BY_CREATED_AT } from '@/features/board/constants/sortConstants';

export const useAllMyTasksQueries = (
  enabled: boolean,
  sortBy: SortBy = SORT_BY_CREATED_AT,
  direction: Direction = DIRECTION_ASC,
): Record<Status, TaskQuery> => {
  return {
    TODO: useInfiniteMyTasksByStatusQuery('TODO', sortBy, direction, { enabled }),
    PROGRESS: useInfiniteMyTasksByStatusQuery('PROGRESS', sortBy, direction, { enabled }),
    REVIEW: useInfiniteMyTasksByStatusQuery('REVIEW', sortBy, direction, { enabled }),
    DONE: useInfiniteMyTasksByStatusQuery('DONE', sortBy, direction, { enabled }),
  };
};
