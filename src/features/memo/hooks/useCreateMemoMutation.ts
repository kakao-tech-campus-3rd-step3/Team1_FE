import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { memoApi } from '@/features/memo/api/memoApi';
import type { Memo } from '@/features/memo/types/memoTypes';
import { ROUTES } from '@/app/routes/Router';

// 메모 생성
export const useCreateMemoMutation = (projectId: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (memo: { title: string; content: string }) => memoApi.createMemo(projectId, memo),

    onMutate: async (newMemo) => {
      await queryClient.cancelQueries({ queryKey: ['memos', projectId] });
      const previousMemos = queryClient.getQueryData<Memo[]>(['memos', projectId]);

      const tempId = `temp-${uuidv4()}`;
      const newTempMemo: Memo = {
        id: tempId,
        title: newMemo.title,
        content: newMemo.content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      queryClient.setQueryData(['memos', projectId], (old: Memo[] | undefined) => [
        ...(old || []),
        newTempMemo,
      ]);

      return { previousMemos, tempId };
    },

    onSuccess: (createdMemo, _variables, context) => {
      queryClient.setQueryData<Memo[]>(['memos', projectId], (old) =>
        old ? old.map((m) => (m.id === context?.tempId ? createdMemo : m)) : [createdMemo],
      );
      navigate(ROUTES.PROJECT_MEMO_DETAIL(projectId, createdMemo.id));
    },

    onError: (error, __, context) => {
      console.error('메모 생성 실패:', error);
      if (context?.previousMemos) {
        queryClient.setQueryData(['memos', projectId], context.previousMemos);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['memos', projectId] });
    },
  });
};
