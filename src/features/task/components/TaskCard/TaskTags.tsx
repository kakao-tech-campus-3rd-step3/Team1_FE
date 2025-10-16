import { Badge } from '@/shared/components/shadcn/badge';
import { cn } from '@/shared/lib/utils';
import { generateTags, getColorForTag } from '@/shared/utils/tagUtils';
import type { TaskListItem } from '@/features/task/types/taskTypes';

interface TaskTagsProps {
  task: TaskListItem;
}

const TaskTags = ({ task }: TaskTagsProps) => {
  const tags = generateTags(task);
  return (
    <div className="flex flex-wrap gap-1 m-1">
      {tags.map((tag) => (
        <Badge key={tag} className={cn('text-xs', getColorForTag(tag))}>
          {tag}
        </Badge>
      ))}
    </div>
  );
};

export default TaskTags;
