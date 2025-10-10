import type { FileType } from '@/features/file/types/fileTypes';
import pptUrl from '@/shared/assets/images/fileIcon/PPT.png';
import pdfUrl from '@/shared/assets/images/fileIcon/PDF.png';
import csvUrl from '@/shared/assets/images/fileIcon/CSV.png';
type FileIcon = {
  name: string;
  url: string;
};
const fileIcons: FileIcon[] = [
  { name: 'csv', url: csvUrl },
  { name: 'ppt', url: pptUrl },
  { name: 'pdf', url: pdfUrl },
];
export const getFileIcon = (type: string) => {
  const match = fileIcons.find((icon) => icon.name.toLowerCase() === type.toLowerCase());
  return match?.url;
};
export const getFileSize = (files: FileType[]) => {
  return files
    .reduce((acc, file) => {
      const size = parseFloat(file.size);
      return acc + (file.size.includes('MB') ? size : size / 1024);
    }, 0)
    .toFixed(1);
};
