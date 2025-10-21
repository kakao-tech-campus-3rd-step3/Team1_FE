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
    { previousData?: Record<string, InfiniteData<TaskListResponse> | undefined>; tempId?: string }
  >({
    mutationFn: (taskData) => taskApi.createTask(projectId, taskData),

    onMutate: async (taskData) => {
      const projectKey = ['tasks', projectId, taskData.status];
      const meKey = ['tasks', 'me', taskData.status];

      await Promise.all([
        queryClient.cancelQueries({ queryKey: projectKey }),
        queryClient.cancelQueries({ queryKey: meKey }),
      ]);

      const previousProjectData =
        queryClient.getQueryData<InfiniteData<TaskListResponse>>(projectKey);
      const previousMeData = queryClient.getQueryData<InfiniteData<TaskListResponse>>(meKey);

      const tempId = `temp-${uuidv4()}`;
      const tempTask = createTempTask(taskData, projectId, tempId);

      const updateCache = (oldData: InfiniteData<TaskListResponse> | undefined) => {
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
      };

      queryClient.setQueryData(projectKey, updateCache);
      queryClient.setQueryData(meKey, updateCache);

      return {
        previousData: {
          [projectKey.join('-')]: previousProjectData,
          [meKey.join('-')]: previousMeData,
        },
        tempId,
      };
    },

    onError: (_, taskData, context) => {
      const projectKey = ['tasks', projectId, taskData.status];
      const meKey = ['tasks', 'me', taskData.status];

      if (context?.previousData) {
        if (context.previousData[projectKey.join('-')])
          queryClient.setQueryData(projectKey, context.previousData[projectKey.join('-')]);
        if (context.previousData[meKey.join('-')])
          queryClient.setQueryData(meKey, context.previousData[meKey.join('-')]);
      }
    },

    onSuccess: (createdTask, taskData, context) => {
      const projectKey = ['tasks', projectId, taskData.status];
      const meKey = ['tasks', 'me', taskData.status];

      const replaceTempTask = (oldData: InfiniteData<TaskListResponse> | undefined) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            tasks: page.tasks.map((task) => (task.taskId === context?.tempId ? createdTask : task)),
          })),
        };
      };

      queryClient.setQueryData(projectKey, replaceTempTask);
      queryClient.setQueryData(meKey, replaceTempTask);
    },

    // onSettled에서 invalidateQueries 제거 → 깜빡임 방지
  });
};
