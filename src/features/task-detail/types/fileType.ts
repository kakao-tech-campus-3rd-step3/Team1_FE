import orange from '@/shared/assets/images/file_spinner_orange.png';
import green from '@/shared/assets/images/file_spinner_green.png';
export type MockTaskFileType = {
  id: number;
  name: string;
  url: string;
  size: string;
  timeLeft: string;
  status: string;
  type: string;
  date: string;
};
export type FileType = {
  fileName: string;
  onOpenPdf: (fileUrl: string) => void;
  fileUrl: string;
  onDelete: () => void;
  onDownload: () => void;
  fileSize: string;
  timeLeft: string;
  status: FileStatus;
};
export type FileStatus = 'uploading' | 'success';

export const FileStatusImages: Record<FileStatus, string> = {
  uploading: orange,
  success: green,
};
