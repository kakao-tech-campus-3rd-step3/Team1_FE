import { useOutletContext } from 'react-router-dom';
import StatusBoard from '@/features/board/components/StatusBoard/StatusBoard';
import MemberBoard from '@/features/board/components/MemberBoard/MemberBoard';
import ProjectFilterTab from '@/features/project/components/ProjectPageComponents/ProjectFilterTab';
import MyTaskFilterTab from '@/features/my-task/components/MyTaskPageComponents/MyTaskFilterTab';
import { useState } from 'react';
import { Separator } from '@/shared/components/shadcn/separator';

interface BoardSectionProps {
  type: 'project' | 'myTask';
  boardTab?: 'status' | 'member';
}

interface ProjectOutletContext {
  projectId: string;
}

const BoardSection = ({ type, boardTab: initialTab }: BoardSectionProps) => {
  const context = useOutletContext<ProjectOutletContext | undefined>();
  const projectId = context?.projectId;

  const [boardTab, setBoardTab] = useState<'status' | 'member'>(
    initialTab === 'status' || initialTab === 'member' ? initialTab : 'status',
  );

  const renderFilterTab = () => {
    if (type === 'project') return <ProjectFilterTab value={boardTab} onChange={setBoardTab} />;
    return <MyTaskFilterTab />;
  };

  const renderBoard = () => {
    if (boardTab === 'member') return <MemberBoard />;
    if (type === 'project' && projectId) return <StatusBoard projectId={projectId} />;
    return <StatusBoard />;
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 h-full">
      <section aria-label="filter" className="shrink-0">
        {renderFilterTab()}
      </section>

      <Separator className="bg-gray-300" />

      <div className="flex-1 min-h-0 overflow-x-auto">{renderBoard()}</div>
    </div>
  );
};

export default BoardSection;
