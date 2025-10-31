import type { Direction, SortBy } from '@/features/board/types/sortTypes';

export const TASK_QUERY_KEYS = {
  root: ['tasks'] as const,

  project: (projectId: string, status: string, sortBy: SortBy, direction: Direction) =>
    [...TASK_QUERY_KEYS.root, 'project', projectId, status, sortBy, direction] as const,

  meStatus: (status: string, sortBy: SortBy, direction: Direction) =>
    [...TASK_QUERY_KEYS.root, 'me', status, sortBy, direction] as const,

  member: (projectId: string, memberId: string, sortBy: SortBy, direction: Direction) =>
    [...TASK_QUERY_KEYS.root, 'project', projectId, 'member', memberId, sortBy, direction] as const,

  detail: (projectId: string, taskId: string) =>
    [...TASK_QUERY_KEYS.root, 'detail', projectId, taskId] as const,

  projectCountStatus: (projectId: string) =>
    [...TASK_QUERY_KEYS.root, 'project', projectId, 'countStatus'] as const,

  projectCountMember: (projectId: string) =>
    [...TASK_QUERY_KEYS.root, 'project', projectId, 'countMember'] as const,

  meCountStatus: () => [...TASK_QUERY_KEYS.root, 'me', 'countStatus'] as const,
};
