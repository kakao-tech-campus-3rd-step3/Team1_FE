import type { Task } from '../types/kanbanTypes';
import type { Id } from '@/shared/types/commonTypes';
import { generateId } from '@/shared/utils/idUtils';
import { arrayMove } from '@dnd-kit/sortable';

// 임시 mock task 데이터
let mockTasks: Task[] = [
  {
    id: '1',
    status: 'TODO',
    title: '웹사이트 레이아웃 구현',
    tags: ['FE'],
    assignees: ['박민수', '유다연'],
    description: '메인 페이지 레이아웃 구현하기',
    dueDate: '2025-09-09',
    comments: 2,
    files: 3,
    urgent: true,
    requiredReviewCount: 0,
  },
  {
    id: '2',
    status: 'TODO',
    title: 'API 설계',
    tags: ['BE'],
    assignees: ['김철수'],
    description: '백엔드 API 설계 작성',
    dueDate: '2025-09-15',
    comments: 0,
    files: 1,
    urgent: true,
    requiredReviewCount: 2,
  },
  {
    id: '3',
    status: 'PROGRESS',
    title: '로그인 기능 개발',
    tags: ['FE', 'BE'],
    assignees: ['유다연', '박민수'],
    description: '사용자 로그인 및 인증 로직 구현',
    dueDate: '2025-09-20',
    comments: 5,
    files: 0,
    urgent: false,
    requiredReviewCount: 2,
  },
  {
    id: '4',
    status: 'DONE',
    title: '테스트 코드 작성',
    tags: ['테스트'],
    assignees: ['홍길동', '박민수', '김철수', '김민지'],
    description: '로그인 및 회원가입 테스트 코드 작성',
    dueDate: '2025-09-01',
    comments: 1,
    files: 1,
    urgent: false,
    requiredReviewCount: 0,
  },
];

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
      requiredReviewCount: 2,
    };
    mockTasks.push(newTask);
    return newTask;
  },

  // 할 일 삭제
  deleteTask: async (id: Id): Promise<{ success: boolean }> => {
    mockTasks = mockTasks.filter((task) => task.id !== id);
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
        mockTasks = arrayMove(mockTasks, activeIndex, overTaskIndex);
      } else {
        mockTasks[activeIndex].status = mockTasks[overTaskIndex].status;
        mockTasks = arrayMove(mockTasks, activeIndex, overTaskIndex);
      }
    } else {
      mockTasks[activeIndex].status = String(overId);
    }
    return { id: activeTaskId, status: mockTasks[activeIndex].status };
  },
};
