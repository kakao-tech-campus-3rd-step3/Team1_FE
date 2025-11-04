import { create } from 'zustand';
import type { Project } from '@/features/project/types/projectTypes';

interface ProjectState {
  projectData: Project;
  setProjectData: (data: { id?: string; name?: string; defaultReviewerCount?: number }) => void;
  updateProjectData: (data: { name?: string; defaultReviewerCount?: number }) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projectData: {
    id: '',
    name: '',
    defaultReviewerCount: 0,
    role: 'MEMBER',
  },
  setProjectData: (data) =>
    set((state) => ({
      projectData: { ...state.projectData, ...data },
    })),
  updateProjectData: (data) =>
    set((state) => ({
      projectData: { ...state.projectData, ...data },
    })),
}));
