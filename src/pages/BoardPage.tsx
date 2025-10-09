import KanbanBoard from '@/features/board/components/KanbanBoard';
import TeamMemberBoard from '@/features/board/components/TeamMemberBoard';
import FilterTab from '@/widgets/FilterTab';
import { Separator } from '@/shared/components/shadcn/separator';
import { useState } from 'react';

const BoardPage = () => {
  const [selectedTab, setSelectedTab] = useState<'state' | 'team-member'>('state');

  return (
    <>
      <FilterTab value={selectedTab} onChange={setSelectedTab} />
      <Separator className="bg-gray-300" />
      {selectedTab === 'state' ? <KanbanBoard /> : <TeamMemberBoard />}
    </>
  );
};

export default BoardPage;
