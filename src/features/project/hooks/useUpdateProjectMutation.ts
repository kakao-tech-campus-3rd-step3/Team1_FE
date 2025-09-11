import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectApi } from '@/features/project/api/projectApi';
import type { Project } from '@/features/project/types/projectTypes';
import type { Id } from '@/shared/types/commonTypes';

// 프로젝트 수정
export const useUpdateProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, updatedData }: { projectId: Id; updatedData: Partial<Project> }) =>
      projectApi.updateProject(projectId, updatedData),

    onSuccess: (updatedProject) => {
      queryClient.setQueryData(['project', updatedProject.projectId], updatedProject);

      queryClient.setQueryData<Project[]>(['projects'], (old) => {
        if (!old) return [];
        return old.map((p) => (p.projectId === updatedProject.projectId ? updatedProject : p));
      });
    },
  });
};
