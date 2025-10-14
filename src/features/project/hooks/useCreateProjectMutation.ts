import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectApi } from '@/features/project/api/projectApi';
import type { Project } from '@/features/project/types/projectTypes';
import { v4 as uuidv4 } from 'uuid';

// 프로젝트 생성
export const useCreateProjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: projectApi.createProject,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['projects'] });
      const previousProjects = queryClient.getQueryData(['projects']);

      const newTempProject: Project = {
        projectId: `temp-${uuidv4()}`,
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
