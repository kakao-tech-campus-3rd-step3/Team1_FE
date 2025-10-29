import { useInfiniteQuery } from '@tanstack/react-query';
import { taskApi } from '@/features/task/api/taskApi';
import type { TaskListResponse, UseInfiniteTasksOptions } from '@/features/task/types/taskTypes';
import { TASK_QUERY_KEYS } from '@/features/task/constants/taskQueryKeys';
import type { Direction, SortBy } from '@/features/board/types/sortTypes';
import { DIRECTION_ASC, SORT_BY_CREATED_AT } from '@/features/board/constants/sortConstants';

// 프로젝트 할 일 목록 조회 (상태)
export const useInfiniteProjectTasksByStatusQuery = (
  projectId: string,
  status: string,
  sortBy: SortBy = SORT_BY_CREATED_AT,
  direction: Direction = DIRECTION_ASC,
  options?: UseInfiniteTasksOptions,
) => {
  return useInfiniteQuery<TaskListResponse, Error>({
    queryKey: TASK_QUERY_KEYS.project(projectId, status, sortBy, direction),
    queryFn: ({ pageParam }) =>
      taskApi.fetchProjectTasksByStatus(
        projectId,
        typeof pageParam === 'string' ? pageParam : undefined,
        status,
        10,
        sortBy,
        direction,
      ),
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor : undefined),
    initialPageParam: undefined,
    ...options,
    enabled: !!projectId && options?.enabled !== false,
  });
};
