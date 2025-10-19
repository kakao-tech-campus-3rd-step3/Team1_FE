import { useState } from 'react';
import { useParams } from 'react-router-dom';
import TaskDetailTopTab from '@/features/task-detail/components/TaskDetailTopTab';
import TaskDetailContent from '@/features/task-detail/components/TaskDetailContent';
import FileSection from '@/features/task-detail/components/FileSection';
import PDFViewer from '@/features/task-detail/components/PdfViewer';
import CommentSection from '@/features/task-detail/components/CommentSection';
import { useTaskDetailQuery } from '@/features/task/hooks/useTaskDetailQuery';

const TaskDetailPage = () => {
  const { projectId, taskId } = useParams<{ projectId: string; taskId: string }>();
  const { data: task, isLoading } = useTaskDetailQuery(projectId!, taskId!);

  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  if (isLoading || !task) return <div>Loading...</div>;
  return (
    <div className="flex flex-col h-screen">
      <TaskDetailTopTab task={task!} />
      <div className="flex flex-1 overflow-hidden">
        <div id="left" className="flex flex-col w-6/10 overflow-hidden">
          {isPdfOpen ? (
            <PDFViewer pdfUrl={pdfUrl} />
          ) : (
            <>
              <section
                id="detail"
                aria-label="할 일 상세 섹션"
                className="h-8/12 overflow-y-scroll"
              >
                <TaskDetailContent task={task} />
              </section>
              <section id="file" aria-label="파일 섹션" className="h-4/12">
                <FileSection
                  files={task.files}
                  taskId={taskId ?? ''}
                  onOpenPdf={(url) => {
                    setPdfUrl(url ?? '');
                    setIsPdfOpen(true);
                  }}
                ></FileSection>
              </section>
            </>
          )}
        </div>
        <div id="right" className="w-4/10 bg-gray-200">
          {/* 📍 TODO: API 호출로 조회한 데이터로 교체 필요함 */}
          <section id="comment" aria-label="댓글 섹션" className="h-[calc(100vh-4rem)]">
            <CommentSection />
          </section>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;
