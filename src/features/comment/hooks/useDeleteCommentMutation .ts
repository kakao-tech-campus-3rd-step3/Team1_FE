import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentApi } from '@/features/comment/api/commentApi';

//댓글 삭제
export const useDeleteCommentMutation = (projectId: string, taskId: string) => {
  const queryClient = useQueryClient();

  return useMutation<{ success: boolean }, Error, string>({
    mutationFn: (commentId) => commentApi.deleteComment(commentId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', projectId, taskId] });
    },

    onError: (error) => {
      console.error('[deleteComment error]', error);
    },
  });
};
