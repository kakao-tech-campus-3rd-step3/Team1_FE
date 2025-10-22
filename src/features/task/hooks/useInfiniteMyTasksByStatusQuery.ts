import { useInfiniteQuery } from '@tanstack/react-query';
import { taskApi } from '@/features/task/api/taskApi';
import type { TaskListResponse } from '@/features/task/types/taskTypes';

interface UseInfiniteTasksOptions {
  enabled?: boolean;
}

// 나의 할 일 목록 조회 - 상태 기준 (커서 기반 무한 스크롤)
export const useInfiniteMyTasksByStatusQuery = (
  status: string,
  options?: UseInfiniteTasksOptions,
) => {
  return useInfiniteQuery<TaskListResponse, Error>({
    queryKey: ['tasks', 'me', status],
    queryFn: ({ pageParam }) =>
      taskApi.fetchMyTasksByStatus(typeof pageParam === 'string' ? pageParam : undefined, status),
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor : undefined),
    initialPageParam: undefined,
    ...options,
  });
};
