import { getTotalFileSize } from '@/features/file/utils/fileUtils';

interface FileFooterProps {
  files: {
    sizeBytes: number;
  }[];
}

const FileFooter = ({ files }: FileFooterProps) => {
  return (
    <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
      <p>총 {files.length}개 파일</p>
      <p>전체 용량 : {getTotalFileSize(files)}</p>
    </div>
  );
};

export default FileFooter;
