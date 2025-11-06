import { fileApi } from '@/features/file/api/fileApi';
import type { FileSummaryResponse } from '@/features/file/types/fileApiTypes';
import { useQuery } from '@tanstack/react-query';

export const useProjectFileSummaryQuery = (projectId: string) => {
  return useQuery<FileSummaryResponse>({
    queryKey: ['projectFileSummary', projectId] as const,
    queryFn: () => fileApi.fetchFileSummary(projectId),
    enabled: !!projectId,
  });
};
