import { useMutation, useQueryClient } from '@tanstack/react-query';
import { memoApi } from '@/features/memo/api/memoApi';
import type { Memo } from '@/features/memo/types/memoTypes';
import { ROUTES } from '@/app/routes/Router';
import { useNavigate } from 'react-router-dom';

// 메모 수정
export const useUpdateMemoMutation = (projectId: string, memoId: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (updatedData: Partial<Memo>) => memoApi.updateMemo(projectId, memoId, updatedData),

    onMutate: async (updatedData) => {
      await queryClient.cancelQueries({ queryKey: ['memos', projectId] });
      const previousMemos = queryClient.getQueryData<Memo[]>(['memos', projectId]);

      queryClient.setQueryData<Memo[]>(['memos', projectId], (old) =>
        old ? old.map((m) => (m.id === memoId ? { ...m, ...updatedData } : m)) : [],
      );

      return { previousMemos };
    },

    onError: (error, _, context) => {
      console.error('메모 수정 실패:', error);
      if (context?.previousMemos) {
        queryClient.setQueryData(['memos', projectId], context.previousMemos);
      }
    },

    onSuccess: (updatedMemo) => {
      queryClient.setQueryData<Memo[]>(['memos', projectId], (old) =>
        old ? old.map((m) => (m.id === memoId ? updatedMemo : m)) : [updatedMemo],
      );
      navigate(ROUTES.PROJECT_MEMO_DETAIL(projectId, updatedMemo.id));
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['memos', projectId] });
      queryClient.invalidateQueries({ queryKey: ['memo', projectId, memoId] });
    },
  });
};
