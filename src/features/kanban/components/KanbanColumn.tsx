import { SortableContext } from '@dnd-kit/sortable';
import type { Column, Task } from '../types/kanbanTypes';
import { useMemo } from 'react';
import { Button } from '@/shared/components/shadcn/button';
import { PlusCircle } from 'lucide-react';
import TaskCard from './TaskCard';
import { useDroppable } from '@dnd-kit/core';
import { useCreateTask } from '../hooks/kanbanQueries';

interface Props {
  column: Column;
  tasks: Task[];
}

function KanbanColumn({ column, tasks }: Props) {
  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);
  const { mutate: createTaskMutation } = useCreateTask();

  const { setNodeRef } = useDroppable({
    id: column.id,
    data: { type: 'Column', column },
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-300 shadow-sm w-[350px] h-[600px] max-h-[600px] rounded-xl flex flex-col"
    >
      <div className="bg-gray-200 shadow-xs text-md h-[60px] rounded-md rounded-b-none p-3 font-bold flex items-center">
        <div className="flex gap-2">
          {column.title}
          <div className="flex justify-center items-center bg-gray-300 px-2 py-1 text-sm rounded-full">
            {tasks.length}
          </div>
        </div>

        {/* 할 일 추가 버튼 (임시) */}
        <Button
          className="flex gap-2 items-center text-gray-100 m-2 justify-center bg-boost-blue hover:bg-boost-blue/90 h-8 ml-auto px-3 py-1 rounded"
          onClick={() => {
            createTaskMutation(column.id);
          }}
        >
          <PlusCircle />할 일 추가
        </Button>
      </div>
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

export default KanbanColumn;
