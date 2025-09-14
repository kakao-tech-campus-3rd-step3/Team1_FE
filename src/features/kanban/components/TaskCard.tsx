import { Button } from '@/shared/components/shadcn/button';
import { Badge } from '@/shared/components/shadcn/badge';
import { Avatar, AvatarFallback } from '@/shared/components/shadcn/avatar';
import { Calendar, MessageCircle, Paperclip, TrashIcon } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Task } from '@/features/task/types/taskTypes';
import { useDeleteTaskMutation } from '@/features/task/hooks/useDeleteTaskMutation';
import { getDDay } from '@/shared/utils/dateUtils';
import { generateTags, getColorForTag } from '@/features/kanban/utils/tagUtils';

interface Props {
  task: Task;
}

const TaskCard = ({ task }: Props) => {
  const deleteTaskMutation = useDeleteTaskMutation();
  const tags = generateTags(task);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-50 bg-gray-100 p-3 min-h-[180px] flex flex-col rounded-xl 
        border-2 border-boost-blue cursor-grab relative"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-gray-100 shadow-sm p-3 min-h-[165px] flex flex-col rounded-2xl border border-gray-200 hover:shadow-md transition-shadow cursor-grab relative group"
    >
      {/* 할 일 삭제 버튼 (임시) */}
      <Button
        onClick={(e) => {
          e.stopPropagation();
          deleteTaskMutation.mutate(task.id);
        }}
        className="stroke-gray-100 absolute right-3 top-3 bg-boost-blue p-2 rounded-full opacity-0 group-hover:opacity-80 hover:opacity-100 hover:bg-boost-blue-dark transition-opacity z-10"
        size="icon"
      >
        <TrashIcon />
      </Button>

      {/* 태그들 */}
      <div className="flex flex-wrap gap-1 m-1">
        {tags.map((tag) => (
          <Badge key={tag} className={`text-xs ${getColorForTag(tag)}`}>
            {tag}
          </Badge>
        ))}
      </div>

      {/* 할 일 제목 */}
      <div className="flex items-center gap-2 m-2">
        <span className="title2-bold">{task.title}</span>
      </div>

      {/* 마감일, 디데이 */}
      <div className="flex items-center justify-between m-1 text-sm">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          {task.dueDate}
        </div>
        <div className="ml-2 ">{getDDay(task.dueDate)}</div>
      </div>

      {/* 담당자, 댓글 수, 파일 수 */}
      <div className="flex justify-between text-xs m-1 mt-3">
        <div className="flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale">
          {task.assignees.map((name) => (
            <Avatar key={name} className="w-6 h-6">
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        <div className="flex justify-center gap-3 text-gray-600">
          <span className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" /> 댓글 {task.comments}
          </span>
          <span className="flex items-center gap-1 ">
            <Paperclip className="w-4 h-4" /> 파일 {task.files}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
