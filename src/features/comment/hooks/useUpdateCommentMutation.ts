import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentApi } from '@/features/comment/api/commentApi';
import type { CommentType } from '@/features/comment/types/commentTypes';
import { COMMENT_QUERY_KEYS } from '@/features/comment/api/commentQueryKey';
import toast from 'react-hot-toast';
import { AxiosError, isAxiosError } from 'axios';

export const useUpdateCommentMutation = (projectId: string, taskId: string) => {
  const queryClient = useQueryClient();
  const queryKey = COMMENT_QUERY_KEYS.list(projectId, taskId);

  return useMutation<
    CommentType,
    AxiosError,
    { commentId: string; updatedData: Partial<CommentType> },
    { previousComments?: CommentType[] }
  >({
    mutationFn: ({ commentId, updatedData }) => commentApi.updateComment(commentId, updatedData),

    onMutate: async ({ commentId, updatedData }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousComments = queryClient.getQueryData<CommentType[]>(queryKey);

      queryClient.setQueryData<CommentType[]>(queryKey, (old) => {
        if (!old) return old;
        return old.map((comment) => {
          if (comment.commentId !== commentId) return comment;

          const nextFileInfo = updatedData.fileInfo;
          return {
            ...comment,
            ...updatedData,
            ...(nextFileInfo ? { fileInfo: { ...(comment.fileInfo ?? {}), ...nextFileInfo } } : {}),
          };
        });
      });

      return { previousComments };
    },

    onSuccess: () => {
      toast.success('댓글이 수정되었습니다.');
    },

    onError: (error, _, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(queryKey, context.previousComments);
      }

      if (isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 403) {
          toast.error('담당자만 댓글을 수정할 수 있습니다.');
          return;
        }
      }
      toast.error('댓글 수정에 실패했습니다.');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
