import type { Member } from '@/features/user/types/userTypes';
import type { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';

export type Column = {
  status: string;
  title: string;
};

export type Assignee = {
  id: string;
  name: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Comment = {
  id: string;
  content: string;
  authorName: string;
};

export type File = {
  id: string;
  filename: string;
  contentType: string;
  sizeBytes: number;
  type: string;
};

// Task 공통 속성
type BaseTask = {
  taskId: string;
  projectId: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  urgent: boolean;
  requiredReviewerCount: number;
  fileCount: number;
  commentCount: number;
  tags: string[];
  assignees: Assignee[];
  createdAt: string;
  updatedAt: string;
};

// Task 목록에서 쓰이는 Task 타입
export type TaskListItem = BaseTask;

// Task 목록 조회 API 응답 타입 (커서 기반 페이징 포함)
export type TaskListResponse = {
  tasks: TaskListItem[];
  count: number;
  nextCursor?: string;
  hasNext: boolean;
};

// Task 상세 정보 (TaskItem + 추가 정보, Response와 형태 동일)
export type TaskDetail = BaseTask & {
  approvedCount: number;
  comments: Comment[];
  files: File[];
};

// useInfiniteQuery로 반환된 객체를 한 번에 명시하는 타입
export type TaskQuery = UseInfiniteQueryResult<InfiniteData<TaskListResponse, unknown>, Error>;

export type MemberTaskListResponse = {
  member: Member;
  tasks: TaskListItem[];
  count: number;
  nextCursor?: string;
  hasNext: boolean;
};

export interface UseInfiniteTasksOptions {
  enabled?: boolean;
}
