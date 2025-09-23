import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import pdfurl from '@/shared/assets/pdf-example/ppt-sample.pdf';
import { usePdfStore } from '@/features/task-detail/store/usePdfStore';
import Overlay from '@/features/task-detail/components/PdfOverlay';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useRef } from 'react';
import PdfControlBar from '@/features/task-detail/components/PdfControlBar';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFViewer = () => {
  const {
    pageNumber,
    zoom,
    position,
    isDragging,
    start,
    markers,
    pdfDocument,
    pageSize,

    setNumPages,
    startDrag,
    updatePosition,
    stopDrag,
    addMarker,
    setPdfDocument,
    updatePageSize,
  } = usePdfStore();

  const mouseMoved = useRef(false);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    if (pdfDocument && pageNumber) {
      updatePageSize(pageNumber);
    }
  }, [pdfDocument, pageNumber, updatePageSize]);

  const onMouseDown = (e: React.MouseEvent) => {
    startDrag({ x: e.clientX - position.x, y: e.clientY - position.y });
    mouseMoved.current = false;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    updatePosition({ x: e.clientX - start.x, y: e.clientY - start.y });
    mouseMoved.current = true;
  };

  const onMouseUp = () => {
    stopDrag();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (mouseMoved.current) return;

    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const pdfX = (x / rect.width) * pageSize.width;
    const pdfY = (1 - y / rect.height) * pageSize.height;

    addMarker({
      id: uuidv4(),
      page: pageNumber,
      x: pdfX,
      y: pdfY,
    });

    console.log(`마커 추가됨: ${pageNumber} 페이지의 (${pdfX}, ${pdfY})`);
  };

  return (
    <div className="flex flex-col w-full h-full bg-gray-300">
      <div className="flex-1 flex justify-center items-center overflow-hidden">
        <div
          className={`relative bg-white ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
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
            file={pdfurl}
            onLoadSuccess={(pdf) => {
              onDocumentLoadSuccess(pdf);
              setPdfDocument(pdf);
            }}
          >
            <Page pageNumber={pageNumber} width={pageSize.width} />
          </Document>

          <Overlay
            markers={markers}
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
