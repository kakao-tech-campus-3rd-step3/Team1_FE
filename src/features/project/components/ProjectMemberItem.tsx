import { getAvatarSrc } from '@/features/avatar-picker/utils/avatarUtils';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/shadcn/avatar';
import { Button } from '@/shared/components/shadcn/button';
import { UserRoundX } from 'lucide-react';
import type { MemberWithBoosting } from '@/features/project/types/projectTypes';
import { useProjectStore } from '@/features/project/store/useProjectStore';
import { ROLES } from '@/features/project/constants/projectConstants';

interface ProjectMemberItemProps {
  member: MemberWithBoosting;
}

const ProjectMemberItem = ({ member }: ProjectMemberItemProps) => {
  const projectData = useProjectStore((state) => state.projectData);
  const isOwner = projectData?.role === ROLES.OWNER;

  return (
    <div className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-3 hover:border-gray-300 hover:bg-gray-50 transition-all">
      <div className="flex items-center gap-3 flex-1">
        <div className="rounded-full flex items-center justify-center text-gray-100">
          <Avatar
            className="w-11 h-11 flex items-center justify-center shadow-sm"
            style={{ backgroundColor: member.backgroundColor, borderColor: member.backgroundColor }}
          >
            <AvatarImage src={getAvatarSrc(member)} alt={member.name} className="w-9 h-9" />
            <AvatarFallback>{member.name[0]}</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1">
          <div className=" text-gray-800 subtitle2-bold">{member.name}</div>
          <div className="label2-regular text-gray-500 mt-0.5">
            Boosting Score: <span className="font-medium text-boost-blue">{member.totalScore}</span>
          </div>
        </div>
      </div>

      {isOwner && (
        <Button
          size="icon"
          className="bg-gray-100 rounded-full text-boost-orange border-none hover:bg-boost-orange hover:text-white duration-300"
        >
          <UserRoundX className="w-3.5 h-3.5" />
        </Button>
      )}
    </div>
  );
};

export default ProjectMemberItem;
