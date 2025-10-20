import { useQuery } from '@tanstack/react-query';
import { taskApi } from '@/features/task/api/taskApi';

// 할 일 상세 조회
export const useTaskDetailQuery = (projectId: string, taskId: string) => {
  return useQuery({
    queryKey: ['taskDetail', projectId, taskId],
    queryFn: () => taskApi.fetchTaskDetail(projectId, taskId),
  });
};
