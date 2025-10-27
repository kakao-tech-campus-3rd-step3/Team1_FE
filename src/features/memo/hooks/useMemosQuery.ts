import { useQuery } from '@tanstack/react-query';
import { memoApi } from '@/features/memo/api/memoApi';
import type { Memo } from '@/features/memo/types/memoTypes';

// 전체 메모 목록 조회
export const useMemosQuery = (projectId: string) => {
  return useQuery<Memo[]>({
    queryKey: ['memos', projectId],
    queryFn: () => memoApi.fetchMemos(projectId),
  });
};
