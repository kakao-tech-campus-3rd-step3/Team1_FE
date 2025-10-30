import { Label } from '@/shared/components/shadcn/label';
import InfoCard from '@/shared/components/ui/InfoCard';
import { FileText } from 'lucide-react';

interface DescriptionAreaProps {
  description: string;
}

const DescriptionArea = ({ description }: DescriptionAreaProps) => {
  return (
    <InfoCard className="flex-1 flex flex-col overflow-hidden">
      <Label className="flex items-center text-gray-800 subtitle1-bold mb-2 mt-1">
        <FileText className="w-4 h-4 text-gray-700" />
        작업 내용
      </Label>
      <div className="flex-1 overflow-auto rounded-lg p-3 label1-regular text-gray-700 leading-relaxed">
        <p className="whitespace-pre-wrap">{description}</p>
      </div>
    </InfoCard>
  );
};

export default DescriptionArea;
