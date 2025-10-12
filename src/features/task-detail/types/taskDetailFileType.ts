export type TaskDetailFileType = {
  fileId: string;
  fileName: string;
  fileUrl: string;
  fileSize: string;
  timeLeft: string;
  status: FileStatus;
  onOpenPdf: (url?: string) => void;
  onDelete: (id?: string) => void;
  onDownload: (fileUrl?: string, fileName?: string) => void;
};
export type FileStatus = 'uploading' | 'success';
