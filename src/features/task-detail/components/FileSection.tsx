import { Button } from '@/shared/components/shadcn/button';

interface FileSectionProps {
  onOpenPdf: () => void;
}

const FileSection = ({ onOpenPdf }: FileSectionProps) => {
  return (
    <div className="p-3">
      <Button onClick={onOpenPdf} className="bg-boost-orange hover:bg-boost-orange-hover">
        PDF 뷰어 열기
      </Button>
    </div>
  );
};

export default FileSection;
