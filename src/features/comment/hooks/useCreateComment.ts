import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentApi } from '../api/commentApi';
import { v4 as uuidv4 } from 'uuid';
import type { CommentType, CreateCommentRequest } from '@/features/comment/types/commentTypes';
// 댓글 생성
export const useCreateComment = (projectId: string, taskId: string) => {
  const queryClient = useQueryClient();

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
        authorInfo: { id: 'ccc87f56-7c1c-42c7-8b82-54d5b2306e0c', name: '김혜민', avatar: '111' },
        createdAt: now,
        updatedAt: now,
      };

      queryClient.setQueryData<CommentType[]>(queryKey, [tempComment, ...previous]);
      return { previous, queryKey: [...queryKey], tempId };
    },

    mutationFn: async ({ commentData }) => {
      console.log('🚀 commentData payload:', JSON.stringify(commentData, null, 2));

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
    },

    onError: (_err, _vars, context) => {
      if (!context) return;
      queryClient.setQueryData<CommentType[]>(context.queryKey, context.previous ?? []);
    },

    onSettled: (_data, _err, _vars, context) => {
      if (!context) return;
      queryClient.invalidateQueries({ queryKey: context.queryKey });
    },
  });
};
