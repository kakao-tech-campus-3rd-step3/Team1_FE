import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  type DragStartEvent,
  type DragOverEvent,
} from '@dnd-kit/core';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import TaskCard from '@/features/task/components/TaskCard/TaskCard';
import StatusColumn from '@/features/board/components/StatusBoard/StatusColumn';
import { useMoveTaskMutation } from '@/features/task/hooks/useMoveTaskMutation';
import { columnStatus } from '@/features/board/types/boardTypes';
import type { TaskListItem } from '@/features/task/types/taskTypes';
import { useInfiniteProjectTasksByStatusQuery } from '@/features/task/hooks/useInfiniteProjectTasksByStatusQuery';
import { useInfiniteMyTasksByStatusQuery } from '@/features/task/hooks/useInfiniteMyTasksByStatusQuery';

interface StatusBoardProps {
  projectId?: string;
}

const StatusBoard = ({ projectId }: StatusBoardProps) => {
  const [activeTask, setActiveTask] = useState<TaskListItem | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 10 } }));
  const moveTaskMutation = useMoveTaskMutation();

  const projectQueryOptions = { enabled: !!projectId };
  const myTaskQueryOptions = { enabled: !projectId };

  const queryTODO = useInfiniteProjectTasksByStatusQuery(
    projectId ?? '',
    'TODO',
    projectQueryOptions,
  );
  const queryPROGRESS = useInfiniteProjectTasksByStatusQuery(
    projectId ?? '',
    'PROGRESS',
    projectQueryOptions,
  );
  const queryREVIEW = useInfiniteProjectTasksByStatusQuery(
    projectId ?? '',
    'REVIEW',
    projectQueryOptions,
  );
  const queryDONE = useInfiniteProjectTasksByStatusQuery(
    projectId ?? '',
    'DONE',
    projectQueryOptions,
  );

  const queryMyTODO = useInfiniteMyTasksByStatusQuery('TODO', myTaskQueryOptions);
  const queryMyPROGRESS = useInfiniteMyTasksByStatusQuery('PROGRESS', myTaskQueryOptions);
  const queryMyREVIEW = useInfiniteMyTasksByStatusQuery('REVIEW', myTaskQueryOptions);
  const queryMyDONE = useInfiniteMyTasksByStatusQuery('DONE', myTaskQueryOptions);

  const columnsData = [
    { status: 'TODO', query: projectId ? queryTODO : queryMyTODO },
    { status: 'PROGRESS', query: projectId ? queryPROGRESS : queryMyPROGRESS },
    { status: 'REVIEW', query: projectId ? queryREVIEW : queryMyREVIEW },
    { status: 'DONE', query: projectId ? queryDONE : queryMyDONE },
  ];

  const lastMoveRef = useRef<{ activeId: string; toStatus: string } | null>(null);

  const onDragStart = (event: DragStartEvent) => {
    const activeData = event.active.data.current;
    if (activeData?.type === 'Task') {
      setActiveTask(activeData.task);
    }
  };

  const onDragEnd = () => {
    setActiveTask(null);
    lastMoveRef.current = null;
  };

  const onDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;

    const activeTask = active.data.current?.task as TaskListItem | undefined;
    const overData = over.data.current;
    if (!activeTask || active.id === over.id) return;

    const toStatus =
      overData?.type === 'Task'
        ? overData.task.status
        : overData?.type === 'Column'
          ? overData.column.status
          : undefined;
    if (!toStatus) return;

    if (
      lastMoveRef.current &&
      lastMoveRef.current.activeId === active.id &&
      lastMoveRef.current.toStatus === toStatus
    ) {
      return;
    }

    if (activeTask.status === toStatus) return;

    lastMoveRef.current = { activeId: active.id as string, toStatus };

    moveTaskMutation.mutate({
      projectId: activeTask.projectId,
      activeTaskId: active.id as string,
      fromStatus: activeTask.status,
      toStatus,
      overId: overData?.type === 'Task' ? (over.id as string) : undefined,
      queryIdentifier: projectId || 'me',
    });
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
          {columnsData.map(({ status, query }) => {
            if (query.isLoading)
              return <ColumnFallback key={status} status={status} state="loading" />;
            if (query.isError || !query.data)
              return <ColumnFallback key={status} status={status} state="error" />;

            const column = columnStatus.find((c) => c.status === status)!;
            return <StatusColumn key={status} column={column} projectId={projectId} />;
          })}
        </div>

        {createPortal(
          <DragOverlay>
            {activeTask && <TaskCard task={activeTask} showProjectNameTag={!projectId} />}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  );
};

const ColumnFallback = ({ status, state }: { status: string; state: 'loading' | 'error' }) => {
  const message = state === 'loading' ? '로딩 중...' : '불러오기 실패';
  return (
    <div
      key={status}
      className="flex-1 min-w-[300px] flex items-center justify-center bg-gray-50 rounded-lg text-gray-500"
    >
      {message}
    </div>
  );
};

export default StatusBoard;
