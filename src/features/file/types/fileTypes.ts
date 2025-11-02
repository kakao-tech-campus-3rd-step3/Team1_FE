import type { FileStatus } from '@/features/task-detail/types/taskDetailType';

export interface FileItemType {
  fileId: string;
  fileName: string;
  fileUrl: string;
  fileSize: string;
  timeLeft: string;
  status: FileStatus;
}
