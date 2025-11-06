import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/shadcn/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/shadcn/tooltip';
import { cn } from '@/shared/lib/utils';
import { useProjectMembersQuery } from '@/features/project/hooks/useProjectMembersQuery';
import { getAvatarSrc } from '@/features/avatar-picker/utils/avatarUtils';

interface AssigneeAvatarProps {
  projectId: string;
  assigneeId: string;
}

const AssigneesList = ({ projectId, assigneeId }: AssigneeAvatarProps) => {
  const { data: projectMembers } = useProjectMembersQuery(projectId);
  const member = projectMembers?.find((m) => m.id === assigneeId);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar
            style={{
              backgroundColor: member?.backgroundColor,
            }}
            className={cn(
              'flex items-center justify-center w-7 h-7 cursor-pointer ring-2 ring-white',
            )}
          >
            <AvatarFallback>{member?.name[0] ?? '?'}</AvatarFallback>
            <AvatarImage src={getAvatarSrc(member)} className="w-6 h-6" />
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
