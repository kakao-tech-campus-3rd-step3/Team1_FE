import type { CommentType, CommentUIType } from '@/features/comment/types/commentTypes';
import { formatTimeAgo } from '@/features/comment/utils/formatTimeAgo';

export const mapToUI = (comment: CommentType): CommentUIType => ({
  ...comment,
  author: comment.isAnonymous ? '익명' : comment.authorInfo.name,
  fallback: comment.isAnonymous ? '익' : comment.authorInfo.name.charAt(0),
  timeAgo: formatTimeAgo(comment.createdAt),
  isPinned: comment.fileInfo ? true : false,
});
