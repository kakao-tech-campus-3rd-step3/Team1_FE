import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils';
import { useInfiniteProjectTasksByMemberQuery } from '@/features/task/hooks/useInfiniteProjectTasksByMemberQuery';
import { useVerticalScroll } from '@/features/board/hooks/useVerticalScroll';
import TaskCard from '@/features/task/components/TaskCard/TaskCard';
import type { Member } from '@/shared/data/mockMembers';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/shadcn/avatar';
import { Separator } from '@/shared/components/shadcn/separator';
import rocket from '@/shared/assets/images/boost/rocket-2d.png';
import { columnOrder, columnStatus } from '@/features/board/types/boardTypes';

interface MemberColumnProps {
  projectId: string;
  member: Member;
}

const MemberColumn = ({ projectId, member }: MemberColumnProps) => {
  const [isProfileCollapsible, setIsProfileCollapsible] = useState(false);
  const [isMouseInside, setIsMouseInside] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteProjectTasksByMemberQuery(projectId, member.id);

  const tasks = data?.pages.flatMap((page) => page.tasks) ?? [];
  const activeTasks = tasks.filter((t) => t.status !== 'DONE');

  const sortedColumnStatus = columnStatus
    .filter((c) => c.status !== 'DONE')
    .sort((a, b) => columnOrder.indexOf(a.status) - columnOrder.indexOf(b.status));

  const columnData = sortedColumnStatus.map(({ status, title }) => ({
    status,
    title,
    tasks: activeTasks.filter((t) => t.status === status),
  }));

  const scrollRef = useVerticalScroll<HTMLDivElement>(() => {
    if (!scrollRef.current || !isMouseInside) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    setIsProfileCollapsible(scrollHeight > 100);

    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
    if (isAtBottom && hasNextPage && !isFetchingNextPage) fetchNextPage();
  });

  const handleMouseEnter = () => setIsMouseInside(true);
  const handleMouseLeave = () => {
    setIsMouseInside(false);
    setIsProfileCollapsible(false);
  };

  return (
    <div
      className="flex bg-gray-100 m-1 h-full shadow-md rounded-xl border-2 border-gray-300 flex-col w-[330px] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 프로필 영역 */}
      <motion.div
        className="flex items-center gap-3 justify-between p-3 rounded-t-xl sticky top-0 bg-gray-100 z-10"
        animate={{ flexDirection: isProfileCollapsible ? 'row' : 'column' }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.div
          className={cn('flex items-center mt-5', { 'ml-[12px]': isProfileCollapsible })}
          animate={{
            marginTop: isProfileCollapsible ? '0px' : '20px',
            scale: isProfileCollapsible ? 0.8 : 1,
          }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Avatar
            className={cn(
              'flex items-center justify-center',
              member.backgroundColor,
              isProfileCollapsible ? 'w-23 h-23' : 'w-27 h-27',
            )}
          >
            <AvatarFallback>{member.name[0]}</AvatarFallback>
            <AvatarImage
              src={member.avatar}
              className={cn(isProfileCollapsible ? 'w-20 h-20' : 'w-22 h-22')}
            />
          </Avatar>
        </motion.div>

        <motion.div
          className={cn(
            'flex flex-col',
            isProfileCollapsible ? `gap-1 items-start mr-5 mb-2` : 'gap-4 items-center',
          )}
        >
          <div className={cn(isProfileCollapsible ? 'title2-bold ml-1.5' : 'title1-bold')}>
            {member.name}
          </div>
          <div
            className={cn(
              'flex flex-row items-center gap-1 bg-red-400 rounded-full text-gray-100',
              isProfileCollapsible ? 'px-1 pr-2 py-0.5 text-xs' : 'px-2 pr-4 py-1 text-sm',
            )}
          >
            <img
              src={rocket}
              className={cn(isProfileCollapsible ? 'w-5 h-5' : 'w-7 h-7')}
              alt="rocket"
            />
            <strong>BOOSTING SCORE </strong> {member.boostingScore}
          </div>
        </motion.div>
      </motion.div>

      <Separator
        className={cn('bg-gray-300', isProfileCollapsible ? 'my-2' : '!w-3/5 mx-auto my-7')}
      />

      {/* Task 목록 영역 */}
      <div ref={scrollRef} className="flex flex-col p-2 gap-4 overflow-y-auto flex-grow">
        {columnData.map(({ status, title, tasks: filteredTasks }) => (
          <div key={status} className="bg-gray-100 p-2 border-b-1 border-gray-300">
            <div className="flex flex-row items-center">
              <div className="label1-regular text-gray-500 m-2">{title}</div>
              <div className="flex justify-center items-center bg-gray-300 px-2 py-1 text-sm rounded-md w-6 h-6">
                {filteredTasks.length}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {filteredTasks.map((task) => (
                <TaskCard key={task.taskId} task={task} draggable={false} />
              ))}
            </div>
          </div>
        ))}
        {isFetchingNextPage && <div className="text-center text-gray-500 py-2">Loading...</div>}
      </div>
    </div>
  );
};

export default MemberColumn;
