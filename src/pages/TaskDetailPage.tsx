import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import TaskDetailTopTab from '@/features/task-detail/components/TaskDetailTopTab';
import TaskDetailContent from '@/features/task-detail/components/TaskDetailContent';
import FileSection from '@/features/task-detail/components/FileSection';
import PDFViewer from '@/features/task-detail/components/PdfViewer';
import CommentSection from '@/features/task-detail/components/CommentSection';
import { useTaskDetailQuery } from '@/features/task/hooks/useTaskDetailQuery';
import type { CommentUIType, FileInfo } from '@/features/comment/types/commentTypes';
import { fetchFileDownloadUrl } from '@/features/file/api/fileDownloadApi';

const TaskDetailPage = () => {
  const { projectId, taskId } = useParams<{ projectId: string; taskId: string }>();
  const { data: task, isLoading } = useTaskDetailQuery(projectId!, taskId!);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>({});
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [pins, setPins] = useState<FileInfo[]>([]); // 댓글에서 추출한 핀
  const [currentPin, setCurrentPin] = useState<FileInfo | null>(null);
  // 댓글을 맨 처음 불러왔을 때 핀 정보를 추출해 pins에 저장
  const handleCommentsFetched = useCallback((comments: CommentUIType[]) => {
    const extractedPins = comments.filter((c) => c.fileInfo).map((c) => c.fileInfo as FileInfo);
    setPins(extractedPins);
  }, []);
  // 댓글을 선택하면 PDF 뷰어에서 해당 파일과 핀을 보여줌
  const handleCommentSelect = async (fileInfo: FileInfo | null) => {
    if (!fileInfo?.fileId) return;
    const downloadResult = await fetchFileDownloadUrl(fileInfo.fileId);
    const clickedFile = task?.files?.find((file) => file.id === fileInfo.fileId);
    setPdfUrl(downloadResult.url);
    setFileName(clickedFile ? clickedFile.filename : 'Unknown');
    setSelectedFileId(fileInfo.fileId);
    setIsPdfOpen(true);
    setCurrentPin(fileInfo);
  };

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
              pins={pins}
              currentPin={currentPin}
              setCurrentPin={setCurrentPin}
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
            <CommentSection
              projectId={projectId ?? ''}
              taskId={taskId ?? ''}
              fileInfo={fileInfo}
              setFileInfo={setFileInfo}
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
