import type {
  Column,
  ProjectTaskCountByMemberMap,
  TaskCountByStatusMap,
  TaskDetail,
  TaskListItem,
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

export const mapTaskListItemToDetail = (task: TaskListItem): TaskDetail => {
  return {
    id: task.taskId,
    title: task.title,
    description: task.description,
    status: task.status,
    dueDate: task.dueDate,
    urgent: task.urgent,
    requiredReviewerCount: task.requiredReviewerCount,
    tags: task.tags,
    assignees: task.assignees,
    approvedCount: 0,
    comments: [],
    files: [],
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  };
};
