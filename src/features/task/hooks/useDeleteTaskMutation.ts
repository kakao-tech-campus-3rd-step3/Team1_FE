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
      const projectKey = ['tasks', projectId, status];
      const meKey = ['tasks', 'me', status];

      await Promise.all([
        queryClient.cancelQueries({ queryKey: projectKey }),
        queryClient.cancelQueries({ queryKey: meKey }),
      ]);

      const previousProjectData =
        queryClient.getQueryData<InfiniteData<TaskListResponse>>(projectKey);
      const previousMeData = queryClient.getQueryData<InfiniteData<TaskListResponse>>(meKey);

      const updateCache = (oldData: InfiniteData<TaskListResponse> | undefined) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            tasks: page.tasks.filter((t) => t.taskId !== taskId),
          })),
        };
      };

      queryClient.setQueryData(projectKey, updateCache);
      queryClient.setQueryData(meKey, updateCache);

      return {
        previousData: {
          [projectKey.join('-')]: previousProjectData,
          [meKey.join('-')]: previousMeData,
        },
      };
    },

    onError: (error, { status }, context) => {
      console.error('할 일 삭제 실패:', error);
      const projectKey = ['tasks', projectId, status];
      const meKey = ['tasks', 'me', status];

      if (context?.previousData) {
        const prevProj = context.previousData[projectKey.join('-')];
        const prevMe = context.previousData[meKey.join('-')];
        if (prevProj) queryClient.setQueryData(projectKey, prevProj);
        if (prevMe) queryClient.setQueryData(meKey, prevMe);
      }
    },

    onSuccess: (_, { status }) => {
      const projectKey = ['tasks', projectId, status];
      const meKey = ['tasks', 'me', status];

      queryClient.invalidateQueries({ queryKey: projectKey });
      queryClient.invalidateQueries({ queryKey: meKey });
    },
  });
};
