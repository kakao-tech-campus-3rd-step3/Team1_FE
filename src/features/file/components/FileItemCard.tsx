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
    taskId:string
  };
}

const FileItemCard = ({ file }: FileItemCardProps) => {
  const { mutate: downloadFile } = useFileDownloadMutation();

  return (
    <div className="group p-5 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200">
      <div className="grid grid-cols-[3rem_minmax(0,1fr)_500px_4.5rem] items-center gap-4">
        {/* 파일 아이콘 */}
        <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
          <img
            src={getFileIcon(file.contentType)}
            alt={`${file.contentType} icon`}
            className="w-7 h-7"
          />
        </div>

        {/* 파일 정보 */}
        <div className="min-w-0 max-w-[420px]">
          <h3 className="font-sm text-gray-900 truncate mb-1">{file.filename}</h3>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{formatBytes(file.sizeBytes)}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <span>{formatDateTime(file.completedAt)}</span>
          </div>
        </div>

        {/* 할 일 태그 */}
        <div className="flex justify-center items-center text-center">
          <Button
          //TODO:API 연동 후 할 일로의 라우팅 추가 
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            <span className="max-w-[220px] truncate">{file.taskName || '할 일 보기'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* 액션 버튼 */}
        <div className="flex justify-end gap-1">
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
