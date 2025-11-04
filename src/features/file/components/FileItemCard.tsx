import { Button } from '@/shared/components/shadcn/button';
import { ChevronRight, Download } from 'lucide-react';
import { formatBytes, getFileIcon } from '@/features/file/utils/fileUtils';
import { useFileDownloadMutation } from '@/features/file/hooks/useFileDownloadMutation';
import { formatDateTime } from '@/shared/utils/dateUtils';

interface FileItemCardProps {
  file: {
    id: string;
    filename: string;
    contentType: string;
    sizeBytes: number;
    completedAt: string;
    taskName: string;
    taskId: string;
  };
}

const FileItemCard = ({ file }: FileItemCardProps) => {
  const { mutate: downloadFile } = useFileDownloadMutation();

  return (
    <div className="group p-5 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200">
      <div className="flex md:flex-nowrap items-center gap-4">
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
          <img
            src={getFileIcon(file.contentType)}
            alt={`${file.contentType} icon`}
            className="w-7 h-7"
          />
        </div>
        <div className="flex-1 min-w-[180px] md:min-w-[280px]">
          <h3 className="text-sm font-medium text-gray-900 truncate mb-1">{file.filename}</h3>
          <div className="flex  items-center gap-2 text-xs text-gray-500">
            <span>{formatBytes(file.sizeBytes)}</span>
            <span className="hidden sm:inline w-1 h-1 bg-gray-300 rounded-full" />
            <span>{formatDateTime(file.completedAt)}</span>
          </div>
        </div>
        <div className="flex justify-center items-center flex-shrink-0 w-full sm:w-auto md:w-[200px]">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-colors w-full md:w-auto"
          >
            <span className="truncate">{file.taskName || '할 일 보기'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </div>
        <div className="flex justify-end gap-1 w-full sm:w-auto md:w-[72px] mt-3 sm:mt-0">
          <Button
            onClick={() => downloadFile({ fileId: file.id, fileName: file.filename })}
            variant="ghost"
            size="sm"
            className="w-9 h-9 p-0 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            title="다운로드"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileItemCard;
