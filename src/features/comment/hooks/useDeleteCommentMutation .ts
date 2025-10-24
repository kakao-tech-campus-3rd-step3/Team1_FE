import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentApi } from '@/features/comment/api/commentApi';
import type { CommentType } from '@/features/comment/types/commentTypes';
import { COMMENT_QUERY_KEYS } from '@/features/comment/api/commentQueryKey';

// 댓글 삭제
export const useDeleteCommentMutation = (projectId: string, taskId: string) => {
  const queryClient = useQueryClient();
  const queryKey = COMMENT_QUERY_KEYS.list(projectId, taskId); 

  return useMutation<{ success: boolean }, Error, string, { previousComments?: CommentType[] }>({
    mutationFn: (commentId) => commentApi.deleteComment(commentId),

    onMutate: async (commentId) => {
      await queryClient.cancelQueries({ queryKey });

      const previousComments = queryClient.getQueryData<CommentType[]>(queryKey);

      queryClient.setQueryData<CommentType[]>(queryKey, (old) =>
        old ? old.filter((c) => c.commentId !== commentId) : [],
      );

      return { previousComments };
    },

    onError: (_error, _, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(queryKey, context.previousComments);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
