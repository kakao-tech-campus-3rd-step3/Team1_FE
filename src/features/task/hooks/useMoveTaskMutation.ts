import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskApi } from '@/features/task/api/taskApi';
import { arrayMove } from '@dnd-kit/sortable';
import type { InfiniteData } from '@tanstack/react-query';
import type { TaskListResponse, TaskListItem } from '@/features/task/types/taskTypes';
import axios from 'axios';

type MoveTaskParams = {
  projectId: string;
  activeTaskId: string;
  fromStatus: string;
  toStatus: string;
  overId?: string;
};

const createTempTask = (taskId: string, toStatus: string): TaskListItem => ({
  taskId,
  projectId: '',
  title: '',
  description: '',
  status: toStatus,
  dueDate: '',
  urgent: false,
  requiredReviewerCount: 0,
  tags: [],
  assignees: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const useMoveTaskMutation = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ activeTaskId, toStatus }: MoveTaskParams) =>
      taskApi.moveTask(projectId, activeTaskId, toStatus),

    onMutate: async ({ activeTaskId, fromStatus, toStatus, overId }) => {
      const fromKey = ['tasks', projectId, fromStatus];
      const toKey = ['tasks', projectId, toStatus];

      await queryClient.cancelQueries({ queryKey: fromKey });
      await queryClient.cancelQueries({ queryKey: toKey });

      const previousFrom = queryClient.getQueryData<InfiniteData<TaskListResponse>>(fromKey);
      const previousTo = queryClient.getQueryData<InfiniteData<TaskListResponse>>(toKey);

      // 같은 상태 내 이동
      if (fromStatus === toStatus && previousFrom) {
        queryClient.setQueryData<InfiniteData<TaskListResponse>>(fromKey, (old) => {
          if (!old) return old;

          const pages = old.pages.map((page) => {
            const tasks = page.tasks.slice();
            if (overId) {
              const activeIndex = tasks.findIndex((t) => t.taskId === activeTaskId);
              const overIndex = tasks.findIndex((t) => t.taskId === overId);
              const newTasks = arrayMove(tasks, activeIndex, overIndex);
              return { ...page, tasks: newTasks };
            }
            return page;
          });

          return { ...old, pages };
        });
      }

      // 다른 상태로 이동
      if (fromStatus !== toStatus) {
        // 이전 상태 페이지에서 삭제
        if (previousFrom) {
          queryClient.setQueryData<InfiniteData<TaskListResponse>>(fromKey, (old) => {
            if (!old) return old;
            const pages = old.pages.map((page) => ({
              ...page,
              tasks: page.tasks.filter((t) => t.taskId !== activeTaskId),
            }));
            return { ...old, pages };
          });
        }

        // 새 상태 페이지에 추가
        const tempTask = createTempTask(activeTaskId, toStatus);
        queryClient.setQueryData<InfiniteData<TaskListResponse>>(toKey, (old) => {
          if (!old) {
            // 페이지가 없으면 새로 생성
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

          // 기존 페이지가 있으면 첫 페이지에 추가
          const pages = old.pages.map((page, index) =>
            index === 0 ? { ...page, tasks: [tempTask, ...page.tasks] } : page,
          );
          return { ...old, pages };
        });
      }

      return { previousFrom, previousTo };
    },

    onError: (error, variables, context) => {
      // 롤백
      if (context?.previousFrom) {
        queryClient.setQueryData(['tasks', projectId, variables.fromStatus], context.previousFrom);
      }
      if (context?.previousTo) {
        queryClient.setQueryData(['tasks', projectId, variables.toStatus], context.previousTo);
      }

      if (axios.isAxiosError(error) && error.response?.status === 403) {
        console.warn('권한 없음: 담당자만 이동 가능');
        return;
      }
      alert('할 일 이동 중 오류가 발생했습니다.');
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId, variables.fromStatus] });
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId, variables.toStatus] });
    },
  });
};
