import { useQuery } from '@tanstack/react-query';
import { memoApi } from '@/features/memo/api/memoApi';
import type { Memo } from '@/features/memo/types/memoTypes';

// 메모 상세 조회
export const useMemoQuery = (projectId: string, memoId: string) => {
  return useQuery<Memo>({
    queryKey: ['memo', projectId, memoId],
    queryFn: () => memoApi.fetchMemo(projectId, memoId),
    enabled: !!memoId,
  });
};
