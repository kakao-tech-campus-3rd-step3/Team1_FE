import { useQuery } from '@tanstack/react-query';
import { taskApi } from '@/features/task/api/taskApi';
import { TASK_QUERY_KEYS } from '@/features/task/constants/taskQueryKeys';
import type { TaskCountByStatusMap } from '@/features/task/types/taskTypes';

// 나의 할 일 개수 조회 (전체)
export const useMyTaskCountByStatusQuery = (enabled = true) => {
  return useQuery<TaskCountByStatusMap, Error>({
    queryKey: TASK_QUERY_KEYS.meCountStatus(),
    queryFn: () => taskApi.fetchMyTaskCountByStatus(),
    enabled,
  });
};
