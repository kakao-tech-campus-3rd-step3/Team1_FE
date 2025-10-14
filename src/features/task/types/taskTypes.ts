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
