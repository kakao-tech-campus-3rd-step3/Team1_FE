import type { Task } from '@/features/task/types/taskTypes';
import type { Id } from '@/shared/types/commonTypes';
import type { CreateTaskInput } from '@/features/task/schemas/taskSchema';
import { v4 as uuidv4 } from 'uuid';
import { arrayMove } from '@dnd-kit/sortable';
import { mockTasks } from '@/shared/data/mockTasks';

// 추후 실제 API 호출 예정
export const kanbanApi = {
  fetchTasks: async (): Promise<Task[]> => {
    return mockTasks;
  },

  // 할 일 생성
  createTask: async (taskData: CreateTaskInput): Promise<Task> => {
    const newTask: Task = {
      id: uuidv4(),
      status: taskData.status,
      title: taskData.title,
      description: taskData.description || '',
      tags: taskData.tags || [],
      assignees: taskData.assignees,
      dueDate: taskData.dueDate,
      urgent: taskData.urgent || false,
      comments: 0,
      files: 0,
      review: {
        requiredReviewCount: taskData.reviewCount || 0,
        approvedCount: 0,
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
      mockTasks.splice(index, 1);
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
