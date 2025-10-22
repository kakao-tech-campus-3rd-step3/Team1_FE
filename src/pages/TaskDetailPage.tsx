import { useState } from 'react';
import { useParams } from 'react-router-dom';
import TaskDetailTopTab from '@/features/task-detail/components/TaskDetailTopTab';
import TaskDetailContent from '@/features/task-detail/components/TaskDetailContent';
import FileSection from '@/features/task-detail/components/FileSection';
import PDFViewer from '@/features/task-detail/components/PdfViewer';
import CommentSection from '@/features/task-detail/components/CommentSection';
import { useTaskDetailQuery } from '@/features/task/hooks/useTaskDetailQuery';
import type { FileInfo } from '@/features/comment/types/commentTypes';

const TaskDetailPage = () => {
  const { projectId, taskId } = useParams<{ projectId: string; taskId: string }>();
  const { data: task, isLoading } = useTaskDetailQuery(projectId!, taskId!);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [fileInfo, setFileInfo] = useState<FileInfo>({});
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [fileName, setFileName] = useState('');

  if (isLoading || !task) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-screen">
      <TaskDetailTopTab task={task} />
      <div className="flex flex-1 overflow-hidden">
        <div id="left" className="flex flex-col w-6/10 overflow-hidden">
          {isPdfOpen ? (
            <PDFViewer
              pdfUrl={pdfUrl}
              fileId={selectedFileId ?? ''}
              fileName={fileName}
              setFileInfo={setFileInfo}
              onClose={() => setIsPdfOpen(false)}
            />
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
                    setPdfUrl(url);
                    setFileName(name);
                    setSelectedFileId(id);
                    setIsPdfOpen(true);
                  }}
                />
              </section>
            </>
          )}
        </div>

        <div id="right" className="w-4/10 bg-gray-200">
          <section id="comment" className="h-[calc(100vh-4rem)]">
            <CommentSection projectId={projectId ?? ''} taskId={taskId ?? ''} fileInfo={fileInfo} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;
