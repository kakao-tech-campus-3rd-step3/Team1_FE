import { type Status } from '@/features/board/types/boardTypes';
import { getTitleByStatus } from '@/features/board/utils/boardUtils';
import InfoCard from '@/shared/components/ui/InfoCard';
import { Label } from '@/shared/components/shadcn/label';
import { Loader } from 'lucide-react';

interface StatusInfoProps {
  status: string;
}

const StatusInfo = ({ status }: StatusInfoProps) => {
  return (
    <InfoCard>
      <Label className="flex items-center text-gray-800 subtitle1-bold mb-1">
        <Loader className="w-4 h-4 text-gray-700" />
        진행 상태
      </Label>
      <div className="label2-regular p-2 py-1 mt-2 rounded-md w-fit shadow-sm bg-boost-orange text-white">
        {getTitleByStatus(status as Status)}
      </div>
    </InfoCard>
  );
};

export default StatusInfo;
