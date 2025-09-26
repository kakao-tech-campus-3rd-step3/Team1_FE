import FileSection from '@/features/task-detail/components/FileSection';
import PDFViewer from '@/features/task-detail/components/PdfViewer';
import TaskDetailTobTab from '@/features/task-detail/components/TaskDetailTopTab';
import { mockTask } from '@/features/task/types/taskTypes';
import { useState } from 'react';
import TaskDetailContent from '@/features/task-detail/components/TaskDetailContent';

const TaskDetailPage = () => {
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <TaskDetailTobTab task={mockTask} />
      <div className="flex flex-1 overflow-hidden">
        <div id="left" className="flex flex-col w-6/10 overflow-hidden">
          {isPdfOpen ? (
            <PDFViewer />
          ) : (
            <>
              <section
                id="detail"
                aria-label="할 일 상세 섹션"
                className="h-8/12  overflow-y-scroll"
              >
                <TaskDetailContent />
              </section>
              <section id="file" aria-label="파일 섹션" className="h-4/12 bg-gray-400">
                <FileSection onOpenPdf={() => setIsPdfOpen(true)} />
              </section>
            </>
          )}
        </div>
        <div id="right" className="w-4/10 bg-gray-200">
          <section id="comment" aria-label="댓글 섹션">
            댓글 섹션
          </section>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;
