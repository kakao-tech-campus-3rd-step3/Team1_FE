import type { CommentUIType } from '@/features/comment/types/commentTypes';
import CommentSection from '@/features/task-detail/components/CommentSection/CommentSection';
import type { FileInfo } from '@/features/task-detail/types/taskDetailType';

interface TaskDetailRightPaneProps {
  projectId: string;
  taskId: string;
  onCommentsFetched: (comments: CommentUIType[]) => void;
  onCommentSelect: (fileInfo: FileInfo | null) => void;
}

const TaskDetailRightPane = ({
  projectId,
  taskId,
  onCommentsFetched,
}: TaskDetailRightPaneProps) => {
  return (
    <aside
      id="right-pane"
      className="w-4/10 bg-gray-100 border-l border-gray-300 flex flex-col overflow-hidden"
    >
      <header className="p-3 border-b border-gray-300 bg-gray-50">
        <h2 className="text-base font-semibold text-gray-800">댓글</h2>
      </header>

      <section id="comment" className="flex-1 overflow-y-auto">
        <CommentSection
          projectId={projectId}
          taskId={taskId}
          onCommentsFetched={onCommentsFetched}
        />
      </section>
    </aside>
  );
};
export default TaskDetailRightPane;
