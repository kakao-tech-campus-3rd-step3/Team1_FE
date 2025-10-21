import { useInfiniteMyTasksByStatusQuery } from '@/features/task/hooks/useInfiniteMyTasksByStatusQuery';
import type { Status } from '@/features/board/types/boardTypes';
import type { TaskQuery } from '@/features/task/types/taskTypes';

export const useAllMyTasksQueries = (enabled: boolean): Record<Status, TaskQuery> => {
  return {
    TODO: useInfiniteMyTasksByStatusQuery('TODO', { enabled }),
    PROGRESS: useInfiniteMyTasksByStatusQuery('PROGRESS', { enabled }),
    REVIEW: useInfiniteMyTasksByStatusQuery('REVIEW', { enabled }),
    DONE: useInfiniteMyTasksByStatusQuery('DONE', { enabled }),
  };
};
