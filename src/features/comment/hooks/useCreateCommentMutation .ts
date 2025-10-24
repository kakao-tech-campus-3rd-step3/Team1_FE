import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentApi } from '@/features/comment/api/commentApi';
import { v4 as uuidv4 } from 'uuid';
import type { CommentType, CreateCommentRequest } from '@/features/comment/types/commentTypes';
import { useAuthStore } from '@/features/auth/store/authStore';
// 댓글 생성
export const useCreateCommentMutation  = (projectId: string, taskId: string) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  return useMutation<
    CommentType,
    Error,
    { commentData: CreateCommentRequest },
    { previous?: CommentType[]; queryKey: string[]; tempId: string }
  >({
    onMutate: async ({ commentData }) => {
      const queryKey = ['comments', projectId, taskId] as const;
      await queryClient.cancelQueries({ queryKey });

      const previous = queryClient.getQueryData<CommentType[]>(queryKey) ?? [];
      const tempId = `temp-${uuidv4()}`;
      const now = new Date().toISOString();
      const tempComment: CommentType = {
        commentId: tempId,
        ...commentData,
        authorInfo: {
          id: user?.id ?? 'unknown',
          name: commentData.isAnonymous ? '익명' : (user?.name ?? '사용자'),
          avatar: commentData.isAnonymous ? 'default' : (user?.avatar ?? 'default'),
        },
        createdAt: now,
        updatedAt: now,
      };

      queryClient.setQueryData<CommentType[]>(queryKey, [tempComment, ...previous]);
      return { previous, queryKey: [...queryKey], tempId };
    },

    mutationFn: async ({ commentData }) => {
      const res = await commentApi.createComment(projectId, taskId, commentData);
      const formatted: CommentType = {
        commentId: res.commentId,
        content: res.content,
        persona: res.persona,
        isAnonymous: res.isAnonymous,
        fileInfo: res.fileInfo,
        authorInfo: {
          id: res.authorInfo.id,
          name: res.authorInfo.name,
          avatar: res.authorInfo.avatar,
        },
        createdAt: res.createdAt,
        updatedAt: res.updatedAt,
      };
      return formatted;
    },

    onSuccess: (newComment, _vars, context) => {
      if (!context) return;
      queryClient.setQueryData<CommentType[]>(context.queryKey, (prev = []) =>
        prev.map((c) => (c.commentId === context.tempId ? newComment : c)),
      );
      queryClient.invalidateQueries({ queryKey: context.queryKey });
    },

    onError: (_err, _vars, context) => {
      if (!context) return;
      queryClient.setQueryData<CommentType[]>(context.queryKey, context.previous ?? []);
    },
  });
};
