import { useQuery } from '@tanstack/react-query';
import {
  mapToTaskDetailFileType,
  type ServerFileType,
} from '@/features/task-detail/utils/fileAdapter';

export const useTaskFilesQuery = (serverFiles: ServerFileType[], taskId: string) => {
  return useQuery({
    queryKey: ['uploadedFile', taskId],
    queryFn: async () => Promise.all(serverFiles.map(mapToTaskDetailFileType)),
    placeholderData: [],
    enabled: !!serverFiles?.length,
  });
};
