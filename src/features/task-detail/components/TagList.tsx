import { getColorForTag } from '@/features/kanban/utils/tagUtils';
import type { Task } from '@/features/task/types/taskTypes';
import { Badge } from '@/shared/components/shadcn/badge';

const TagList = ({ tags }: { tags: Task['tags'] }) => {
  return (
    <>
      {tags.map((tag) => (
        <Badge key={tag} className={`text-gray-500 ${getColorForTag(tag)}`}>
          {tag}
        </Badge>
      ))}
    </>
  );
};

export default TagList;
