import ProjectMemberItem from '@/features/project/components/ProjectUpdateModal/ProjectMemberItem';
import type { MemberWithBoosting } from '@/features/project/types/projectTypes';

interface ProjectMembersProps {
  members: MemberWithBoosting[];
}

const ProjectMembers = ({ members }: ProjectMembersProps) => {
  return (
    <div className="flex-1.5 overflow-y-auto overflow-x-hidden border-r border-gray-300">
      <div className="w-[40vh] space-y-2">
        {members.map((member) => (
          <ProjectMemberItem key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default ProjectMembers;
