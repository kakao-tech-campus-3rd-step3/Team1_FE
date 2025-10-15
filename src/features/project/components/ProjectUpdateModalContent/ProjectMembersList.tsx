import { type Member } from '@/shared/data/mockMembers';
import ProjectMemberItem from './ProjectMemberItem';

interface ProjectMembersProps {
  members: Member[];
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
