import type { FileInfo } from '@/features/comment/types/commentTypes';

export interface PDFViewerProps {
  pdfUrl: string;
  fileName: string;
  fileId: string;
  setFileInfo: (fileInfo: FileInfo) => void;
  onClose: () => void;
  pins: FileInfo[];
  currentPin: FileInfo | null;
  setCurrentPin: (pin: FileInfo | null) => void;
}
