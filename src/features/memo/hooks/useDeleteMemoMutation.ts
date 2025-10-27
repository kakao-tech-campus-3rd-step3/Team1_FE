import { useMutation, useQueryClient } from '@tanstack/react-query';
import { memoApi } from '@/features/memo/api/memoApi';
import type { Memo } from '@/features/memo/types/memoTypes';

// 메모 삭제
export const useDeleteMemoMutation = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memoId: string) => memoApi.deleteMemo(projectId, memoId),

    onMutate: async (memoId: string) => {
      await queryClient.cancelQueries({ queryKey: ['memos', projectId] });
      const previousMemos = queryClient.getQueryData<Memo[]>(['memos', projectId]);

      queryClient.setQueryData(['memos', projectId], (old: Memo[] | undefined) =>
        old ? old.filter((m) => m.id !== memoId) : [],
      );

      return { previousMemos };
    },

    onError: (error, __, context) => {
      console.error('메모 삭제 실패:', error);
      if (context?.previousMemos) {
        queryClient.setQueryData(['memos', projectId], context.previousMemos);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['memos', projectId] });
    },
  });
};
