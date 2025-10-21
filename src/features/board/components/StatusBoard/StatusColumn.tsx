import { SortableContext } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { useRef } from 'react';
import TaskCard from '@/features/task/components/TaskCard/TaskCard';
import type { Column } from '@/features/task/types/taskTypes';
import { useInfiniteProjectTasksByStatusQuery } from '@/features/task/hooks/useInfiniteProjectTasksByStatusQuery';
import { useInfiniteMyTasksByStatusQuery } from '@/features/task/hooks/useInfiniteMyTasksByStatusQuery';

interface StatusColumnProps {
  column: Column;
  projectId?: string;
}

const StatusColumn = ({ column, projectId }: StatusColumnProps) => {
  const projectTasksQuery = useInfiniteProjectTasksByStatusQuery(projectId ?? '', column.status, {
    enabled: !!projectId,
  });

  const myTasksQuery = useInfiniteMyTasksByStatusQuery(column.status, {
    enabled: !projectId,
  });

  const query = projectId ? projectTasksQuery : myTasksQuery;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = query;

  const tasks = data?.pages.flatMap((page) => page.tasks) || [];
  const sortedTasks = Array.from(new Map(tasks.map((t) => [t.taskId, t])).values()).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
  const tasksIds = sortedTasks.map((task) => task.taskId);

  const { setNodeRef } = useDroppable({
    id: column.status,
    data: { type: 'Column', column },
  });

  const observer = useRef<IntersectionObserver | null>(null);
  const lastTaskRef = (node: HTMLDivElement) => {
    if (isFetchingNextPage) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (node) observer.current.observe(node);
  };

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-200 m-1 shadow-md rounded-xl flex flex-col flex-shrink-0 min-w-[250px] max-w-[350px] flex-1"
    >
      <div className="bg-gray-200 shadow-xs text-md h-[45px] rounded-md p-3 label1-regular flex items-center">
        <div className="flex gap-2 text-gray-600 items-center">
          {column.title}
          <div className="flex justify-center items-center bg-gray-300 px-2 py-1 text-sm rounded-full">
            {sortedTasks.length}
          </div>
        </div>
      </div>

      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {sortedTasks.map((task, idx) => {
            const isLast = idx === sortedTasks.length - 1;
            return (
              <TaskCard
                key={task.taskId}
                task={task}
                draggable
                ref={isLast ? lastTaskRef : null}
                showProjectNameTag={!projectId}
              />
            );
          })}
          {isFetchingNextPage && (
            <div className="text-center text-sm text-gray-500 py-2">Loading...</div>
          )}
        </SortableContext>
      </div>
    </div>
  );
};

export default StatusColumn;
