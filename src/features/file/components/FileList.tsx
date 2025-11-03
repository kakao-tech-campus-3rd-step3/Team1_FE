import type { ProjectFile } from '@/features/file/types/fileApiTypes';
import FileItemCard from './FileItemCard';

interface FileListProps {
  files: ProjectFile[];
}

const FileList = ({ files }: FileListProps) => {
  console.log(files);
  return (
    <div className="flex flex-col gap-4">
      {files.map((file) => (
        <FileItemCard
          key={file.id}
          file={{
            id: file.id,
            filename: file.filename ?? '이름 없는 파일',
            contentType: file.type ?? 'unknown',
            sizeBytes: file.sizeBytes ?? 0,
            completedAt: file.completedAt ?? '',
            taskName: file.taskName ?? '',
          }}
        />
      ))}
    </div>
  );
};

export default FileList;
