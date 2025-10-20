import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { taskApi } from '@/features/task/api/taskApi';
import type { TaskListResponse } from '@/features/task/types/taskTypes';

// 할 일 목록 조회 - 상태 기준 (커서 기반 무한 스크롤)
export const useInfiniteTasksByStatusQuery = (projectId: string, status: string) => {
  return useInfiniteQuery<
    TaskListResponse,
    Error,
    InfiniteData<TaskListResponse>,
    [string, string, string],
    string | undefined
  >({
    queryKey: ['tasks', projectId, status],
    queryFn: ({ pageParam }) =>
      taskApi.fetchTasksByStatus(
        projectId,
        typeof pageParam === 'string' ? pageParam : undefined,
        status,
      ),
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor : undefined),
    initialPageParam: undefined,
  });
};
