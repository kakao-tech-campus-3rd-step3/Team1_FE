import { useInfiniteQuery } from '@tanstack/react-query';
import { taskApi } from '@/features/task/api/taskApi';
import { useSortStore } from '@/features/board/store/useSortStore';
import { useBoardSearchStore } from '@/features/board/store/useBoardSearchStore';
import { BOARD_KEYS } from '@/features/board/constants/boardConstants';
import type {
  MemberTaskListResponse,
  UseInfiniteTasksOptions,
} from '@/features/task/types/taskTypes';
import { TASK_QUERY_KEYS } from '@/features/task/constants/taskQueryKeys';

// 프로젝트 할 일 목록 조회 (멤버)
export const useInfiniteProjectTasksByMemberQuery = (
  projectId: string,
  memberId: string,
  options?: UseInfiniteTasksOptions,
) => {
  const { sortBy, direction } = useSortStore();
  const search = useBoardSearchStore((state) => state.searchMap[BOARD_KEYS.PROJECT_MEMBER]);

  return useInfiniteQuery<MemberTaskListResponse, Error>({
    queryKey: TASK_QUERY_KEYS.member(projectId, memberId, sortBy, direction, search),
    queryFn: ({ pageParam }) =>
      taskApi.fetchProjectTasksByMember(
        projectId,
        memberId,
        typeof pageParam === 'string' ? pageParam : undefined,
        10,
        sortBy,
        direction,
        search,
      ),
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor : undefined),
    initialPageParam: undefined,
    ...options,
    enabled: !!projectId,
  });
};
