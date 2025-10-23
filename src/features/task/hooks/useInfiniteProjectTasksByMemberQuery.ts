import { useInfiniteQuery } from '@tanstack/react-query';
import { taskApi } from '@/features/task/api/taskApi';
import type { TaskListResponse, UseInfiniteTasksOptions } from '@/features/task/types/taskTypes';
import { TASK_QUERY_KEYS } from '@/features/task/api/taskQueryKeys';

// 프로젝트 할 일 목록 조회 - 멤버 기준 (커서 기반 무한 스크롤)
export const useInfiniteProjectTasksByMemberQuery = (
  projectId: string,
  memberId: string,
  options?: UseInfiniteTasksOptions,
) => {
  return useInfiniteQuery({
    queryKey: TASK_QUERY_KEYS.member(projectId, memberId),
    queryFn: ({ pageParam }: { pageParam?: string }) =>
      taskApi.fetchProjectTasksByMember(projectId, memberId, pageParam),
    getNextPageParam: (lastPage: TaskListResponse) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    initialPageParam: undefined,
    ...options,
    enabled: !!projectId,
  });
};
