import { useMutation, useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { taskApi } from '@/features/task/api/taskApi';
import { TASK_QUERY_KEYS } from '@/features/task/api/taskQueryKeys';
import type { TaskListResponse } from '@/features/task/types/taskTypes';

interface DeleteTaskMutationVars {
  taskId: string;
  status: string;
}

export const useDeleteTaskMutation = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean },
    Error,
    DeleteTaskMutationVars,
    { previousData?: Map<readonly string[], InfiniteData<TaskListResponse> | undefined> }
  >({
    mutationFn: ({ taskId }) => taskApi.deleteTask(projectId, taskId),

    onMutate: async ({ taskId, status }) => {
      const projectKey = TASK_QUERY_KEYS.project(projectId, status);
      const meKey = TASK_QUERY_KEYS.meStatus(status);

      await Promise.all([
        queryClient.cancelQueries({ queryKey: projectKey }),
        queryClient.cancelQueries({ queryKey: meKey }),
      ]);

      const projectData = queryClient.getQueryData<InfiniteData<TaskListResponse>>(projectKey);
      const meData = queryClient.getQueryData<InfiniteData<TaskListResponse>>(meKey);

      const previousData = new Map<readonly string[], InfiniteData<TaskListResponse> | undefined>();
      previousData.set(projectKey, projectData);
      previousData.set(meKey, meData);

      const filterOutTask = (oldData?: InfiniteData<TaskListResponse>) =>
        oldData
          ? {
              ...oldData,
              pages: oldData.pages.map((page) => ({
                ...page,
                tasks: page.tasks.filter((t) => t.taskId !== taskId),
              })),
            }
          : oldData;

      queryClient.setQueryData(projectKey, filterOutTask(projectData));
      queryClient.setQueryData(meKey, filterOutTask(meData));

      projectData?.pages.forEach((page) => {
        const targetTask = page.tasks.find((task) => task.taskId === taskId);
        targetTask?.assignees.forEach((assignee) => {
          const memberKey = TASK_QUERY_KEYS.member(projectId, assignee.id);
          queryClient.cancelQueries({ queryKey: memberKey });

          const memberData = queryClient.getQueryData<InfiniteData<TaskListResponse>>(memberKey);
          if (memberData) {
            queryClient.setQueryData(memberKey, filterOutTask(memberData));
          }
          previousData.set(memberKey, memberData);
        });
      });

      return { previousData };
    },

    onError: (_, __, context) => {
      if (context?.previousData) {
        context.previousData.forEach((data, key) => {
          queryClient.setQueryData(key, data);
        });
      }
    },
  });
};
