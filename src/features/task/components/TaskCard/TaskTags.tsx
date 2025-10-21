import { Badge } from '@/shared/components/shadcn/badge';
import { cn } from '@/shared/lib/utils';
import { generateTags, getColorForTag } from '@/shared/utils/tagUtils';
import type { TaskListItem } from '@/features/task/types/taskTypes';

interface TaskTagsProps {
  task: TaskListItem;
  projectName?: string;
}

const TaskTags = ({ task, projectName }: TaskTagsProps) => {
  const tags = generateTags(task);

  return (
    <div className="flex flex-wrap gap-1 m-1">
      {/* 프로젝트 이름 태그 */}
      {projectName && (
        <Badge className={cn('text-xs bg-gray-200 text-gray-700')}>{projectName}</Badge>
      )}

      {/* 기존 태그 */}
      {tags.map((tag) => (
        <Badge key={tag} className={cn('text-xs', getColorForTag(tag))}>
          {tag}
        </Badge>
      ))}
    </div>
  );
};

export default TaskTags;
