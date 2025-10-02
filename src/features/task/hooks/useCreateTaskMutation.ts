import { useMutation, useQueryClient } from '@tanstack/react-query';
import { kanbanApi } from '@/features/task/api/taskApi';
import type { Task } from '@/features/task/types/taskTypes';
import type { CreateTaskInput } from '@/features/task/schemas/taskSchema';
import { v4 as uuidv4 } from 'uuid';

const createTempTask = (taskData: CreateTaskInput, tempId: string): Task => ({
  id: tempId,
  title: taskData.title,
  description: taskData.description || '',
  status: taskData.status,
  tags: taskData.tags || [],
  assignees: taskData.assignees || [],
  dueDate: taskData.dueDate,
  urgent: taskData.urgent ?? false,
  comments: 0,
  files: 0,
  review: {
    requiredReviewCount: taskData.reviewCount || 0,
    approvedCount: 0,
    pendingCount: 0,
    isCompleted: false,
  },
});

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Task, Error, CreateTaskInput, { previousTasks?: Task[]; tempId?: string }>({
    mutationFn: (taskData) => kanbanApi.createTask(taskData),

    onMutate: (taskData) => {
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);
      const tempId = `temp-${uuidv4()}`;
      const newTempTask = createTempTask(taskData, tempId);

      queryClient.setQueryData<Task[]>(['tasks'], (old = []) => [newTempTask, ...old]);

      return { previousTasks, tempId };
    },

    onSuccess: (createdTask, _taskData, context) => {
      queryClient.setQueryData<Task[]>(['tasks'], (old = []) =>
        old.map((task) => (task.id === context?.tempId ? createdTask : task)),
      );
    },

    onError: (_err, _taskData, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData<Task[]>(['tasks'], context.previousTasks);
      }
    },
  });
};
