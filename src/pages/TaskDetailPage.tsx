import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import TaskDetailTopTab from '@/features/task-detail/components/TaskDetailTopTab/TaskDetailTopTab';
import TaskDetailContent from '@/features/task-detail/components/TaskDetailContent/TaskDetailContent';
import FileSection from '@/features/task-detail/components/FileSection/FileSection';
import PDFViewer from '@/features/task-detail/components/PdfViewer/PdfViewer';
import CommentSection from '@/features/task-detail/components/CommentSection/CommentSection';
import { useTaskDetailQuery } from '@/features/task/hooks/useTaskDetailQuery';
import type { CommentUIType, FileInfo, PinWithAuthor } from '@/features/comment/types/commentTypes';
import { fetchFileDownloadUrl } from '@/features/file/api/fileDownloadApi';
import toast from 'react-hot-toast';
import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';

const TaskDetailPage = () => {
  const { projectId, taskId } = useParams<{ projectId: string; taskId: string }>();
  const { data: task, isLoading } = useTaskDetailQuery(projectId!, taskId!);
  const { setSelectedFile, isPdfOpen, setPins, togglePdf } = useTaskDetailStore();

  const handleCommentsFetched = useCallback(
    (comments: CommentUIType[]) => {
      const extractedPins = comments
        .filter((c) => c.fileInfo)
        .map((c) => ({
          ...(c.fileInfo as FileInfo),
          author: {
            id: c.authorInfo.id,
            name: c.authorInfo.name,
            avatar: c.authorInfo.avatar,
            backgroundColor: c.authorInfo.backgroundColor,
          },
        })) as PinWithAuthor[];

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

  if (isLoading || !task) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-screen">
      <TaskDetailTopTab task={task} />
      <div className="flex flex-1 overflow-hidden">
        <div id="left" className="flex flex-col w-6/10 overflow-hidden">
          {isPdfOpen ? (
            <PDFViewer />
          ) : (
            <>
              <section id="detail" className="h-8/12 overflow-y-scroll">
                <TaskDetailContent task={task} />
              </section>

              <section id="file" className="h-4/12">
                <FileSection
                  files={task.files}
                  taskId={taskId ?? ''}
                  onOpenPdf={(url, name, id) => {
                    setSelectedFile({ fileId: id, fileName: name, fileUrl: url });
                    togglePdf(true);
                  }}
                />
              </section>
            </>
          )}
        </div>

        <div id="right" className="w-4/10 bg-gray-200">
          <section id="comment" className="h-[calc(100vh-4rem)]">
            <CommentSection
              projectId={projectId ?? ''}
              taskId={taskId ?? ''}
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
