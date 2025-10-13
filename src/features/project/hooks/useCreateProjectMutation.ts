import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectApi } from '@/features/project/api/projectApi';
import type { Project } from '@/features/project/types/projectTypes';
import { v4 as uuidv4 } from 'uuid';

// 프로젝트 생성
export const useCreateProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectName: string) => projectApi.createProject(projectName),

    onMutate: async (projectName: string) => {
      await queryClient.cancelQueries({ queryKey: ['projects'] });
      const previousProjects = queryClient.getQueryData<Project[]>(['projects']);

      // optimistic UI
      const newTempProject: Project = {
        id: `temp-${uuidv4()}`,
        name: projectName,
        defaultReviewerCount: 2,
      };

      queryClient.setQueryData(['projects'], (old: Project[] | undefined) => [
        ...(old || []),
        newTempProject,
      ]);

      return { previousProjects };
    },

    onError: (error, __, context) => {
      console.error('프로젝트 생성 실패:', error);
      if (context?.previousProjects) {
        queryClient.setQueryData(['projects'], context.previousProjects);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};
