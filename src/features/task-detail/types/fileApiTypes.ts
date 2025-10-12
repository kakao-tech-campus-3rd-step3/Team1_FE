export interface FileUploadUrlRequest {
  filename: string;
  contentType: string;
  sizeBytes: number;
}
export interface FileUploadUrlResponse {
  fileId: string;
  key: string;
  url: string;
  method: 'PUT';
  headers: Record<string, string>;
  expiresInSeconds: number;
}
export interface CompleteFileUploadRequest {
  fileId: string;
  taskId: string;
  filename: string;
  contentType: string;
  sizeBytes: number;
}
export interface CompleteFileUploadResponse {
  fileId: string;
  taskId: string;
  status: string;
  completedAt: string;
}
