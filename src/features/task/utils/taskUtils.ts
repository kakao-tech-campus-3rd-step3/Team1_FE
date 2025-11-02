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

export const detailToListItem = (task: TaskDetail, projectId: string): TaskListItem => ({
  taskId: task.id,
  projectId,
  title: task.title,
  description: task.description,
  status: task.status,
  dueDate: task.dueDate,
  urgent: task.urgent,
  requiredReviewerCount: task.requiredReviewerCount,
  // 📍TODO: 할 일 상세 조회에서 comments, files 필드 수정 완료되면 개선 필요함
  fileCount: task.files.length,
  commentCount: task.comments.length,
  tags: task.tags,
  assignees: task.assignees.map((m) => ({
    id: m.id,
    name: m.name,
    avatar: m.avatar,
  })),
  createdAt: task.createdAt,
  updatedAt: task.updatedAt,
});
