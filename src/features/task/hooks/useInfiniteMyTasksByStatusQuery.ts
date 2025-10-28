import { useInfiniteQuery } from '@tanstack/react-query';
import { taskApi } from '@/features/task/api/taskApi';
import type { TaskListResponse, UseInfiniteTasksOptions } from '@/features/task/types/taskTypes';
import { TASK_QUERY_KEYS } from '@/features/task/api/taskQueryKeys';

// 나의 할 일 목록 조회 - 상태 기준 (커서 기반 무한 스크롤)
export const useInfiniteMyTasksByStatusQuery = (
  status: string,
  options?: UseInfiniteTasksOptions,
) => {
  return useInfiniteQuery<TaskListResponse, Error>({
    queryKey: TASK_QUERY_KEYS.meStatus(status),
    queryFn: ({ pageParam }) =>
      taskApi.fetchMyTasksByStatus(typeof pageParam === 'string' ? pageParam : undefined, status),
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor : undefined),
    initialPageParam: undefined,
    ...options,
  });
};
