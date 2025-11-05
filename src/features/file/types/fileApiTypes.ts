export interface FileDownloadUrlResponse {
  fileId: string;
  key: string;
  url: string;
  method: 'PUT' | 'GET';
  headers: Record<string, string>;
  expiresInSeconds: number;
}

export interface ProjectFile {
  fileId: string;
  filename: string;
  contentType: string;
  type: string;
  completedAt: string;
  sizeBytes: number;
  taskId: string;
  taskName: string;
}

export interface ProjectFilesResponse {
  projectId: string;
  files: ProjectFile[];
  count: number;
  nextCursor: string | null;
  hasNext: boolean;
}
