import { Avatar, AvatarFallback } from '@/shared/components/shadcn/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/shadcn/tooltip';
import { mockMembers } from '@/shared/data/mockMembers';
import { cn } from '@/shared/lib/utils';

interface AssigneeAvatarProps {
  assigneeId: string;
}

// 📍 TODO: 프로젝트 참여 팀원 조회 API 연동 이후 수정 필요. 현재 mock Data.
const AssigneesList = ({ assigneeId }: AssigneeAvatarProps) => {
  const member = mockMembers.find((m) => m.id === assigneeId);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar
            className={cn('w-6 h-6 cursor-pointer ring-1 ring-background', member?.backgroundColor)}
          >
            <AvatarFallback>{member?.name[0] ?? '?'}</AvatarFallback>
            <AvatarImage src={member?.avatar || ''} />
          </Avatar>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>{member?.name ?? assigneeId}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AssigneesList;
