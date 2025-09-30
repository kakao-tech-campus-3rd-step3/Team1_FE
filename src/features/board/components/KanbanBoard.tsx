import {
  DndContext,
  DragOverlay,
  useSensor,
  PointerSensor,
  useSensors,
  type DragStartEvent,
  type DragOverEvent,
} from '@dnd-kit/core';
import { useState } from 'react';
import type { Task } from '@/features/task/types/taskTypes';
import { createPortal } from 'react-dom';
import TaskCard from '@/features/board/components/TaskCard';
import KanbanColumn from '@/features/board/components/KanbanColumn';
import { useTasksQuery } from '@/features/task/hooks/useTasksQuery';
import { useMoveTaskMutation } from '@/features/task/hooks/useMoveTaskMutation';
import { columnStatus } from '@/features/board/types/boardTypes';

const KanbanBoard = () => {
  const { data: tasks, isLoading, isError } = useTasksQuery();
  const { mutate: moveTaskMutation } = useMoveTaskMutation();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 10 } }));

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !tasks) return <div>할 일을 불러오는 데 실패했습니다.</div>;

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task);
    }
  };

  const onDragEnd = () => {
    setActiveTask(null);
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === 'Task';
    const isOverTask = over.data.current?.type === 'Task';
    const isOverColumn = over.data.current?.type === 'Column';

    if (!isActiveTask) return;

    if (isOverTask || isOverColumn) moveTaskMutation({ activeTaskId: activeId, overId });
  };

  return (
    <div className="flex-1 flex flex-col p-3 overflow-hidden h-full">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="flex gap-3 flex-grow overflow-x-auto overflow-y-hidden items-stretch">
          {columnStatus.map((col) => (
            <KanbanColumn
              key={col.status}
              column={col}
              tasks={tasks.filter((task) => task.status === col.status)}
            />
          ))}
        </div>
        {createPortal(
          <DragOverlay>{activeTask && <TaskCard task={activeTask} />}</DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
