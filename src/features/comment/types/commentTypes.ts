import type { PersonaType } from '@/features/comment/constants/personaConstants';
import type { FileInfo } from '@/features/task-detail/types/taskDetailType';

/* TODO: 댓글 목록 조회 응답 필드 확인 필요 */
export interface AuthorInfo {
  memberId: string;
  name: string;
  avatar: string;
  backgroundColor: string;
}

export interface CommentType {
  commentId: string;
  content: string;
  persona: PersonaType;
  isAnonymous: boolean;
  fileInfo?: FileInfo | null;
  authorInfo: AuthorInfo;
  createdAt: string;
  updatedAt: string;
}
export interface CommentUIType extends CommentType {
  author: string;
  fallback: string;
  timeAgo: string;
  isPinned?: boolean;
  commentId: string;
  persona: PersonaType;
  isAnonymous: boolean;
}
