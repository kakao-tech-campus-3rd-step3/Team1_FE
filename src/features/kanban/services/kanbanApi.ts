import type { Task, Id } from '../types/kanbanTypes';
import { generateId } from '../utils/idUtils';
import { arrayMove } from '@dnd-kit/sortable';

// 임시 mock task 데이터
let mockTasks: Task[] = [
  {
    id: '1',
    columnId: 1,
    title: '웹사이트 레이아웃 구현',
    tags: ['긴급', '검토필요', 'FE'],
    assignees: ['박민수', '유다연'],
    description: '메인 페이지 레이아웃 구현하기',
    dueDate: '2025-09-09',
    comments: 2,
    files: 3,
  },
  {
    id: '2',
    columnId: 1,
    title: 'API 설계',
    tags: ['검토필요', 'BE'],
    assignees: ['김철수'],
    description: '백엔드 API 설계 작성',
    dueDate: '2025-09-15',
    comments: 0,
    files: 1,
  },
  {
    id: '3',
    columnId: 2,
    title: '로그인 기능 개발',
    tags: ['검토필요', 'FE', 'BE'],
    assignees: ['유다연', '박민수'],
    description: '사용자 로그인 및 인증 로직 구현',
    dueDate: '2025-09-20',
    comments: 5,
    files: 0,
  },
  {
    id: '4',
    columnId: 4,
    title: '테스트 코드 작성',
    tags: ['검토완료'],
    assignees: ['홍길동', '박민수', '김철수', '김민지'],
    description: '로그인 및 회원가입 테스트 코드 작성',
    dueDate: '2025-09-01',
    comments: 1,
    files: 1,
  },
];

// 추후 실제 API 호출 예정
export const kanbanApi = {
  fetchTasks: async (): Promise<Task[]> => {
    return mockTasks;
  },

  // 할 일 생성
  createTask: async (columnId: Id): Promise<Task> => {
    const newTask: Task = {
      id: generateId(),
      columnId,
      title: '새로운 할 일',
      tags: ['긴급'],
      assignees: ['유다연'],
      dueDate: '2025-09-09',
      comments: 0,
      files: 0,
      description: '할 일 설명',
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
  moveTask: async (activeTaskId: Id, overId: Id): Promise<{ id: Id; columnId: Id }> => {
    const activeIndex = mockTasks.findIndex((t) => t.id === activeTaskId);
    if (activeIndex === -1) {
      throw new Error('Task not found');
    }

    const overTaskIndex = mockTasks.findIndex((t) => t.id === overId);

    if (overTaskIndex !== -1) {
      if (mockTasks[activeIndex].columnId === mockTasks[overTaskIndex].columnId) {
        mockTasks = arrayMove(mockTasks, activeIndex, overTaskIndex);
      } else {
        mockTasks[activeIndex].columnId = mockTasks[overTaskIndex].columnId;
        mockTasks = arrayMove(mockTasks, activeIndex, overTaskIndex);
      }
    } else {
      mockTasks[activeIndex].columnId = overId;
    }
    return { id: activeTaskId, columnId: mockTasks[activeIndex].columnId };
  },
};
