import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskApi } from '@/features/task/api/taskApi';
import type { TaskListItem } from '@/features/task/types/taskTypes';
import { TASK_QUERY_KEYS } from '@/features/task/constants/taskQueryKeys';
import type { UpdateTaskInput } from '@/features/task/schemas/taskSchema';

export const useUpdateTaskMutation = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    TaskListItem,
    Error,
    { taskId: string; taskData: UpdateTaskInput },
    { previousTask?: TaskListItem }
  >({
    mutationFn: ({ taskId, taskData }) => taskApi.updateTask(projectId, taskId, taskData),

    onMutate: async ({ taskId, taskData }) => {
      const previousTask = queryClient.getQueryData<TaskListItem>(
        TASK_QUERY_KEYS.detail(projectId, taskId),
      );

      if (previousTask) {
        queryClient.setQueryData(TASK_QUERY_KEYS.detail(projectId, taskId), {
          ...previousTask,
          ...taskData,
          assignees: previousTask.assignees,
          tags: previousTask.tags,
          updatedAt: new Date().toISOString(),
        });
      }

      return { previousTask };
    },

    onError: (_, variables, context) => {
      if (context?.previousTask) {
        queryClient.setQueryData(
          TASK_QUERY_KEYS.detail(projectId, variables.taskId),
          context.previousTask,
        );
      }
      toast.error('할 일 수정에 실패했습니다.');
    },

    onSuccess: (updatedTask) => {
      queryClient.setQueryData(TASK_QUERY_KEYS.detail(projectId, updatedTask.taskId), updatedTask);
    },
  });
};
