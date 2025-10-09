import { Button } from '@/shared/components/shadcn/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/shadcn/dropdown-menu';
import { Checkbox } from '@/shared/components/shadcn/checkbox';
import { Avatar, AvatarImage } from '@/shared/components/shadcn/avatar';
import { cn } from '@/shared/lib/utils';
import { mockMembers } from '@/shared/data/mockMembers';

interface AssigneeDropdownProps {
  assignees: string[];
  toggleAssignee: (name: string) => void;
  disabled?: boolean;
  members?: typeof mockMembers;
}

const AssigneeDropdown = ({
  assignees,
  toggleAssignee,
  disabled,
  members = mockMembers,
}: AssigneeDropdownProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="outline"
        className="w-full justify-between border-gray-300 hover:border-gray-400 h-11"
        disabled={disabled}
      >
        <span className="truncate label2-regular">
          {assignees.length ? assignees.join(', ') : '담당자를 선택하세요'}
        </span>
        {assignees.length > 0 && (
          <span className="ml-2 bg-blue-100 text-boost-blue px-2 py-0.5 rounded-full text-xs font-medium">
            {assignees.length}
          </span>
        )}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="min-w-[300px] border-gray-300 shadow-sm">
      <DropdownMenuLabel className="text-xs text-gray-500">팀 멤버</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {members.map((member) => {
        const isChecked = assignees.includes(member.name);
        return (
          <DropdownMenuItem
            key={member.id}
            onSelect={(e) => e.preventDefault()}
            className="flex items-center gap-3 cursor-pointer py-2"
            onClick={() => toggleAssignee(member.name)}
          >
            <Checkbox
              checked={isChecked}
              className={cn(
                'data-[state=checked]:bg-boost-blue data-[state=checked]:border-boost-blue',
              )}
            />
            <Avatar
              className={cn(
                'flex items-center h-6 w-6 rounded-full shrink-0 shadow-xs',
                member.backgroundColor,
              )}
            >
              <AvatarImage
                src={member.avatar}
                className="h-5 w-5 object-cover rounded-full mx-auto my-auto"
              />
            </Avatar>
            <span className="font-medium text-sm">{member.name}</span>
          </DropdownMenuItem>
        );
      })}
    </DropdownMenuContent>
  </DropdownMenu>
);

export default AssigneeDropdown;
