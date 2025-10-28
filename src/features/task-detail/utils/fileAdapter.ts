import { formatBytes } from '@/features/file/utils/fileUtils';
import type { TaskDetailFileType } from '@/features/task-detail/types/taskDetailFileType';
import { fetchFileDownloadUrl } from '@/features/file/api/fileDownloadApi';
import type { ServerFileType } from '@/features/task-detail/types/fileApiTypes';

export const mapToTaskDetailFileType = async (
  serverFile: ServerFileType,
): Promise<TaskDetailFileType> => {
  const downloadRes = await fetchFileDownloadUrl(serverFile.id);
  return {
    fileId: serverFile.id,
    fileName: serverFile.filename,
    fileUrl: downloadRes.url,
    fileSize: formatBytes(serverFile.sizeBytes),
    timeLeft: '방금',
    status: 'success',
  };
};
