import type {
  Column,
  ProjectTaskCountByMemberMap,
  TaskCountByStatusMap,
} from '@/features/task/types/taskTypes';

export const getTaskCountByStatus = (
  columnStatus: Column['status'],
  taskCountList?: TaskCountByStatusMap,
) => {
  if (!taskCountList) return 0;

  switch (columnStatus) {
    case 'TODO':
      return taskCountList.todo;
    case 'PROGRESS':
      return taskCountList.progress;
    case 'REVIEW':
      return taskCountList.review;
    case 'DONE':
      return taskCountList.done;
    default:
      return 0;
  }
};

export const getTaskCountByMember = (
  columnStatus: Column['status'],
  taskCountList?: ProjectTaskCountByMemberMap,
): number => {
  if (!taskCountList) return 0;

  switch (columnStatus) {
    case 'TODO':
      return taskCountList.todo;
    case 'PROGRESS':
      return taskCountList.progress;
    case 'REVIEW':
      return taskCountList.review;
    default:
      return 0;
  }
};
