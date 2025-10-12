import orange from '@/shared/assets/images/file_spinner_orange.png';
import green from '@/shared/assets/images/file_spinner_green.png';
import type { FileStatus } from '@/features/task-detail/types/taskDetailFileType';

export const FileStatusImages: Record<FileStatus, string> = {
  uploading: orange,
  success: green,
};
