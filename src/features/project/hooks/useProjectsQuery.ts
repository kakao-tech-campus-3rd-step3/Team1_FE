import { useQuery } from '@tanstack/react-query';
import { projectApi } from '@/features/project/api/projectApi';
import type { Project } from '@/features/project/types/projectTypes';
import { useAuthStore } from '@/features/auth/store/authStore';

// 내 참여 프로젝트 목록 조회
export const useProjectsQuery = () => {
  const { isInitializing } = useAuthStore();
  return useQuery<Project[]>({
    queryKey: ['projects', 'me'],
    queryFn: projectApi.fetchProjects,
    enabled: !isInitializing,
  });
};
