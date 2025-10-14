import type { Project } from '@/features/project/types/projectTypes';

export const mockProjects: Project[] = [
  {
    projectId: 123,
    name: '팀플 A',
    defaultReviewerCount: 2,
    role: 'admin',
  },
  {
    projectId: 124,
    name: '팀플 B',
    defaultReviewerCount: 2,
    role: 'member',
  },
  {
    projectId: 125,
    name: '팀플 C',
    defaultReviewerCount: 2,
    role: 'member',
  },
];
