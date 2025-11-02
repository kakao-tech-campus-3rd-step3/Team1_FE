import type { TagList } from '@/features/tag/types/tagTypes';
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

// Task 목록 조회 아이템
export type TaskListItem = {
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
  tags: TagList;
  assignees: Assignee[];
  createdAt: string;
  updatedAt: string;
};

// Task 목록 조회 API 응답 타입 (커서 기반 페이징 포함)
export type TaskListResponse = {
  tasks: TaskListItem[];
  count: number;
  nextCursor?: string;
  hasNext: boolean;
};

// Task 상세 정보 (TaskItem + 추가 정보, Response와 형태 동일)
export type TaskDetail = {
  id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  urgent: boolean;
  approvedCount: number;
  requiredReviewerCount: number;
  tags: TagList;
  assignees: Member[];
  comments: Comment[];
  files: File[];
  createdAt: string;
  updatedAt: string;
};

// useInfiniteQuery로 반환된 객체를 한 번에 명시하는 타입
export type TaskQuery = UseInfiniteQueryResult<InfiniteData<TaskListResponse, unknown>, Error>;

// 프로젝트 할 일 목록 조회 (팀원 기준) API 응답 타입
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

// 프로젝트 상태별 할 일 개수 API 응답 타입
export type ProjectTaskCountByStatusResponse = {
  projectId: string;
  todo: number;
  progress: number;
  review: number;
  done: number;
};

// 나의 할 일 개수 API 응답 타입
export type MyTaskCountByStatusResponse = {
  memberId: string;
  todo: number;
  progress: number;
  review: number;
  done: number;
};

// UI나 내부 로직에서 사용하기 위한 상태별 개수 맵 타입
export type TaskCountByStatusMap = Record<'todo' | 'progress' | 'review' | 'done', number>;

// 프로젝트 팀원별 할 일 개수 API 응답 타입
export type ProjectTaskCountByMemberResponse = {
  projectId: string;
  memberId: string;
  todo: number;
  progress: number;
  review: number;
};

// UI나 내부 로직에서 사용하기 위한 팀원별 개수 맵 타입
export type ProjectTaskCountByMemberMap = Record<'todo' | 'progress' | 'review', number>;
