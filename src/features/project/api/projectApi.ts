import type { Id } from '@/shared/types/commonTypes';
import type { Project } from '@/features/project/types/projectTypes';
import { v4 as uuidv4 } from 'uuid';
import { mockProjects } from '@/shared/data/mockProjects';

// 추후 실제 API 호출 예정
export const projectApi = {
  // 프로젝트 목록 조회
  fetchProjects: async (): Promise<Project[]> => {
    return mockProjects;
  },

  // 프로젝트 정보 조회
  fetchProject: async (projectId: Id): Promise<Project | undefined> => {
    const project = mockProjects.find((project) => project.projectId === projectId);
    return project;
  },

  // 프로젝트 생성
  createProject: async (projectName: string): Promise<Project> => {
    const newProject: Project = {
      projectId: uuidv4(),
      name: projectName,
      defaultReviewerCount: 2,
      role: 'admin',
    };
    mockProjects.push(newProject);
    return newProject;
  },

  // 프로젝트 수정
  updateProject: async (projectId: Id, updatedData: Partial<Project>): Promise<Project> => {
    const index = mockProjects.findIndex((p) => p.projectId === projectId);
    if (index === -1) throw new Error('프로젝트를 찾을 수 없습니다.');

    mockProjects[index] = { ...mockProjects[index], ...updatedData };
    return mockProjects[index];
  },

  // 프로젝트 삭제
  deleteProject: async (projectId: Id): Promise<{ success: boolean }> => {
    const index = mockProjects.findIndex((project) => project.projectId === projectId);
    if (index !== -1) {
      mockProjects.splice(index, 1);
    }
    return { success: true };
  },
};
