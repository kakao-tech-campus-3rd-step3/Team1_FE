export const formatTimeAgo = (createdAt: string) => {
  const safeDate = new Date(createdAt.split('.')[0]);
  const diff = Date.now() - safeDate.getTime();
  if (diff < 60_000) return '방금 전';
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}분 전`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}시간 전`;
  return `${Math.floor(diff / 86_400_000)}일 전`;
};
