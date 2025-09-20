import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import pdfurl from '@/shared/assets/pdf-exemple/lorem-ipsum-10pages.pdf';
import { useState } from 'react';
import { Button } from '@/shared/components/shadcn/button';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFPreview = () => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1); // 문서 로드 시 첫 페이지로 초기화
  }

  const goPrevPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const goNextPage = () => {
    if (numPages && pageNumber < numPages) setPageNumber(pageNumber + 1);
  };

  return (
    <div className="flex flex-col bg-gray-300 justify-between gap-4  w-[50rem] h-screen">
      <div className="w-full h-full ">
        <Document className="w-full h-full " file={pdfurl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page className="w-full " pageNumber={pageNumber} />
        </Document>
      </div>

      <div className="flex gap-2 ">
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

export default PDFPreview;
