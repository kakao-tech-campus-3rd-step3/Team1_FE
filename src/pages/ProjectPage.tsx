import KanbanBoard from '@/features/kanban/components/KanbanBoard';
import { Separator } from '@/shared/components/shadcn/separator';
import FilterTab from '@/widgets/FilterTab';
import Header from '@/widgets/Header';
import TobTab from '@/widgets/TobTab';
import { useParams } from 'react-router';

const ProjectPage = () => {
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <div className="flex flex-row min-h-screen overflow-auto">
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
};

export default ProjectPage;
