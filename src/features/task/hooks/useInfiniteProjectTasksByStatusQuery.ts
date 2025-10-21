import { useInfiniteQuery } from '@tanstack/react-query';
import { taskApi } from '@/features/task/api/taskApi';
import type { TaskListResponse } from '@/features/task/types/taskTypes';

interface UseInfiniteTasksOptions {
  enabled?: boolean;
}

// 프로젝트 할 일 목록 조회 - 상태 기준 (커서 기반 무한 스크롤)
export const useInfiniteProjectTasksByStatusQuery = (
  projectId: string,
  status: string,
  options?: UseInfiniteTasksOptions,
) => {
  return useInfiniteQuery({
    queryKey: ['tasks', projectId, status],
    queryFn: ({ pageParam }: { pageParam?: string }) =>
      taskApi.fetchProjectTasksByStatus(projectId, pageParam, status),
    getNextPageParam: (lastPage: TaskListResponse) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    initialPageParam: undefined,
    ...options,
  });
};
