import { useInfiniteProjectTasksByStatusQuery } from '@/features/task/hooks/useInfiniteProjectTasksByStatusQuery';
import type { Status } from '@/features/board/types/boardTypes';
import type { TaskQuery } from '@/features/task/types/taskTypes';
import type { SortBy, Direction } from '@/features/board/types/sortTypes';
import { DIRECTION_ASC, SORT_BY_CREATED_AT } from '@/features/board/constants/sortConstants';

export const useAllProjectTasksQueries = (
  projectId: string,
  enabled: boolean,
  sortBy: SortBy = SORT_BY_CREATED_AT,
  direction: Direction = DIRECTION_ASC,
): Record<Status, TaskQuery> => {
  return {
    TODO: useInfiniteProjectTasksByStatusQuery(projectId, 'TODO', sortBy, direction, { enabled }),
    PROGRESS: useInfiniteProjectTasksByStatusQuery(projectId, 'PROGRESS', sortBy, direction, {
      enabled,
    }),
    REVIEW: useInfiniteProjectTasksByStatusQuery(projectId, 'REVIEW', sortBy, direction, {
      enabled,
    }),
    DONE: useInfiniteProjectTasksByStatusQuery(projectId, 'DONE', sortBy, direction, { enabled }),
  };
};
