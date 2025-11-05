import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/shadcn/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/shadcn/tooltip';
import { cn } from '@/shared/lib/utils';
import { getAvatarSrc } from '@/features/avatar-picker/utils/avatarUtils';
import type { Member } from '@/features/user/types/userTypes';

interface AssigneeAvatarProps {
  assignee: Member;
}

const AssigneesList = ({ assignee }: AssigneeAvatarProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar
            style={{
              backgroundColor: assignee?.backgroundColor,
            }}
            className={cn(
              'flex items-center justify-center w-7 h-7 cursor-pointer ring-2 ring-white',
            )}
          >
            <AvatarFallback>{assignee?.name[0] ?? '?'}</AvatarFallback>
            <AvatarImage src={getAvatarSrc(assignee)} className="w-6 h-6" />
          </Avatar>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>{assignee?.name ?? assignee.id}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AssigneesList;
