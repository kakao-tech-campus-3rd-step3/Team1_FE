import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import TaskDetailTopTab from '@/features/task-detail/components/TaskDetailTopTab/TaskDetailTopTab';
import CommentSection from '@/features/task-detail/components/CommentSection/CommentSection';
import { useTaskDetailQuery } from '@/features/task/hooks/useTaskDetailQuery';
import type { CommentUIType } from '@/features/comment/types/commentTypes';
import { fetchFileDownloadUrl } from '@/features/file/api/fileDownloadApi';
import toast from 'react-hot-toast';
import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
import TaskDetailLeftPane from '@/features/task-detail/components/TaskDetailLeftPane';
import type { FileInfo } from '@/features/task-detail/types/taskDetailType';
import { extractPinsFromComments } from '@/features/comment/utils/commentUtils';

const TaskDetailPage = () => {
  const { projectId, taskId } = useParams<{ projectId: string; taskId: string }>();
  const { data: task, isLoading } = useTaskDetailQuery(projectId!, taskId!);
  const { setSelectedFile, setPins, togglePdf } = useTaskDetailStore();

    const handleCommentsFetched = useCallback(
      (comments: CommentUIType[]) => {
        const extractedPins = extractPinsFromComments(comments); 
        setPins(extractedPins);
      },
      [setPins],
    );
  const handleCommentSelect = async (fileInfo: FileInfo | null) => {
    if (!fileInfo?.fileId) return;
    try {
      const downloadResult = await fetchFileDownloadUrl(fileInfo.fileId);
      const clickedFile = task?.files?.find((file) => file.id === fileInfo.fileId);
      if (clickedFile) {
        setSelectedFile({
          fileId: clickedFile.id,
          fileName: clickedFile.filename,
          fileUrl: downloadResult.url,
        });
      } else {
        setSelectedFile(null);
      }
      togglePdf(true);
    } catch (err) {
      console.error('파일 열기 오류:', err);
      toast.error('파일을 여는 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  if (!projectId) return <div className="p-4">프로젝트 ID를 찾을 수 없습니다.</div>;
  if (!taskId) return <div className="p-4">태스크 ID를 찾을 수 없습니다.</div>;
  if (isLoading || !task) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-screen">
      <TaskDetailTopTab task={task} />
      <div className="flex flex-1 overflow-hidden">
        <TaskDetailLeftPane task={task} taskId={taskId} />
        <div id="right" className="w-4/10 bg-gray-200">
          <section id="comment" className="h-[calc(100vh-4rem)]">
            <CommentSection
              projectId={projectId}
              taskId={taskId}
              onCommentsFetched={handleCommentsFetched}
              onCommentSelect={handleCommentSelect}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;
