import type { ProjectFile } from '@/features/file/types/fileApiTypes';
import FileItemCard from './FileItemCard';

interface FileListProps {
  files: ProjectFile[];
}

const FileList = ({ files }: FileListProps) => {
  const validFiles = files.filter((file) => file.id && file.filename);

  return (
    <div className="flex flex-col gap-4">
      {validFiles.map((file) => (
        <FileItemCard
          key={file.id}
          file={{
            id: file.id,
            filename: file.filename,
            contentType: file.contentType,
            sizeBytes: file.sizeBytes,
            completedAt: file.completedAt,
            taskId: file.taskId,
            taskName: file.taskName,
          }}
        />
      ))}
    </div>
  );
};

export default FileList;
