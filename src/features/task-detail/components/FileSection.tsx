import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Link, Upload } from 'lucide-react';
import ContentItem from '@/features/task-detail/components/ContentItem';
import FileItem from '@/features/task-detail/components/FileItem';
import examplePdfUrl from '@/shared/assets/pdf-example/sample.pdf';
import type { FileStatus } from '@/features/task-detail/types/fileType';

interface FileSectionProps {
  onOpenPdf: (fileUrl?: string) => void;
}

const FileSection = ({ onOpenPdf }: FileSectionProps) => {
  const [files, setFiles] = useState([
    {
      id: 1,
      name: 'example.pdf',
      url: examplePdfUrl,
      size: '2MB',
      timeLeft: '5m',
      status: 'uploading',
    },
    {
      id: 2,
      name: 'doc.pdf',
      url: examplePdfUrl,
      size: '1.2MB',
      timeLeft: '10m',
      status: 'success',
    },
  ]);
  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file, idx) => ({
      id: Date.now() + idx,
      name: file.name,
      url: URL.createObjectURL(file),
      size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
      timeLeft: '방금',
      status: 'uploading' as FileStatus,
    }));

    // 기존 파일 + 새 파일
    setFiles((prev) => [...prev, ...newFiles]);
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const DeleteFile = (id: number) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };
  const DownloadFile = (fileUrl: string, fileName: string) => {
    //TODO: 추후 다운로드 API와 연결 필요
    console.log('Downloading', fileUrl, fileName);
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
      >
        {' '}
      </ContentItem>

      <div className="w-full h-full pt-3 flex flex-col  gap-2 overflow-y-auto">
        {files.map((item) => (
          <FileItem
            key={item.id}
            fileName={item.name}
            fileUrl={item.url}
            fileSize={item.size}
            timeleft={item.timeLeft}
            onDelete={() => DeleteFile(item.id)}
            onDownload={() => DownloadFile(item.url, item.name)}
            onOpenPdf={onOpenPdf}
            status={item.status as FileStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default FileSection;
