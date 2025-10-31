import { Calendar } from 'lucide-react';
import { Badge } from '@/shared/components/shadcn/badge';
import { cn } from '@/shared/lib/utils';
import { getColorForTag } from '@/shared/utils/tagUtils';
import { calculateDDay } from '@/shared/utils/dateUtils';
import ContentItem from '@/shared/components/ui/ContentItem';
import InfoCard from '@/shared/components/ui/InfoCard';

interface DueDateInfoProps {
  dueDate: string;
}

const DueDateInfo = ({ dueDate }: DueDateInfoProps) => (
  <InfoCard>
    <ContentItem icon={Calendar} title="마감일">
      <div className="flex items-center gap-2 mt-1">
        <span className="label1-regular text-gray-700">{dueDate}</span>
        <Badge className={cn('label1-regular', getColorForTag('마감일'))}>
          {calculateDDay(dueDate, 'text')}
        </Badge>
      </div>
    </ContentItem>
  </InfoCard>
);

export default DueDateInfo;
