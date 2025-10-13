import { useQuery } from '@tanstack/react-query';
import { projectApi } from '@/features/project/api/projectApi';
import type { Project } from '@/features/project/types/projectTypes';

// 프로젝트 정보 조회
export const useProjectQuery = (projectId?: string) => {
  return useQuery<Project>({
    queryKey: ['project', projectId],
    queryFn: async () => {
      if (!projectId) throw new Error('프로젝트 ID가 없습니다.');
      return projectApi.fetchProject(projectId);
    },
    enabled: !!projectId,
  });
};
