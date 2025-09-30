import KanbanBoard from '@/features/board/components/KanbanBoard';
import TeamMemberBoard from '@/features/board/components/TeamMemberBoard';
import { Separator } from '@/shared/components/shadcn/separator';
import FilterTab from '@/widgets/FilterTab';
import Header from '@/widgets/Header';
import TobTab from '@/widgets/TobTab';
import { useState } from 'react';
import { useParams } from 'react-router';

const ProjectPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [seletedTab, setSelectedTab] = useState<'state' | 'team-member'>('state');

  return (
    <div className="flex flex-row flex-1 overflow-x-auto h-screen">
      <div className="flex-1 flex flex-col min-w-0">
        <nav aria-label="top-tab">
          <TobTab />
        </nav>

        <header aria-label="header">
          <Header projectId={Number(projectId)} />
        </header>

        <Separator className="bg-gray-300" />

        <section aria-label="filter">
          <FilterTab value={seletedTab} onChange={setSelectedTab} />
        </section>

        <Separator className="bg-gray-300" />

        <section aria-label="board" className="overflow-x-auto flex-1">
          {seletedTab === 'team-member' && <TeamMemberBoard />}
          {seletedTab === 'state' && <KanbanBoard />}
        </section>
      </div>
    </div>
  );
};

export default ProjectPage;
