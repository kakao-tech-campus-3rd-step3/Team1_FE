import { useMutation, useQueryClient } from '@tanstack/react-query';
import { kanbanApi } from '@/features/task/api/taskApi';
import type { Task } from '../types/taskTypes';
import type { Id } from '@/shared/types/commonTypes';

// 할 일 삭제
export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: kanbanApi.deleteTask,
    onMutate: (id: Id) => {
      queryClient.setQueryData<Task[]>(['tasks'], (old) => old?.filter((task) => task.id !== id));
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });
};
