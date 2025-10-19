import { useDropzone } from 'react-dropzone';
import { Link, Upload } from 'lucide-react';
import ContentItem from '@/features/task-detail/components/ContentItem';
import FileItem from '@/features/task-detail/components/FileItem';
import { useUploadFileMutation } from '@/features/task-detail/hooks/useFileUploadUrlMutation';
import { useTaskFilesQuery } from '@/features/task-detail/hooks/useTaskFilesQuery';
import type { ServerFileType } from '@/features/task-detail/utils/fileAdapter';

interface FileSectionProps {
  onOpenPdf: (url: string, fileName: string) => void;
  taskId: string;
  files: ServerFileType[];
}
const FileSection = ({ onOpenPdf, taskId, files: serverFiles }: FileSectionProps) => {
  const fileUploadUrlMutation = useUploadFileMutation();
  const { data: uiFiles } = useTaskFilesQuery(serverFiles, taskId);

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      fileUploadUrlMutation.mutate({ file, taskId });
    });
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleDelete = (fileId: string) => {
    console.log(fileId);
    //TODO: 파일 삭제 기능 필요
  };

  return (
    <div className="w-full h-full pt-6 p-3 pb-4 border-t-2 border-gray-300  flex flex-col">
      <ContentItem
        icon={<Link className="w-5 h-5 text-xl text-gray-900" />}
        title="첨부파일"
        action={
          <div {...getRootProps()} className="cursor-pointer">
            <input {...getInputProps()} />
            <Upload className="w-5 h-5  text-gray-900" />
          </div>
        }
      />

      <div className="w-full h-full pt-3 flex flex-col gap-2 overflow-y-auto">
        {uiFiles?.map((item) => (
          <FileItem
            key={item.fileId}
            fileId={item.fileId}
            fileName={item.fileName}
            fileUrl={item.fileUrl}
            fileSize={item.fileSize}
            timeLeft={item.timeLeft}
            onDelete={() => handleDelete(item.fileId)}
            onOpenPdf={() => onOpenPdf(item.fileUrl, item.fileName)}
            status={item.status}
          />
        ))}
      </div>
    </div>
  );
};

export default FileSection;
