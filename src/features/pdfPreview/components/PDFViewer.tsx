import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import pdfurl from '@/shared/assets/pdf-exemple/lorem-ipsum-10pages.pdf';
import { useRef, useState } from 'react';
import { Button } from '@/shared/components/shadcn/button';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFViewer = () => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const overlayRef = useRef<HTMLCanvasElement>(null);

  const A4_WIDTH = 580;
  const A4_HEIGHT = A4_WIDTH * 1.414; // 약 1131
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1); // 문서 로드 시 첫 페이지로 초기화
  }
  const handleCanvasClick = (e: React.MouseEvent) => {
    const canvas = overlayRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    //pdf 좌표 변환

    const pdfX = x / canvas.width;
    const pdfY = y / canvas.height;

    console.log(`클릭함: ${pageNumber} 페이지의 (${pdfX}, ${pdfY})`);
  };
  const goPrevPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const goNextPage = () => {
    if (numPages && pageNumber < numPages) setPageNumber(pageNumber + 1);
  };

  return (
    <div className="relative w-[50rem] flex flex-col items-center p-4">
      <div
        className="relative"
        style={{ width: A4_WIDTH, height: A4_HEIGHT }} // Page 크기와 동일
      >
        <Document file={pdfurl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page width={A4_WIDTH} pageNumber={pageNumber} />
        </Document>

        <canvas
          ref={overlayRef}
          width={A4_WIDTH}
          height={A4_HEIGHT}
          className="absolute top-0 left-0 z-10"
          onClick={handleCanvasClick}
        />
      </div>

      <div className="flex gap-2 mt-4 items-center justify-center">
        <Button onClick={goPrevPage} disabled={pageNumber <= 1}>
          이전 페이지
        </Button>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <Button onClick={goNextPage} disabled={numPages ? pageNumber >= numPages : true}>
          다음 페이지
        </Button>
      </div>
    </div>
  );
};

export default PDFViewer;
