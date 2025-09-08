import KanbanColumn from './KanbanColumn';
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
import type { Task } from '../types/kanbanTypes';
import { createPortal } from 'react-dom';
import TaskCard from './TaskCard';
import { useTasksQuery, useMoveTask } from '../hooks/kanbanQueries';

function KanbanBoard() {
  const columns = [
    { id: 1, title: '진행 전' },
    { id: 2, title: '진행 중' },
    { id: 3, title: '검토 중' },
    { id: 4, title: '완료' },
  ];

  const { data: tasks, isLoading, isError } = useTasksQuery();
  const { mutate: moveTaskMutation } = useMoveTask();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 10 } }));

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !tasks) return <div>할 일을 불러오는 데 실패했습니다.</div>;

  return (
    <div className="m-auto flex min-h-screen w-full items-center justify-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            {columns.map((col) => (
              <KanbanColumn
                key={col.id}
                column={col}
                tasks={tasks.filter((task) => task.columnId === col.id)}
              />
            ))}
          </div>
        </div>
        {createPortal(
          <DragOverlay>{activeTask && <TaskCard task={activeTask} />}</DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  );

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task);
    }
  }

  function onDragEnd() {
    setActiveTask(null);
  }

  function onDragOver(event: DragOverEvent) {
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
  }
}

export default KanbanBoard;
