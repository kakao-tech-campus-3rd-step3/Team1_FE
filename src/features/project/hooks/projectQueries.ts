import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectApi } from '../services/projectApi';
import type { Project } from '../types/projectTypes';
import type { Id } from '@/shared/types/commonTypes';
import { generateId } from '@/shared/utils/idUtils';

// 프로젝트 목록 조회
export const useProjectsQuery = () => {
  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: projectApi.fetchProjects,
  });
};

// 프로젝트 정보 조회
export const useProjectQuery = (projectId: Id) => {
  return useQuery<Project | undefined>({
    queryKey: ['project', projectId],
    queryFn: () => projectApi.fetchProject(projectId),
    enabled: !!projectId,
  });
};

// 프로젝트 생성
export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: projectApi.createProject,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['projects'] });
      const previousProjects = queryClient.getQueryData(['projects']);

      const newTempProject: Project = {
        projectId: `temp-${generateId()}`,
        name: `새로운 프로젝트`,
        defaultReviewerCount: 2,
        role: 'admin',
      };

      queryClient.setQueryData(['projects'], (old: Project[]) => {
        return [...(old || []), newTempProject];
      });

      return { previousProjects };
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

// 프로젝트 삭제
export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: projectApi.deleteProject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  });
};

// 프로젝트 수정
export const useEditProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, updatedData }: { projectId: Id; updatedData: Partial<Project> }) =>
      projectApi.editProject(projectId, updatedData),

    onSuccess: (updatedProject) => {
      queryClient.setQueryData(['project', updatedProject.projectId], updatedProject);

      queryClient.setQueryData<Project[]>(['projects'], (old) => {
        if (!old) return [];
        return old.map((p) => (p.projectId === updatedProject.projectId ? updatedProject : p));
      });
    },
  });
};
