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
  requiredReviewCount: number;
  files: number;
  comments: number;
};
