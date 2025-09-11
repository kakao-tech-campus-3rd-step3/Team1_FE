import { useQuery } from '@tanstack/react-query';
import { projectApi } from '@/features/project/api/projectApi';
import type { Project } from '@/features/project/types/projectTypes';
import type { Id } from '@/shared/types/commonTypes';

// 프로젝트 정보 조회
export const useProjectQuery = (projectId: Id) => {
  return useQuery<Project | undefined>({
    queryKey: ['project', projectId],
    queryFn: () => projectApi.fetchProject(projectId),
    enabled: !!projectId,
  });
};
