import { create } from 'zustand';

interface ProjectState {
  projectData: {
    id: string;
    name: string;
    defaultReviewerCount: number;
  };
  setProjectData: (data: { id?: string; name?: string; defaultReviewerCount?: number }) => void;
  updateProjectData: (data: { name?: string; defaultReviewerCount?: number }) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projectData: {
    id: '',
    name: '',
    defaultReviewerCount: 0,
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
