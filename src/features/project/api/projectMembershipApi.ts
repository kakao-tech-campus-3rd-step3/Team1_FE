import { api } from '@/shared/api/axiosInstance';
import type { Project } from '@/features/project/types/projectTypes';

export interface JoinCodeResponse {
  joinCode: string;
  expiresAt: string;
}

export const projectMembershipApi = {
  joinProject: async (joinCode: string): Promise<Project> => {
    const { data } = await api.post<Project>(`/projects/join`, { joinCode });
    return data;
  },

  fetchJoinCode: async (projectId: string): Promise<JoinCodeResponse> => {
    const { data } = await api.get<JoinCodeResponse>(`/projects/${projectId}/join-code`);
    return data;
  },

  createJoinCode: async (projectId: string): Promise<JoinCodeResponse> => {
    const { data } = await api.post<JoinCodeResponse>(`/projects/${projectId}/join-code`);
    return data;
  },

  leaveProject: async (projectId: string): Promise<void> => {
    await api.delete(`/projects/${projectId}/leave`);
  },
};
