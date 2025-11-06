import { useQuery } from '@tanstack/react-query';
import { tagApi } from '@/features/tag/api/tagApi';
import { TAG_QUERY_KEYS } from '@/features/tag/constants/tagQueryKeys';

// 태그 목록 조회
export const useTagsQuery = (projectId: string) => {
  return useQuery({
    queryKey: TAG_QUERY_KEYS.project(projectId),
    queryFn: () => tagApi.fetchTags(projectId),
  });
};
