import type { Id } from '@/shared/types/commonTypes';

export type Project = {
  projectId: Id;
  name: string;
  defaultReviewerCount: number;
  role: string;
};
