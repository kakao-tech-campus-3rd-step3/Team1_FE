import { getTotalFileSize } from '@/features/file/utils/fileUtils';

interface FileTableInfoProps {
  files: {
    sizeBytes: number;
  }[];
}

const FileTableInfo = ({ files }: FileTableInfoProps) => {
  return (
    <div className="flex items-center justify-between label1-regular text-gray-500 px-2 pb-2">
      <p>총 {files.length}개 파일</p>
      <p>전체 용량 : {getTotalFileSize(files)}</p>
    </div>
  );
};

export default FileTableInfo;
