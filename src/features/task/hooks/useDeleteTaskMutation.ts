import { useMutation, useQueryClient } from '@tanstack/react-query';
import { kanbanApi } from '@/features/task/api/taskApi';

// 할 일 삭제
export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: kanbanApi.deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });
};
