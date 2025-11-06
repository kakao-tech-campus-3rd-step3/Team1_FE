import { TableBody } from '@/shared/components/shadcn/table';
import FileTableRow from '@/features/file/components/FileTableRow';
import type { ProjectFile } from '@/features/file/types/fileApiTypes';

interface FileTableBodyProps {
  files: ProjectFile[];
}

const FileTableBody = ({ files }: FileTableBodyProps) => {
  return (
    <TableBody>
      {files.map((file, index) => (
        <FileTableRow key={file.fileId} file={file} index={index} />
      ))}
    </TableBody>
  );
};

export default FileTableBody;
