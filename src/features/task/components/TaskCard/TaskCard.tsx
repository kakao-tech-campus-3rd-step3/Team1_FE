import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MessageCircle, Paperclip } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/shared/lib/utils';
import type { TaskListItem } from '@/features/task/types/taskTypes';
import { calculateDDay } from '@/shared/utils/dateUtils';
import TaskTags from '@/features/task/components/TaskCard/TaskTags';
import AssigneesList from '@/features/task/components/TaskCard/AssigneesList';
import { useProjectsStore } from '@/features/project/store/useProjectsStore';
import { ROUTES } from '@/app/routes/Router';

interface TaskCardProps {
  task: TaskListItem;
  draggable?: boolean;
  showProjectNameTag?: boolean;
}

const TaskCard = forwardRef<HTMLDivElement, TaskCardProps>(
  ({ task, draggable = false, showProjectNameTag = false }, ref) => {
    const navigate = useNavigate();

    const rawProjectName = useProjectsStore((state) => state.getProjectName(task.projectId));
    const projectName = showProjectNameTag ? rawProjectName : undefined;

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

    return (
      <div
        onClick={() => navigate(ROUTES.TASK_DETAIL(task.projectId, task.taskId))}
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
        <div className="relative flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <TaskTags task={task} projectName={projectName} />
          </div>
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
              <AssigneesList
                key={assignee.id}
                projectId={task.projectId}
                assigneeId={assignee.id}
              />
            ))}
          </div>

          {/* 댓글 수, 파일 수 */}
          <div className="flex justify-center gap-3 text-gray-600">
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" /> 댓글 {task.commentCount}
            </span>
            <span className="flex items-center gap-1 ">
              <Paperclip className="w-4 h-4" /> 파일 {task.fileCount}
            </span>
          </div>
        </div>
      </div>
    );
  },
);

export default TaskCard;
