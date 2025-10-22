import { useQuery } from '@tanstack/react-query';
import { mapToTaskDetailFileType } from '@/features/task-detail/utils/fileAdapter';
import type { ServerFileType } from '../types/fileApiTypes';

export const useTaskFilesQuery = (serverFiles: ServerFileType[], taskId: string) => {
  return useQuery({
    queryKey: ['uploadedFile', taskId],
    queryFn: async () => Promise.all(serverFiles.map(mapToTaskDetailFileType)),
    placeholderData: [],
    enabled: !!serverFiles?.length,
  });
};
