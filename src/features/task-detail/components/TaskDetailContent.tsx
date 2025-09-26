import { generateTags, getColorForTag } from '@/features/kanban/utils/tagUtils';
import { mockTask } from '@/features/task/types/taskTypes';
import { Avatar, AvatarFallback } from '@/shared/components/shadcn/avatar';
import { Badge } from '@/shared/components/shadcn/badge';
import { User, Calendar, Tag, FileText, ChevronUp } from 'lucide-react';
import { calculateDDay } from '@/features/task-detail/util/dDayUtiils';
import TagList from '@/features/task-detail/components/TagList';
import ContentItem from '@/features/task-detail/components/ContentItem';
import { useState } from 'react';

const TaskDetailContent = () => {
  const tags = generateTags(mockTask);
  const dDay = calculateDDay(mockTask.dueDate);
  const [showAllAssignees, setShowAllAssignees] = useState(false);
  const displayedAssignees = showAllAssignees ? mockTask.assignees : mockTask.assignees.slice(0, 2);

  return (
    <div className="h-fit w-full p-5 flex flex-col gap-5 ">
      {/* 담당자 & 마감일 */}
      <div className="flex justify-between mb-4">
        {/* 담당자 */}
        <ContentItem icon={<User className="w-5 h-5 text-xl text-gray-900" />} title="담당자">
          <div className="flex gap-5">
            <div className="grid grid-cols-3 gap-2 overflow-x-auto">
              {displayedAssignees.map((assignee) => (
                <div className="flex items-center gap-2" key={assignee}>
                  <Avatar className="w-9 h-9">
                    <AvatarFallback>{assignee[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{assignee}</span>
                </div>
              ))}
              {/* + 버튼 */}
              {mockTask.assignees.length > 2 && (
                <div>
                  {!showAllAssignees && (
                    <button
                      onClick={() => setShowAllAssignees((prev) => !prev)}
                      className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200  hover:bg-gray-300"
                    >
                      +{mockTask.assignees.length - 2}
                    </button>
                  )}
                </div>
              )}
            </div>
            {showAllAssignees && (
              <button
                onClick={() => setShowAllAssignees((prev) => !prev)}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 text-gray-700 font-bold hover:bg-gray-300"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            )}
          </div>
        </ContentItem>
        {/* 마감일 */}
        <ContentItem icon={<Calendar className="w-5 h-5 text-xl text-gray-900" />} title="마감일">
          <div className="flex items-center gap-2">
            <p>{mockTask.dueDate}</p>
            <Badge className={`text-gray-500 ${getColorForTag('마감일')}`}>{dDay}일 남음</Badge>
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
        <div className="bg-gray-50 w-full p-4 break-words rounded-lg text-sm">
          <p>{mockTask.description}</p>
        </div>
      </ContentItem>
    </div>
  );
};
export default TaskDetailContent;
