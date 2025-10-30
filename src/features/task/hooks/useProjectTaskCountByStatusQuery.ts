import { useQuery } from '@tanstack/react-query';
import { taskApi } from '@/features/task/api/taskApi';
import { TASK_QUERY_KEYS } from '@/features/task/constants/taskQueryKeys';
import type { TaskCountByStatusMap } from '@/features/task/types/taskTypes';

// 프로젝트 상태별 할 일 개수 조회 (전체)
export const useProjectTaskCountByStatusQuery = (projectId?: string, enabled = true) => {
  return useQuery<TaskCountByStatusMap, Error>({
    queryKey: TASK_QUERY_KEYS.projectCountStatus(projectId ?? ''),
    queryFn: () => taskApi.fetchProjectTaskCountByStatus(projectId ?? ''),
    enabled: enabled && !!projectId,
  });
};
