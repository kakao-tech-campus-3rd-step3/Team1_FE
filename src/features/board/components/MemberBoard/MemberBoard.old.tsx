// import TeamMemberColumn from '@/features/board/components/TeamMemberColumn';
// import { useInfiniteTasksByStatusQuery } from '@/features/task/hooks/useInfiniteTasksByStatusQuery.ts';
// import { useMemo, useRef, useState, useEffect } from 'react';
// import { mockMembers } from '@/shared/data/mockMembers';
// import DoneColumn from '@/features/board/components/DoneColumn';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// const TeamMemberBoard = () => {
//   const { data: tasks, isLoading, isError } = useInfiniteTasksByStatusQuery();
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(false);
//   const [isBoardHover, setIsBoardHover] = useState(false);

//   const tasksByMember = useMemo(() => {
//     if (!tasks) return {};
//     const map: Record<string, typeof tasks> = {};
//     tasks.forEach((task) => {
//       task.assignees.forEach((member) => {
//         if (!map[member]) map[member] = [];
//         map[member].push(task);
//       });
//     });
//     return map;
//   }, [tasks]);

//   const doneTasks = useMemo(() => (tasks ? tasks.filter((t) => t.status === 'DONE') : []), [tasks]);

//   const scroll = (direction: 'left' | 'right') => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({
//         left: direction === 'left' ? -1000 : 1000,
//         behavior: 'smooth',
//       });
//     }
//   };

//   const checkScroll = () => {
//     if (!scrollRef.current) return;

//     const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
//     setCanScrollLeft(scrollLeft > 0);
//     setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
//   };

//   useEffect(() => {
//     checkScroll();
//     const currentRef = scrollRef.current;
//     currentRef?.addEventListener('scroll', checkScroll);
//     window.addEventListener('resize', checkScroll);

//     return () => {
//       currentRef?.removeEventListener('scroll', checkScroll);
//       window.removeEventListener('resize', checkScroll);
//     };
//   }, [tasks]);

//   if (isLoading) return <div>로딩 중...</div>;
//   if (isError || !tasks) return <div>할 일을 불러오는 데 실패했습니다.</div>;

//   return (
//     <div
//       className="relative w-full h-full"
//       onMouseEnter={() => setIsBoardHover(true)}
//       onMouseLeave={() => setIsBoardHover(false)}
//     >
//       {/* 가로 스크롤 버튼들 */}
//       {isBoardHover && canScrollLeft && (
//         <button
//           onClick={() => scroll('left')}
//           className="fixed ml-18 mt-18 left-4 top-1/2 transform -translate-y-1/2 z-50 p-2 bg-gray-300/60 hover:bg-gray-300 rounded-full shadow-md"
//         >
//           <ChevronLeft />
//         </button>
//       )}

//       {isBoardHover && canScrollRight && (
//         <button
//           onClick={() => scroll('right')}
//           className="fixed mr-2 mt-18 right-4 top-1/2 transform -translate-y-1/2 z-50 p-2 bg-gray-200/70 hover:bg-gray-300 rounded-full shadow-md"
//         >
//           <ChevronRight />
//         </button>
//       )}

//       {/* 컬럼 */}
//       <div ref={scrollRef} className="overflow-x-auto overflow-y-hidden h-full py-2 px-1">
//         <div className="flex gap-3 min-w-max h-full items-stretch">
//           {/* 팀원 컬럼 */}
//           {mockMembers.map((member) => {
//             const memberTasks = tasksByMember[member.name] || [];
//             const activeTasks = memberTasks.filter((t) => t.status !== 'DONE');
//             return <TeamMemberColumn key={member.id} member={member} tasks={activeTasks} />;
//           })}
//           {/* 진행 완료 컬럼 */}
//           <DoneColumn tasks={doneTasks} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeamMemberBoard;
