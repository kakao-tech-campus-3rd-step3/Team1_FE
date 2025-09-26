import { Button } from '@/shared/components/shadcn/button';
import ContentItem from './ContentItem';
import { Link } from 'lucide-react';
import FileItem from './FileItem';

interface FileSectionProps {
  onOpenPdf: () => void;
}

const FileSection = ({ onOpenPdf }: FileSectionProps) => {
  return (
    <div className="p-3 border-t border-gray-300  flex flex-col">
      <ContentItem icon={<Link className="w-5 h-5 text-xl text-gray-900" />} title="파일">
        <div className='w-full flex flex-col'>
         <FileItem />
        </div>
      </ContentItem>
      <Button onClick={onOpenPdf} className="bg-boost-orange hover:bg-boost-orange-hover">
        PDF 뷰어 열기
      </Button>
    </div>
  );
};

export default FileSection;
