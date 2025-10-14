import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components/shadcn/button';
import { ChevronLeft } from 'lucide-react';
import type { Task } from '@/features/task/types/taskTypes';
import { cn } from '@/shared/lib/utils';

interface TaskDetailTopTabProps {
  task: Task;
}

const TaskDetailTopTab = ({ task }: TaskDetailTopTabProps) => {
  const navigate = useNavigate();
  const [review, setReview] = useState(task.review);

  const [isMyReviewed, setIsMyReviewed] = useState(false);

  const handleReviewComplete = () => {
    if (isMyReviewed) return;

    const updatedApproved = review.approvedCount + 1;
    const updatedPending = Math.max(review.requiredReviewCount - updatedApproved, 0);

    setReview((prevReview) => ({
      ...prevReview,
      approvedCount: updatedApproved,
      pendingCount: updatedPending,
      isCompleted: updatedApproved >= review.requiredReviewCount,
    }));

    setIsMyReviewed(true);
  };

  return (
    <nav className="flex flex-row items-center gap-3 justify-between w-full bg-gray-100 border-b border-gray-300 subtitle2-bold">
      <div className="flex flex-row items-center gap-3">
        <ChevronLeft
          size={30}
          strokeWidth={1}
          className="h-12 ml-1 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <div>{task.title}</div>
      </div>

      <div className="flex flex-row items-center gap-3 mr-4  cursor-default">
        <div
          className={cn(
            'rounded-full border h-9 px-4 py-2',
            isMyReviewed
              ? 'border-green-600 bg-green-100 text-green-700'
              : 'border-boost-blue-pressed bg-boost-blue/10 text-boost-blue-dark',
          )}
        >
          검토 완료 수 {review.approvedCount}/{review.requiredReviewCount}
        </div>
        <Button
          onClick={handleReviewComplete}
          className={cn(
            'rounded-md',
            isMyReviewed
              ? 'bg-green-600 hover:bg-green-600'
              : 'bg-boost-blue hover:bg-boost-blue-hover',
          )}
        >
          {isMyReviewed ? '검토 완료됨' : '검토 완료하기'}
        </Button>
      </div>
    </nav>
  );
};

export default TaskDetailTopTab;
