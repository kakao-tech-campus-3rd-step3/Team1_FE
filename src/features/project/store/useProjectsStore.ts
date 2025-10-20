import { create } from 'zustand';

interface Project {
  id: string;
  name: string;
  defaultReviewerCount?: number;
}

interface ProjectsState {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  getProjectName: (id: string) => string | undefined;
}

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  projects: [],
  setProjects: (projects) => set({ projects }),
  updateProject: (id, data) =>
    set((state) => ({
      projects: state.projects.map((p) => (p.id === id ? { ...p, ...data } : p)),
    })),
  getProjectName: (id) => get().projects.find((p) => p.id === id)?.name,
}));
