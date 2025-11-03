export interface FileDownloadUrlResponse {
  fileId: string;
  key: string;
  url: string;
  method: 'PUT' | 'GET';
  headers: Record<string, string>;
  expiresInSeconds: number;
}

export interface ProjectFile {
  id: string;
  filename: string;
  contentType: string;
  type: string;
  completedAt: string;
  sizeBytes: number;
  // 🔜 서버에서 추후 내려올 예정인 필드
  taskId?: string;
  taskName?: string;
}

export interface ProjectFilesResponse {
  projectId: string;
  files: ProjectFile[];
  count: number;
  nextCursor: string | null;
  hasNext: boolean;
}
