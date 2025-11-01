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

  console.log(member);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar
            style={{ backgroundColor: member?.backgroundColor }}
            className={cn(
              'flex items-center justify-center w-6 h-6 cursor-pointer ring-1 ring-background',
            )}
          >
            <AvatarFallback>{member?.name[0] ?? '?'}</AvatarFallback>
            <AvatarImage src={getAvatarSrc(member)} className="w-5 h-5" />
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
