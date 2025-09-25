import type { Id } from '@/shared/types/commonTypes';

export type Column = {
  status: string;
  title: string;
};

export type Task = {
  id: Id;
  title: string;
  description: string;
  status: string;
  tags: string[];
  assignees: string[];
  dueDate: string;
  urgent: boolean;
  files: number;
  comments: number;

  review: {
    requiredReviewCount: number;
    approvedCount: number;
    pendingCount: number;
    isCompleted: boolean;
  };
};

export const mockTask = {
  id: '1',
  title: '할 일 제목 예시',
  description: 'top tab 테스트를 위한 임시 할 일입니다.',
  status: 'TODO',
  tags: ['FE'],
  assignees: ['홍길동'],
  dueDate: '2025-09-24',
  urgent: false,
  files: 0,
  comments: 0,
  review: {
    requiredReviewCount: 4,
    approvedCount: 2,
    pendingCount: 0,
    isCompleted: false,
  },
};
