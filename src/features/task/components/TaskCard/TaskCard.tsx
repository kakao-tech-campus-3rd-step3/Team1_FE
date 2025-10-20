import { forwardRef } from 'react';
import { useNavigate } from 'react-router';
import { Calendar, TrashIcon } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/shared/components/shadcn/button';
import { cn } from '@/shared/lib/utils';
import type { TaskListItem } from '@/features/task/types/taskTypes';
import { useDeleteTaskMutation } from '@/features/task/hooks/useDeleteTaskMutation';
import { calculateDDay } from '@/shared/utils/dateUtils';
import TaskTags from '@/features/task/components/TaskCard/TaskTags';
import AssigneesList from '@/features/task/components/TaskCard/AssigneesList';

interface TaskCardProps {
  task: TaskListItem;
  draggable?: boolean;
}

const TaskCard = forwardRef<HTMLDivElement, TaskCardProps>(({ task, draggable = false }, ref) => {
  const deleteTaskMutation = useDeleteTaskMutation(task.projectId);
  const navigate = useNavigate();

  const sortable = useSortable({
    id: task.taskId,
    data: { type: 'Task', task },
    disabled: !draggable,
  });

  const style = {
    transition: sortable.transition,
    transform: CSS.Transform.toString(sortable.transform),
  };

  const setNodeRef = (node: HTMLDivElement | null) => {
    sortable.setNodeRef(node);
    if (ref) {
      if (typeof ref === 'function') ref(node);
      else ref.current = node;
    }
  };

  const { attributes, listeners, isDragging } = sortable;

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-50 bg-gray-100 p-3 min-h-[180px] flex flex-col rounded-xl border-2 border-boost-blue cursor-grab relative"
      />
    );
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    // 📍 TODO: 할 일 삭제 확인용 모달 구현 필요
    if (window.confirm('정말 이 할 일을 삭제하시겠습니까?')) {
      deleteTaskMutation.mutate({ taskId: task.taskId, status: task.status });
    }
  };

  return (
    <div
      onClick={() => navigate(`/project/${task.projectId}/tasks/${task.taskId}`)}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        'bg-gray-100 shadow-sm p-3 min-h-[165px] flex flex-col rounded-2xl border border-gray-200 transition-shadow relative group',
        'hover:shadow-md',
        draggable ? 'cursor-grab' : 'cursor-default',
      )}
    >
      {/* 삭제 버튼 + 태그 */}
      <div className="relative">
        <Button
          onClick={handleDelete}
          className="stroke-gray-100 absolute right-3 top-3 bg-boost-blue p-2 rounded-full opacity-0 group-hover:opacity-80 hover:opacity-100 hover:bg-boost-blue-dark transition-opacity z-10"
          size="icon"
        >
          <TrashIcon />
        </Button>
        <TaskTags task={task} />
      </div>

      {/* 할 일 제목 */}
      <div className="flex items-center gap-2 m-2">
        <span className="title2-bold">{task.title}</span>
      </div>

      {/* 마감일, 디데이 */}
      <div className="flex items-center justify-between m-1 text-sm">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          {task.dueDate || '-'}
        </div>
        <div className="ml-2">{task.dueDate ? calculateDDay(task.dueDate, 'string') : '-'}</div>
      </div>

      {/* 담당자 목록 */}
      <div className="flex justify-between text-xs m-1 mt-3">
        <div className="flex -space-x-2">
          {task.assignees?.map((assignee) => (
            <AssigneesList key={assignee.id} assigneeId={assignee.id} />
          ))}
        </div>
      </div>

      {/*📍 TODO: 댓글, 파일 필드 추가 후 구현 */}
      {/* <div className="flex justify-center gap-3 text-gray-600">
          <span className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" /> 댓글 {task.comments}
          </span>
          <span className="flex items-center gap-1 ">
            <Paperclip className="w-4 h-4" /> 파일 {task.files}
          </span>
        </div> */}
    </div>
  );
});

export default TaskCard;
