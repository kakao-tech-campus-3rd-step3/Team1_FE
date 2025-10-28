import { getColorForTag } from '@/shared/utils/tagUtils';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/shadcn/avatar';
import { Badge } from '@/shared/components/shadcn/badge';
import { User, Calendar, Tag, FileText, ChevronUp } from 'lucide-react';
import { calculateDDay } from '@/shared/utils/dateUtils';
import ContentItem from '@/features/task-detail/components/ContentItem';
import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import type { TaskDetail } from '@/features/task/types/taskTypes';
import TaskTags from '@/features/task/components/TaskCard/TaskTags';
import { getAvatarSrc } from '@/features/avatar-picker/utils/avatarUtils';

interface TaskDetailContentProps {
  task: TaskDetail;
}

const TaskDetailContent = ({ task }: TaskDetailContentProps) => {
  const [showAllAssignees, setShowAllAssignees] = useState(false);
  const displayedAssignees = showAllAssignees ? task.assignees : task.assignees.slice(0, 2);

  return (
    <div className="h-fit w-full p-5 flex flex-col gap-5">
      {/* 담당자 & 마감일 */}
      <div className="flex justify-between mb-4">
        {/* 담당자 */}
        <ContentItem icon={<User className="w-5 h-5 text-xl text-gray-900" />} title="담당자">
          <div className="flex gap-5">
            <div className="grid grid-cols-3 gap-2 overflow-x-auto">
              {displayedAssignees.map((assignee) => {
                return (
                  <div className="flex items-center gap-2" key={assignee.id}>
                    <Avatar className="flex items-center justify-center w-9 h-9 bg-boost-yellow">
                      <AvatarImage
                        src={getAvatarSrc(assignee)}
                        alt={assignee.name}
                        className="w-8 h-8"
                      />
                      <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{assignee.name}</span>
                  </div>
                );
              })}

              {/* + 버튼 */}
              {task.assignees.length > 2 && !showAllAssignees && (
                <button
                  onClick={() => setShowAllAssignees(true)}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300"
                >
                  +{task.assignees.length - 2}
                </button>
              )}
            </div>

            {showAllAssignees && (
              <button
                onClick={() => setShowAllAssignees(false)}
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
            <p>{task.dueDate}</p>
            <Badge className={cn('text-gray-500', getColorForTag('마감일'))}>
              {calculateDDay(task.dueDate, 'text')}
            </Badge>
          </div>
        </ContentItem>
      </div>

      {/* 태그 */}
      <ContentItem icon={<Tag className="w-5 h-5 text-xl text-gray-900" />} title="태그">
        <div className="flex items-center gap-2">
          <TaskTags task={task} />
        </div>
      </ContentItem>

      {/* 작업 설명 */}
      <ContentItem icon={<FileText className="w-5 h-5 text-xl text-gray-900" />} title="작업 설명">
        <div className="bg-gray-50 w-full p-4 break-words rounded-lg text-sm">
          <p>{task.description}</p>
        </div>
      </ContentItem>
    </div>
  );
};

export default TaskDetailContent;
