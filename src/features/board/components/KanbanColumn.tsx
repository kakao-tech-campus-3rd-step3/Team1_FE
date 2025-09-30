import { SortableContext } from '@dnd-kit/sortable';
import type { Column, Task } from '@/features/task/types/taskTypes';
import { useMemo } from 'react';
import TaskCard from '@/features/board/components/TaskCard';
import { useDroppable } from '@dnd-kit/core';

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
}

const KanbanColumn = ({ column, tasks }: KanbanColumnProps) => {
  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const { setNodeRef } = useDroppable({
    id: column.status,
    data: { type: 'Column', column },
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-200 m-1 shadow-md rounded-xl flex flex-col flex-shrink-0 min-w-[250px] max-w-[350px] flex-1"
    >
      <div className="bg-gray-200 shadow-xs text-md h-[45px] rounded-md p-3 label1-regular flex items-center">
        <div className="flex gap-2 text-gray-600 items-center">
          {column.title}
          <div className="flex justify-center items-center bg-gray-300 px-2 py-1 text-sm rounded-full">
            {tasks.length}
          </div>
        </div>
      </div>
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} draggable={true} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default KanbanColumn;
