import type { Task } from '@/features/task/types/taskTypes';
import type { Id } from '@/shared/types/commonTypes';
import { generateId } from '@/shared/utils/idUtils';
import { arrayMove } from '@dnd-kit/sortable';
import { mockTasks } from '@/shared/data/mockTasks';

// 추후 실제 API 호출 예정
export const kanbanApi = {
  fetchTasks: async (): Promise<Task[]> => {
    return mockTasks;
  },

  // 할 일 생성
  createTask: async (status: string): Promise<Task> => {
    const newTask: Task = {
      id: generateId(),
      status: status,
      title: '새로운 할 일',
      tags: ['FE'],
      assignees: ['유다연'],
      dueDate: '2025-09-20',
      comments: 0,
      files: 0,
      description: '할 일 설명',
      urgent: true,
      review: {
        requiredReviewCount: 4,
        approvedCount: 2,
        pendingCount: 0,
        isCompleted: false,
      },
    };
    mockTasks.push(newTask);
    return newTask;
  },

  // 할 일 삭제
  deleteTask: async (id: Id): Promise<{ success: boolean }> => {
    const index = mockTasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      const newTasks = mockTasks.filter((task) => task.id !== id);
      mockTasks.splice(0, mockTasks.length, ...newTasks);
    }
    return { success: true };
  },

  // 할 일 이동
  moveTask: async (activeTaskId: Id, overId: Id): Promise<{ id: Id; status: string }> => {
    const activeIndex = mockTasks.findIndex((t) => t.id === activeTaskId);
    if (activeIndex === -1) {
      throw new Error('Task not found');
    }

    const overTaskIndex = mockTasks.findIndex((t) => t.id === overId);

    if (overTaskIndex !== -1) {
      if (mockTasks[activeIndex].status === mockTasks[overTaskIndex].status) {
        const moved = arrayMove(mockTasks, activeIndex, overTaskIndex);
        mockTasks.splice(0, mockTasks.length, ...moved);
      } else {
        mockTasks[activeIndex].status = mockTasks[overTaskIndex].status;
        const moved = arrayMove(mockTasks, activeIndex, overTaskIndex);
        mockTasks.splice(0, mockTasks.length, ...moved);
      }
    } else {
      mockTasks[activeIndex].status = String(overId);
    }
    return { id: activeTaskId, status: mockTasks[activeIndex].status };
  },
};
