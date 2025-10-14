import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Link, Upload } from 'lucide-react';
import ContentItem from '@/features/task-detail/components/ContentItem';
import FileItem from '@/features/task-detail/components/FileItem';
import type { TaskDetailFileType } from '@/features/task-detail/types/taskDetailFileType';
import { useUploadFileMutation } from '@/features/task-detail/hooks/useFileUploadUrlMutation';
import { formatBytes } from '@/features/file/utils/fileUtils';
import { v4 as uuidv4 } from 'uuid';

interface FileSectionProps {
  onOpenPdf: (fileUrl?: string) => void;
  taskId: string;
}

const FileSection = ({ onOpenPdf, taskId }: FileSectionProps) => {
  const [files, setFiles] = useState<TaskDetailFileType[]>([]);
  const fileUploadUrlMutation = useUploadFileMutation();
  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const tempId = uuidv4()
      // 임시 UI 파일
      const newFile: TaskDetailFileType = {
        fileId: tempId,
        fileName: file.name,
        fileUrl: URL.createObjectURL(file),
        fileSize: formatBytes(file.size),
        timeLeft: '방금',
        status: 'uploading',
      };

      setFiles((prev) => [...prev, newFile]);

      fileUploadUrlMutation.mutate(
        { file, taskId },
        {
          onError: () => {
            setFiles((prev) => prev.filter((f) => f.fileName !== file.name));
          },
        },
      );
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleDelete = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.fileId !== fileId));
  };

  const handleDownload = (fileName: string) => {
    console.log('Downloading', fileName);
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
        {files.map((item) => (
          <FileItem
            key={item.fileId}
            fileId={item.fileId}
            fileName={item.fileName}
            fileUrl={item.fileUrl}
            fileSize={item.fileSize}
            timeLeft={item.timeLeft}
            onDelete={() => handleDelete(item.fileId)}
            onDownload={() => handleDownload(item.fileName)}
            onOpenPdf={onOpenPdf}
            status={item.status}
          />
        ))}
      </div>
    </div>
  );
};

export default FileSection;
