import { useMutation, useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { taskApi } from '@/features/task/api/taskApi';
import type { TaskListItem, TaskListResponse } from '@/features/task/types/taskTypes';
import type { CreateTaskInput } from '@/features/task/schemas/taskSchema';
import { v4 as uuidv4 } from 'uuid';

const createTempTask = (
  taskData: CreateTaskInput,
  projectId: string,
  tempId: string,
): TaskListItem => ({
  taskId: tempId,
  projectId,
  title: taskData.title,
  description: taskData.description || '',
  status: taskData.status,
  dueDate: taskData.dueDate,
  urgent: taskData.urgent ?? false,
  requiredReviewerCount: taskData.requiredReviewerCount ?? 0,
  tags: taskData.tags || [],
  assignees: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const useCreateTaskMutation = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    TaskListItem,
    Error,
    CreateTaskInput,
    { previousData?: InfiniteData<TaskListResponse>; tempId?: string }
  >({
    mutationFn: (taskData) => taskApi.createTask(projectId, taskData),

    onMutate: async (taskData) => {
      const queryKey = ['tasks', projectId, taskData.status];
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<InfiniteData<TaskListResponse>>(queryKey);
      const tempId = `temp-${uuidv4()}`;
      const tempTask = createTempTask(taskData, projectId, tempId);

      queryClient.setQueryData<InfiniteData<TaskListResponse>>(queryKey, (oldData) => {
        if (!oldData) {
          return {
            pageParams: [undefined],
            pages: [
              {
                tasks: [tempTask],
                count: 1,
                nextCursor: undefined,
                hasNext: false,
              },
            ],
          };
        }

        return {
          ...oldData,
          pages: oldData.pages.map((page, idx) =>
            idx === 0 ? { ...page, tasks: [tempTask, ...page.tasks] } : page,
          ),
        };
      });

      return { previousData, tempId };
    },

    onError: (_, taskData, context) => {
      const queryKey = ['tasks', projectId, taskData.status];
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },

    onSuccess: (createdTask, taskData, context) => {
      const queryKey = ['tasks', projectId, taskData.status];

      queryClient.setQueryData<InfiniteData<TaskListResponse>>(queryKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            tasks: page.tasks.map((task) => (task.taskId === context?.tempId ? createdTask : task)),
          })),
        };
      });
    },

    onSettled: (_, __, taskData) => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId, taskData.status] });
    },
  });
};
