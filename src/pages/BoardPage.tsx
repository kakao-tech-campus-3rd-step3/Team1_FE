import KanbanBoard from '@/features/board/components/KanbanBoard';
import TeamMemberBoard from '@/features/board/components/TeamMemberBoard';
import FilterTab from '@/widgets/FilterTab';
import { Separator } from '@/shared/components/shadcn/separator';
import { useState } from 'react';

const BoardPage = () => {
  const [selectedTab, setSelectedTab] = useState<'state' | 'team-member'>('state');

  return (
    <div className="flex flex-col flex-1 min-h-0 h-full">
      <section aria-label="filter" className="shrink-0">
        <FilterTab value={selectedTab} onChange={setSelectedTab} />
      </section>

      <Separator className="bg-gray-300" />

      <section aria-label="board" className="overflow-x-auto flex-1">
        {selectedTab === 'state' ? <KanbanBoard /> : <TeamMemberBoard />}
      </section>
    </div>
  );
};

export default BoardPage;
