import { Button } from '@/shared/components/shadcn/button';
import { Badge } from '@/shared/components/shadcn/badge';
import { Avatar, AvatarFallback } from '@/shared/components/shadcn/avatar';
import { Calendar, MessageCircle, Paperclip, TrashIcon } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Task } from '@/features/task/types/taskTypes';
import { useDeleteTaskMutation } from '@/features/task/hooks/useDeleteTaskMutation';
import { calculateDDay } from '@/shared/utils/dateUtils';
import { generateTags, getColorForTag } from '@/shared/utils/tagUtils';
import { AvatarImage } from '@radix-ui/react-avatar';
import { mockMembers } from '@/shared/data/mockMembers';
import { cn } from '@/shared/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/shadcn/tooltip';

interface TaskCardProps {
  task: Task;
  draggable?: boolean;
}

const TaskCard = ({ task, draggable = false }: TaskCardProps) => {
  const deleteTaskMutation = useDeleteTaskMutation();
  const tags = generateTags(task);

  const sortable = useSortable({
    id: task.id,
    data: { type: 'Task', task },
    disabled: !draggable,
  });

  const style = sortable
    ? { transition: sortable.transition, transform: CSS.Transform.toString(sortable.transform) }
    : undefined;

  const setNodeRef = sortable?.setNodeRef ?? undefined;
  const attributes = sortable?.attributes ?? {};
  const listeners = sortable?.listeners ?? {};
  const isDragging = sortable?.isDragging ?? false;

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
      className={cn(
        'bg-gray-100 shadow-sm p-3 min-h-[165px] flex flex-col rounded-2xl border border-gray-200 transition-shadow relative group',
        'hover:shadow-md',
        draggable ? 'cursor-grab' : 'cursor-default',
      )}
    >
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
          <Badge key={tag} className={cn('text-xs', getColorForTag(tag))}>
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
        <div className="ml-2 ">{calculateDDay(task.dueDate, 'string')}</div>
      </div>

      {/* 담당자, 댓글 수, 파일 수 */}
      <div className="flex justify-between text-xs m-1 mt-3">
        <div className="flex -space-x-2">
          {task.assignees.map((assigneeName) => {
            const member = mockMembers.find((m) => m.name === assigneeName);
            return (
              <TooltipProvider key={assigneeName}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar
                      className={cn(
                        'w-6 h-6 cursor-pointer ring-1 ring-background',
                        member?.backgroundColor,
                      )}
                    >
                      <AvatarFallback>{assigneeName[0]}</AvatarFallback>
                      <AvatarImage src={member?.avatar || ''} />
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>{assigneeName}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
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
