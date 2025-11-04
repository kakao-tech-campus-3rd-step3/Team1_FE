import { useState } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import MemberColumn from '@/features/board/components/MemberBoard/MemberColumn';
import DoneColumn from '@/features/board/components/MemberBoard/DoneColumn';
import { useInfiniteProjectTasksByStatusQuery } from '@/features/task/hooks/useInfiniteProjectTasksByStatusQuery';
import { useHorizontalScroll } from '@/features/board/hooks/useHorizontalScroll';
import type { TaskListItem } from '@/features/task/types/taskTypes';
import { useProjectMembersQuery } from '@/features/project/hooks/useProjectMembersQuery';
import { useProjectBoostingScoresQuery } from '@/features/project/hooks/useProjectBoostingScoresQuery';
import type { MemberWithBoosting } from '@/features/project/types/projectTypes';

interface MemberBoardProps {
  projectId?: string;
}

const MemberBoard = ({ projectId }: MemberBoardProps) => {
  const [isBoardHover, setIsBoardHover] = useState(false);

  const {
    ref: scrollRef,
    canScrollLeft,
    canScrollRight,
    scroll,
  } = useHorizontalScroll<HTMLDivElement>();

  const { data: projectMembers, isLoading } = useProjectMembersQuery(projectId);
  const { data: projectBoostingScores } = useProjectBoostingScoresQuery(projectId);

  const projectMembersWithBoostingScore = (projectMembers ?? []).map((member) => {
    const boosting = projectBoostingScores?.find((b) => b.memberId === member.id);

    return {
      ...member,
      totalScore: boosting?.totalScore ?? 0,
      rank: boosting?.rank ?? 0,
      calculatedAt: boosting?.calculatedAt ?? '',
    };
  });

  const { data: doneData } = useInfiniteProjectTasksByStatusQuery(projectId ?? '', 'DONE');
  const doneTasks: TaskListItem[] = doneData?.pages.flatMap((page) => page.tasks) ?? [];

  const handleMouseEnter = () => setIsBoardHover(true);
  const handleMouseLeave = () => setIsBoardHover(false);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 가로 스크롤 버튼 */}
      {isBoardHover && canScrollLeft && (
        <>
          <div className="pointer-events-none fixed ml-[75px] left-0 h-[calc(100%-152px)] w-16 z-40 bg-gradient-to-r from-gray-300/90 to-transparent" />
          <button
            onClick={() => scroll('left')}
            className="fixed ml-18 mt-18 left-4 top-1/2 transform -translate-y-1/2 z-50 p-2 bg-gray-300/70 hover:bg-gray-300 rounded-full shadow-md"
          >
            <ChevronLeft />
          </button>
        </>
      )}
      {isBoardHover && canScrollRight && (
        <>
          <div className="pointer-events-none fixed right-0 h-[calc(100%-152px)] w-16 z-40 bg-gradient-to-l from-gray-400/60 to-transparent" />
          <button
            onClick={() => scroll('right')}
            className="fixed mr-2 mt-18 right-4 top-1/2 transform -translate-y-1/2 z-50 p-2 bg-gray-300/70 hover:bg-gray-300 rounded-full shadow-md"
          >
            <ChevronRight />
          </button>
        </>
      )}

      {/* 멤버 컬럼 */}
      <div ref={scrollRef} className="overflow-x-auto overflow-y-hidden h-full py-2 px-1">
        <div className="flex gap-3 min-w-max h-full items-stretch">
          {(projectMembersWithBoostingScore ?? []).map((member: MemberWithBoosting) => (
            <MemberColumn key={member.id} projectId={projectId ?? ''} member={member} />
          ))}

          {/* 완료 컬럼 */}
          <DoneColumn tasks={doneTasks} />
        </div>
      </div>
    </div>
  );
};

export default MemberBoard;
