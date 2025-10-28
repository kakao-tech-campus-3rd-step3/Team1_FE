import { Button } from '@/shared/components/shadcn/button';
import type { Member } from '@/shared/data/mockMembers';
import { cn } from '@/shared/lib/utils';
import { UserRoundX } from 'lucide-react';

interface ProjectMemberItemProps {
  member: Member;
}

const ProjectMemberItem = ({ member }: ProjectMemberItemProps) => {
  return (
    <div className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-3 hover:border-gray-300 hover:bg-gray-50 transition-all">
      <div className="flex items-center gap-3 flex-1">
        <div
          className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center text-gray-100 shadow-sm',
            member.backgroundColor,
          )}
        >
          {member.avatar ? (
            <img
              src={member.avatar}
              alt={member.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            member.name[0]
          )}
        </div>
        <div className="flex-1">
          <div className=" text-gray-800 subtitle2-bold">{member.name}</div>
          <div className="label2-regular text-gray-500 mt-0.5">
            Boosting Score:{' '}
            <span className="font-medium text-boost-blue">{member.boostingScore}</span>
          </div>
        </div>
      </div>

      <Button
        size="icon"
        className="bg-gray-100 rounded-full text-boost-orange border-none hover:bg-boost-orange hover:text-white duration-300"
      >
        <UserRoundX className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
};

export default ProjectMemberItem;
