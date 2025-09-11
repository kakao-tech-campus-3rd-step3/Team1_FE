import { useMutation, useQueryClient } from '@tanstack/react-query';
import { kanbanApi } from '@/features/task/api/taskApi';
import type { Task } from '@/features/task/types/taskTypes';
import { generateId } from '@/shared/utils/idUtils';

// 할 일 생성
export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: kanbanApi.createTask,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData(['tasks']);

      const newTempTask: Task = {
        id: `temp-${generateId()}`,
        status: 'TODO',
        title: '새로운 할 일',
        tags: ['임시'],
        assignees: ['신규'],
        dueDate: '',
        comments: 0,
        files: 0,
        description: '',
        urgent: false,
        requiredReviewCount: 2,
      };

      queryClient.setQueryData(['tasks'], (old: Task[]) => {
        return [...(old || []), newTempTask];
      });

      return { previousTasks };
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
