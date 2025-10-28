import { useQuery } from '@tanstack/react-query';
import { commentApi } from '@/features/comment/api/commentApi';
import type { CommentUIType } from '@/features/comment/types/commentTypes';
import { mapToUI } from '@/features/comment/utils/mapToUI';
import { COMMENT_QUERY_KEYS } from '@/features/comment/api/commentQueryKey';

//할 일의 댓글 조회
export const useCommentQuery = (projectId: string, taskId: string) => {
  return useQuery<CommentUIType[]>({
    queryKey: COMMENT_QUERY_KEYS.list(projectId, taskId),
    queryFn: async () => {
      const res = await commentApi.fetchComments(projectId, taskId);
      return res.map(mapToUI);
    },
  });
};
