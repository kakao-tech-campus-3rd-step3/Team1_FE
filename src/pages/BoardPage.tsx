import StatusBoard from '@/features/board/components/StatusBoard/StatusBoard';
import MemberBoard from '@/features/board/components/MemberBoard/MemberBoard';
import FilterTab from '@/widgets/FilterTab';
import { Separator } from '@/shared/components/shadcn/separator';
import { useState } from 'react';
import { useParams } from 'react-router';

const BoardPage = () => {
  const [selectedTab, setSelectedTab] = useState<'status' | 'member'>('status');
  const { projectId } = useParams<{ projectId: string }>();

  if (!projectId) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        프로젝트 ID가 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 h-full">
      <section aria-label="filter" className="shrink-0">
        <FilterTab value={selectedTab} onChange={setSelectedTab} />
      </section>

      <Separator className="bg-gray-300" />

      <section aria-label="board" className="overflow-x-auto flex-1">
        {/* 📍 TODO: 팀원 대시보드는 참여 API 연동 이후 작업할 예정 */}
        {selectedTab === 'status' ? <StatusBoard projectId={projectId} /> : <MemberBoard />}
      </section>
    </div>
  );
};

export default BoardPage;
