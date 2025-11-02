import type { CommentType, CommentUIType } from '@/features/comment/types/commentTypes';
import type { FileInfo, PinWithAuthor } from '@/features/task-detail/types/taskDetailType';
// 댓글에서 핀정보를 추출하는 유틸
export const extractPinsFromComments = (comments: CommentUIType[]): PinWithAuthor[] =>
  comments
    .filter((c) => c.fileInfo)
    .map((c) => ({
      ...(c.fileInfo as FileInfo),
      author: {
        id: c.authorInfo.id,
        name: c.authorInfo.name,
        avatar: c.authorInfo.avatar,
        backgroundColor: c.authorInfo.backgroundColor,
        isAnonymous: c.isAnonymous,
      },
    })) as PinWithAuthor[];
// 날짜 문자열을 '방금 전 / N분 전 / N시간 전 / N일 전' 형식으로 변환하는 유틸 함수
export const formatTimeAgo = (createdAt: string) => {
  const safeDate = new Date(createdAt.split('.')[0]);
  const diff = Date.now() - safeDate.getTime();
  if (diff < 60_000) return '방금 전';
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}분 전`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}시간 전`;
  return `${Math.floor(diff / 86_400_000)}일 전`;
};
//서버에서 받은 CommentType을 UI 전용 CommentUIType으로 변환하는 함수
export const mapToUI = (comment: CommentType): CommentUIType => ({
  ...comment,
  author: comment.isAnonymous ? '익명' : comment.authorInfo.name,
  fallback: comment.isAnonymous ? '익' : comment.authorInfo.name.charAt(0),
  timeAgo: formatTimeAgo(comment.createdAt),
  isPinned: comment.fileInfo ? true : false,
});
