import { useQuery } from '@tanstack/react-query';
import { kanbanApi } from '@/features/task/api/taskApi';
import type { Task } from '@/features/task/types/taskTypes';

// 할 일 조회
export const useTasksQuery = () => {
  return useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: kanbanApi.fetchTasks,
  });
};
