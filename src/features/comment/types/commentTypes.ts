import type { FileInfo } from '@/features/task-detail/types/taskDetailType';

export interface AuthorInfo {
  id: string;
  name: string;
  avatar: string;
  backgroundColor: string;
}

export interface CommentType {
  commentId: string;
  content: string;
  persona: string;
  isAnonymous: boolean;
  fileInfo?: FileInfo;
  authorInfo: AuthorInfo;
  createdAt: string;
  updatedAt: string;
}
export interface CommentUIType extends CommentType {
  author: string;
  fallback: string;
  timeAgo: string;
  isPinned?: boolean;
}
