import { TableRow, TableCell } from '@/shared/components/shadcn/table';
import { Button } from '@/shared/components/shadcn/button';
import { Download, ChevronRight } from 'lucide-react';
import { formatBytes, getFileIcon } from '@/features/file/utils/fileUtils';
import { useFileDownloadMutation } from '@/features/file/hooks/useFileDownloadMutation';
import { formatDateTime } from '@/shared/utils/dateUtils';
import type { ProjectFile } from '@/features/file/types/fileApiTypes';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/app/routes/Router';
import { useProjectStore } from '@/features/project/store/useProjectStore';

interface FileTableRowProps {
  file: ProjectFile;
  index: number;
}

const FileTableRow = ({ file, index }: FileTableRowProps) => {
  const projectData = useProjectStore((state) => state.projectData);
  const { mutate: downloadFile } = useFileDownloadMutation();
  const navigate = useNavigate();

  return (
    <TableRow className="bg-white border-b border-gray-100 hover:bg-blue-50/30 transition-colors duration-150 h-[60px]">
      <TableCell className="w-[6%] pl-7">{index + 1}</TableCell>

      <TableCell className="w-[30%]">
        <div className="flex items-center gap-3 h-full">
          <img src={getFileIcon(file.contentType)} alt="file-icon" className="w-6 h-6" />
          <span className="truncate">{file.filename}</span>
        </div>
      </TableCell>

      <TableCell className="w-[10%]">{formatBytes(file.sizeBytes)}</TableCell>
      <TableCell className="w-[20%]">{formatDateTime(file.completedAt)}</TableCell>

      <TableCell className="w-[20%]">
        <Button
          onClick={() => navigate(ROUTES.TASK_DETAIL(projectData.id, file.taskId))}
          variant="link"
          className="p-0 text-gray-700 flex items-center gap-1"
        >
          {file.taskName || '할 일로 이동'} <ChevronRight className="w-3.5 h-3.5" />
        </Button>
      </TableCell>

      <TableCell className="w-[14%] text-center">
        <Button
          onClick={() => downloadFile({ fileId: file.fileId, fileName: file.filename })}
          variant="ghost"
          size="sm"
          className="w-9 h-9 p-0 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <Download className="w-4 h-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default FileTableRow;
