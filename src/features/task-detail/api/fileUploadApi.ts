import api from '@/shared/api/axiosInstance';
import type {
  CompleteFileUploadRequest,
  CompleteFileUploadResponse,
  FileDownloadUrlResponse,
  FileUploadUrlRequest,
  FileUploadUrlResponse,
} from '@/features/task-detail/types/fileApiTypes';

export const fileUploadApi = {
  fetchFileUploadUrl: async ({
    filename,
    contentType,
    sizeBytes,
  }: FileUploadUrlRequest): Promise<FileUploadUrlResponse> => {
    const res = await api.post('/files/upload-url', { filename, contentType, sizeBytes });
    return res.data;
  },

  completeFileUpload: async ({
    fileId,
    taskId,
    filename,
    contentType,
    sizeBytes,
  }: CompleteFileUploadRequest): Promise<CompleteFileUploadResponse> => {
    const res = await api.patch(`/files/${fileId}/complete`, {
      taskId,
      filename,
      contentType,
      sizeBytes,
    });
    return res.data;
  },
  fetchFileDownloadUrl: async (fileId: string): Promise<FileDownloadUrlResponse> => {
    const { data } = await api.get(`/files/${fileId}/download-url`);
    return data;
  },
};
