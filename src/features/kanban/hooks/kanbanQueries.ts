import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { kanbanApi } from '../services/kanbanApi';
import type { Task } from '../types/kanbanTypes';
import type { Id } from '@/shared/types/commonTypes';
import { generateId } from '@/shared/utils/idUtils';

// 할 일 조회
export const useTasksQuery = () => {
  return useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: kanbanApi.fetchTasks,
  });
};

// 할 일 생성
export const useCreateTask = () => {
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

// 할 일 삭제
export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: kanbanApi.deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });
};

// 할 일 이동
export const useMoveTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ activeTaskId, overId }: { activeTaskId: Id; overId: Id }) =>
      kanbanApi.moveTask(activeTaskId, overId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });
};
