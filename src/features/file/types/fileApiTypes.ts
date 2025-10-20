export interface FileDownloadUrlResponse {
  fileId: string;
  key: string;
  url: string;
  method: 'PUT' | 'GET';
  headers: Record<string, string>;
  expiresInSeconds: number;
}
