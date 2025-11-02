import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { usePdfStore } from '@/features/task-detail/store/usePdfStore';
import { useEffect, useRef } from 'react';
import { cn } from '@/shared/lib/utils';
import Overlay from '@/features/task-detail/components/PdfViewer/PdfOverlay';
import PdfControlBar from '@/features/task-detail/components/PdfViewer/PdfControlBar';
import { useAuthStore } from '@/features/auth/store/authStore';
import type { PinWithAuthor } from '@/features/task-detail/types/taskDetailType';
import { usePdfDrag } from '@/features/task-detail/hooks/usePdfDrag';
import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFViewer = () => {
  const {
    pageNumber,
    zoom,
    position,
    isDragging,
    pdfDocument,
    pageSize,
    setNumPages,
    setPdfDocument,
    updatePageSize,
  } = usePdfStore();
  const { currentPin, setCurrentPin, selectedFile, togglePdf } = useTaskDetailStore();
  const mouseMoved = useRef(false);
  const { user } = useAuthStore();
  const { onMouseDown, onMouseMove, onMouseUp } = usePdfDrag();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  useEffect(() => {

    if (pdfDocument && pageNumber) {
      updatePageSize(pageNumber);
    }
  }, [pdfDocument, pageNumber, updatePageSize]);

 
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (mouseMoved.current) return;
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const pdfX = (x / rect.width) * pageSize.width;
    const pdfY = (1 - y / rect.height) * pageSize.height;

    if (
      currentPin &&
      Math.abs(currentPin.fileX! - pdfX) < 20 &&
      Math.abs(currentPin.fileY! - pdfY) < 20 &&
      currentPin.filePage === pageNumber
    ) {
      setCurrentPin(null);
      return;
    }

    const newPin: PinWithAuthor = {
      fileId: selectedFile?.fileId ?? '',
      fileName: selectedFile?.fileName ?? '',
      filePage: pageNumber,
      fileX: pdfX,
      fileY: pdfY,
      author: {
        id: user?.id ?? '',
        name: user?.name ?? '익명',
        avatar: user?.avatar ?? '0',
        backgroundColor: user?.backgroundColor ?? '#CCCCCC',
      },
    };

    setCurrentPin(newPin);
  };

  return (
    <div className="flex flex-col w-full h-full bg-gray-300">
      <div className="w-full h-12 flex items-center justify-between te bg-white border-b-gray-400 xt-white px-4">
        <span className="text-sm">{selectedFile?.fileName}</span>
        <button
          onClick={() => togglePdf(false)}
          className="text-sm bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-md transition"
        >
          ← 뒤로가기
        </button>
      </div>
      <div className="flex-1 flex justify-center items-center overflow-hidden">
        <div
          className={cn('relative bg-white', isDragging ? 'cursor-grabbing' : 'cursor-grab')}
          style={{
            width: pageSize.width,
            height: pageSize.height,
            transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          <Document
            file={selectedFile?.fileUrl}
            onLoadSuccess={(pdf) => {
              onDocumentLoadSuccess(pdf);
              setPdfDocument(pdf);
            }}
          >
            <Page pageNumber={pageNumber} width={pageSize.width} />
          </Document>

          <Overlay
            pageNumber={pageNumber}
            zoom={zoom}
            pageSize={pageSize}
            onClick={handleOverlayClick}
          />
        </div>
      </div>
      <PdfControlBar />
    </div>
  );
};

export default PDFViewer;
