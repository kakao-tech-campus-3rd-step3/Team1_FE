import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CommentType } from '@/features/comment/types/commentTypes';
import { commentApi } from '@/features/comment/api/commentApi';
//댓글 수정
export const useUpdateCommentMutation = (projectId: string, taskId: string) => {
  const queryClient = useQueryClient();

  return useMutation<CommentType, Error, { commentId: string; updatedData: Partial<CommentType> }>({
    mutationFn: ({ commentId, updatedData }) => commentApi.updateComment(commentId, updatedData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', projectId, taskId] });
    },

    onError: (error) => {
      console.error('[updateComment error]', error);
    },
  });
};
