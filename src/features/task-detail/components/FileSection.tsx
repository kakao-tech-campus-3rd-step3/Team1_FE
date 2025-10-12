import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Link, Upload } from 'lucide-react';
import ContentItem from '@/features/task-detail/components/ContentItem';
import FileItem from '@/features/task-detail/components/FileItem';
import type { TaskDetailFileType } from '@/features/task-detail/types/taskDetailFileType';

interface FileSectionProps {
  onOpenPdf: (fileUrl?: string) => void;
}

const FileSection = ({ onOpenPdf }: FileSectionProps) => {
  const [files, setFiles] = useState<TaskDetailFileType[]>([]);
  const onDrop = (acceptedFiles: File[]) => {
    const newFile: TaskDetailFileType[] = acceptedFiles.map((file, idx) => ({
      fileId: Date.now().toString() + idx,
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
      fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      timeLeft: '방금',
      status: 'uploading',
      onOpenPdf: onOpenPdf,
      onDelete: (id?: string) => {
        setFiles((prev) => prev.filter((file) => file.fileId !== id));
      },
      onDownload: (fileUrl?: string, fileName?: string) => {
        console.log('Downloading', fileUrl, fileName);
      },
    }));
    setFiles((prev) => [...prev, ...newFile]);
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

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
            onDelete={item.onDelete}
            onDownload={item.onDownload}
            onOpenPdf={item.onOpenPdf}
            status={item.status}
          />
        ))}
      </div>
    </div>
  );
};

export default FileSection;
