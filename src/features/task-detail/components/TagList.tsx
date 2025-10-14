import { getColorForTag } from '@/shared/utils/tagUtils';
import type { Task } from '@/features/task/types/taskTypes';
import { Badge } from '@/shared/components/shadcn/badge';
import { cn } from '@/shared/lib/utils';

const TagList = ({ tags }: { tags: Task['tags'] }) => {
  return (
    <>
      {tags.map((tag) => (
        <Badge key={tag} className={cn('text-gray-500', getColorForTag(tag))}>
          {tag}
        </Badge>
      ))}
    </>
  );
};

export default TagList;
