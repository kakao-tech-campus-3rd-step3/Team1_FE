export type TaskDetailFileType = {
  fileId: string;
  fileName: string;
  fileUrl: string;
  fileSize: string;
  timeLeft: string;
  status: FileStatus;
};
export type FileStatus = 'uploading' | 'success';
