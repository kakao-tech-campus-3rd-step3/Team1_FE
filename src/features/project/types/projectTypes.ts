export type Project = {
  id: string;
  projectId?: string; // API 응답용
  name: string;
  defaultReviewerCount: number;
};
