import KanbanBoard from '@/features/kanban/components/KanbanBoard';
import { Separator } from '@/shared/components/shadcn/separator';
import FilterTab from '@/widgets/FilterTab';
import Header from '@/widgets/Header';
import TobTab from '@/widgets/TobTab';
import { useParams } from 'react-router';

function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <div className="flex flex-row h-screen">
      <div className="w-[75px] bg-gray-900 flex-shrink-0 text-white">임시 사이드바</div>
      <div className="flex-1 flex flex-col">
        <TobTab />
        <Header projectId={Number(projectId)} />
        <Separator className="bg-gray-300" />
        <FilterTab />
        <Separator className="bg-gray-300" />
        <KanbanBoard />
      </div>
    </div>
  );
}

export default ProjectPage;
