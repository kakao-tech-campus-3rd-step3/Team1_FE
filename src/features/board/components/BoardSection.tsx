import StatusBoard from '@/features/board/components/StatusBoard/StatusBoard';
import MemberBoard from '@/features/board/components/MemberBoard/MemberBoard';
import { useOutletContext } from 'react-router-dom';

interface BoardSectionProps {
  boardTab?: 'status' | 'member';
  projectId?: string;
}

const BoardSection = ({ boardTab: propBoardTab, projectId: propProjectId }: BoardSectionProps) => {
  const context = useOutletContext<Partial<BoardSectionProps>>();
  const boardTab = propBoardTab || context?.boardTab || 'status';
  const projectId = propProjectId || context?.projectId || '';

  return (
    <div className="flex flex-col flex-1 min-h-0 h-full">
      {boardTab === 'status' ? <StatusBoard projectId={projectId} /> : <MemberBoard />}
    </div>
  );
};

export default BoardSection;
