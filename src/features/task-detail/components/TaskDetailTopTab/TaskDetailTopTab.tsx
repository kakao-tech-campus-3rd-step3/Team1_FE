import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
import { AssigneeActionButton } from '@/features/task-detail/components/TaskDetailTopTab/AssigneeActionButton';
import { ReviewerActionButton } from '@/features/task-detail/components/TaskDetailTopTab/ReviewerActionButton';
import { useAssigneeTask } from '@/features/task-detail/hooks/useAssigneeTask';
import { useReviewerTask } from '@/features/task-detail/hooks/useReviewerTask';
import type { TaskDetail } from '@/features/task/types/taskTypes';
import { useAiTransformStore } from '@/features/ai-transform/store/useAiTransformStore';

interface TaskDetailTopTabProps {
  task: TaskDetail;
}

const TaskDetailTopTab = ({ task }: TaskDetailTopTabProps) => {
  const navigate = useNavigate();
  const { resetAll } = useTaskDetailStore();
  const currentUser = useAuthStore((state) => state.user);
  const { projectId } = useParams<{ projectId: string }>();
  const resetAiComment = useAiTransformStore((state) => state.reset);

  const isAssignee = task.assignees.some((a) => a.id === currentUser?.id);

  const assigneeTask = useAssigneeTask({
    projectId: projectId!,
    taskId: task.id,
    taskStatus: task.status,
    approvedCount: task.approvedCount,
    requiredReviewerCount: task.requiredReviewerCount,
    reReviewRequestedAt: task.reReviewRequestedAt,
  });

  const reviewerTask = useReviewerTask({
    projectId: projectId!,
    taskId: task.id,
    initialApprovedCount: task.approvedCount,
    requiredReviewerCount: task.requiredReviewerCount,
    initialApprovedByMe: task.approvedByMe,
  });

  const handleBackClick = () => {
    resetAll();
    resetAiComment();
    navigate(-1);
  };

  return (
    <nav className="flex justify-between items-center w-full bg-gray-100 border-b border-gray-300 h-14 px-4">
      <div className="flex items-center gap-3 font-semibold text-lg truncate max-w-xs">
        <ChevronLeft
          size={30}
          strokeWidth={1}
          className="cursor-pointer p-1"
          onClick={() => handleBackClick()}
        />
        {task.title}
      </div>

      {task.requiredReviewerCount > 0 && (
        <>
          {isAssignee ? (
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'rounded-full border h-9 px-4 py-2 flex items-center text-sm font-medium',
                  assigneeTask.getBadgeClass(),
                )}
              >
                받은 검토 수 {assigneeTask.approvedCount}/{task.requiredReviewerCount}
              </div>
              <AssigneeActionButton
                uiStatus={assigneeTask.uiStatus}
                approvedCount={assigneeTask.approvedCount}
                requiredReviewerCount={task.requiredReviewerCount}
                onAction={
                  assigneeTask.approvedCount >= task.requiredReviewerCount
                    ? assigneeTask.handleCompleteTask
                    : assigneeTask.handleAction
                }
              />
            </div>
          ) : (
            assigneeTask.uiStatus === 'REVIEW' && (
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'rounded-full border h-9 px-4 py-2 flex items-center text-sm font-medium',
                    reviewerTask.getBadgeClass(),
                  )}
                >
                  검토 완료 수 {reviewerTask.approvedCount}/{task.requiredReviewerCount}
                </div>
                <ReviewerActionButton
                  isApprovedByMe={reviewerTask.isApprovedByMe}
                  approvedCount={reviewerTask.approvedCount}
                  requiredReviewerCount={task.requiredReviewerCount}
                  onApprove={reviewerTask.handleApprove}
                />
              </div>
            )
          )}
        </>
      )}
    </nav>
  );
};

export default TaskDetailTopTab;
