import { generateTags, getColorForTag } from '@/features/kanban/utils/tagUtils';
import { mockTask } from '@/features/task/types/taskTypes';
import { Avatar, AvatarFallback } from '@/shared/components/shadcn/avatar';
import { Badge } from '@/shared/components/shadcn/badge';
import { User, Calendar, Tag, FileText } from 'lucide-react';
import { calculateDDay } from '../util/dDayUtiils';
import TagList from './TagList';
import ContentItem from './ContentItem';

const TaskDetailContent = () => {
  const tags = generateTags(mockTask);
  const dDay = calculateDDay(mockTask.dueDate);
  return (
    <div className="h-fit w-full p-5 flex flex-col gap-5 ">
      {/* 담당자&마감일 */}
      <div className="flex gap-38 mb-4">
        {/* 담당자 */}
        <ContentItem icon={<User className="w-5 h-5 text-xl text-gray-900" />} title="담당자">
          <div className="flex items-center gap-2">
            <Avatar key={mockTask.assignees[0]} className="w-6 h-6">
              <AvatarFallback>{mockTask.assignees[0][0]}</AvatarFallback>
            </Avatar>
            <span>{mockTask.assignees}</span>
          </div>
        </ContentItem>
        {/* 마감일 */}
        <ContentItem icon={<Calendar className="w-5 h-5 text-xl text-gray-900" />} title="마감일">
          <div className="flex items-center gap-2">
            <p> {mockTask.dueDate}</p>
            <Badge className={`text-gray-500 ${getColorForTag('마감일')}`}> {dDay}일 남음</Badge>
          </div>
        </ContentItem>
      </div>
      {/* 태그 */}
      <ContentItem icon={<Tag className="w-5 h-5 text-xl text-gray-900" />} title="태그">
        <div className="flex items-center gap-2">
          <TagList tags={tags} />
        </div>
      </ContentItem>
      {/* 작업 설명 */}
      <ContentItem icon={<FileText className="w-5 h-5 text-xl text-gray-900" />} title="작업 설명">
        <div className="bg-gray-50 w-full p-4  break-words rounded-lg  text-sm">
          <p>{mockTask.description}</p>
        </div>
      </ContentItem>
    </div>
  );
};

export default TaskDetailContent;
