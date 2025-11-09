import { getAvatarSrc } from '@/features/avatar-picker/utils/avatarUtils';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/shadcn/avatar';
import { Button } from '@/shared/components/shadcn/button';
import { UserRoundX } from 'lucide-react';
import type { MemberWithBoosting } from '@/features/project/types/projectTypes';
import { useProjectStore } from '@/features/project/store/useProjectStore';
import { ROLES } from '@/features/project/constants/projectConstants';
import { useModal } from '@/shared/hooks/useModal';
import ProjectKickMemberModalContent from '@/features/project/components/ProjectManageModal/ProjectKickMemberModalContent';
import { useAuthStore } from '@/features/auth/store/useAuthStore';

interface ProjectMemberItemProps {
  member: MemberWithBoosting;
}

const ProjectMemberItem = ({ member }: ProjectMemberItemProps) => {
  const projectData = useProjectStore((state) => state.projectData);
  const currentUser = useAuthStore((state) => state.user);
  const currentUserId = currentUser?.id;

  const projectId = projectData?.id;
  const isOwner = projectData?.role === ROLES.OWNER;
  const { showCustom } = useModal();

  const handleKickClick = () => {
    if (!projectId) return;
    showCustom({
      title: '멤버 추방',
      description: `${member.name}님을 프로젝트에서 추방하시겠어요?`,
      titleAlign: 'center',
      size: 'sm',
      content: <ProjectKickMemberModalContent projectId={projectId} member={member} />,
    });
  };

  return (
    <div className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-3 hover:border-gray-300 hover:bg-gray-50 transition-all">
      <div className="flex items-center gap-3 flex-1">
        <Avatar
          className="w-11 h-11 flex items-center justify-center shadow-sm"
          style={{ backgroundColor: member.backgroundColor, borderColor: member.backgroundColor }}
        >
          <AvatarImage src={getAvatarSrc(member)} alt={member.name} className="w-9 h-9" />
          <AvatarFallback>{member.name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="text-gray-800 subtitle2-bold">{member.name}</div>
          <div className="label2-regular text-gray-500 mt-0.5">
            Boosting Score: <span className="font-medium text-boost-blue">{member.totalScore}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isOwner && member.id === currentUserId && (
          <span className="label2-regular text-gray-400 mr-2">팀장</span>
        )}

        {isOwner && member.id !== currentUserId && (
          <Button
            size="icon"
            onClick={handleKickClick}
            className="bg-gray-100 rounded-full text-boost-orange border-none hover:bg-boost-orange hover:text-white duration-300"
          >
            <UserRoundX className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProjectMemberItem;
