import ContentItem from './ContentItem';
import { Link, Upload } from 'lucide-react';
import FileItem from './FileItem';
import examplePdfUrl from '@/shared/assets/pdf-example/sample.pdf';
import { useState } from 'react';
import type { FileStatus } from '../types/fileType';
//TODO: 파일 타입
interface FileSectionProps {
  onOpenPdf: (fileUrl?: string) => void;
}

const FileSection = ({ onOpenPdf }: FileSectionProps) => {
  const [files, setFiles] = useState([
    { id: 1, name: 'example.pdf', url: examplePdfUrl, size: '2MB', timeLeft: '5m', status: 'uploading' },
    { id: 2, name: 'doc.pdf', url: examplePdfUrl, size: '1.2MB', timeLeft: '10m', status: 'success' },
  ]);
  const handleDelete = (id: number) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  return (
    <div className="w-full  h-full pt-6 p-3 pb-4 border-t-2 border-gray-300  flex flex-col">
      <ContentItem
        icon={<Link className="w-5 h-5 text-xl text-gray-900" />}
        title="첨부파일"
        action={<Upload onClick={() => {}} className='w-5 h-5  text-gray-900' />}
      >
        <div className="w-full h-full pt-3 flex flex-col  gap-2 overflow-y-auto">
          {files.map((item) => (
            <FileItem
              key={item.id}
              fileName={item.name}
              fileUrl={item.url}
              fileSize={item.size}
              timeleft={item.timeLeft}
              onDelete={() => handleDelete(item.id)}
              onOpenPdf={onOpenPdf}
              status={item.status as FileStatus}
            />
          ))}
        </div>
      </ContentItem>
    </div>
  );
};

export default FileSection;
