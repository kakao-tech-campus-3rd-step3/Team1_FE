import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentApi } from '@/features/comment/api/commentApi';
import type { CommentType } from '@/features/comment/types/commentTypes';
import { COMMENT_QUERY_KEYS } from '@/features/comment/api/commentQueryKey';
//댓글 수정
export const useUpdateCommentMutation = (projectId: string, taskId: string) => {
  const queryClient = useQueryClient();
  const queryKey = COMMENT_QUERY_KEYS.list(projectId, taskId);

  return useMutation<
    CommentType,
    Error,
    { commentId: string; updatedData: Partial<CommentType> },
    { previousComments?: CommentType[] }
  >({
    mutationFn: ({ commentId, updatedData }) => commentApi.updateComment(commentId, updatedData),

    onMutate: async ({ commentId, updatedData }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousComments = queryClient.getQueryData<CommentType[]>(queryKey);

      queryClient.setQueryData<CommentType[]>(queryKey, (old) => {
        if (!old) return old; 
        return old.map((c) => {
          if (c.commentId !== commentId) return c;
          const { fileInfo: nextFileInfo, ...rest } = updatedData;
          return {
            ...c,
            ...rest,
            ...(nextFileInfo ? { fileInfo: { ...(c.fileInfo ?? {}), ...nextFileInfo } } : {}),
          };
        });
      });
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
