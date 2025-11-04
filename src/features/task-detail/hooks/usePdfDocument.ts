import { useEffect } from 'react';
import { usePdfStore } from '@/features/task-detail/store/usePdfStore';
import type { PDFDocumentProxy } from 'pdfjs-dist';

export const usePdfDocument = (pdfDocument: PDFDocumentProxy | null, pageNumber: number) => {
  const { setNumPages, updatePageSize, setPdfDocument } = usePdfStore();

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };
  useEffect(() => {
    if (pdfDocument && pageNumber) {
      updatePageSize(pageNumber);
    }
  }, [pdfDocument, pageNumber, updatePageSize]);

  return { onDocumentLoadSuccess, setPdfDocument };
};
