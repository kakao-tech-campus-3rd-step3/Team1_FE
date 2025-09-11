import { useMutation, useQueryClient } from '@tanstack/react-query';
import { kanbanApi } from '@/features/task/api/taskApi';
import type { Id } from '@/shared/types/commonTypes';

// 할 일 이동
export const useMoveTaskMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ activeTaskId, overId }: { activeTaskId: Id; overId: Id }) =>
      kanbanApi.moveTask(activeTaskId, overId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });
};
