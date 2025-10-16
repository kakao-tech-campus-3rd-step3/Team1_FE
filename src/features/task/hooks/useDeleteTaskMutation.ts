import { useMutation, useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { taskApi } from '@/features/task/api/taskApi';
import type { TaskListResponse } from '@/features/task/types/taskTypes';

interface DeleteTaskMutationVars {
  taskId: string;
  status: string;
}

export const useDeleteTaskMutation = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId }: DeleteTaskMutationVars) => taskApi.deleteTask(projectId, taskId),

    onMutate: async ({ taskId, status }) => {
      const queryKey = ['tasks', projectId, status];
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData<InfiniteData<TaskListResponse>>(queryKey);

      queryClient.setQueryData<InfiniteData<TaskListResponse>>(queryKey, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            tasks: page.tasks.filter((t) => t.taskId !== taskId),
          })),
        };
      });

      return { previousData };
    },

    onError: (error, vars, context) => {
      console.error('할 일 삭제 실패:', error);
      if (context?.previousData) {
        queryClient.setQueryData(['tasks', projectId, vars.status], context.previousData);
      }
    },

    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId, status] });
    },
  });
};
