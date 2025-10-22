import { useInfiniteProjectTasksByStatusQuery } from '@/features/task/hooks/useInfiniteProjectTasksByStatusQuery';
import type { Status } from '@/features/board/types/boardTypes';
import type { TaskQuery } from '@/features/task/types/taskTypes';

export const useAllProjectTasksQueries = (
  projectId: string,
  enabled: boolean,
): Record<Status, TaskQuery> => {
  return {
    TODO: useInfiniteProjectTasksByStatusQuery(projectId, 'TODO', { enabled }),
    PROGRESS: useInfiniteProjectTasksByStatusQuery(projectId, 'PROGRESS', { enabled }),
    REVIEW: useInfiniteProjectTasksByStatusQuery(projectId, 'REVIEW', { enabled }),
    DONE: useInfiniteProjectTasksByStatusQuery(projectId, 'DONE', { enabled }),
  };
};
