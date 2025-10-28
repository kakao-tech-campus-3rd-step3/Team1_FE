import { useQuery } from '@tanstack/react-query';
import { taskApi } from '@/features/task/api/taskApi';
import { TASK_QUERY_KEYS } from '@/features/task/api/taskQueryKeys';

// 할 일 상세 조회
export const useTaskDetailQuery = (projectId: string, taskId: string) => {
  return useQuery({
    queryKey: TASK_QUERY_KEYS.detail(projectId, taskId),
    queryFn: () => taskApi.fetchTaskDetail(projectId, taskId),
  });
};
