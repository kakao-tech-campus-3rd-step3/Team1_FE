import type { FileType } from '@/features/file/types/fileTypes';

type FileModule = { default: string };

export const getFileListUtils = () => {
  const fileModules = import.meta.glob<FileModule>('@/shared/assets/images/fileIcon/*.png', {
    eager: true,
  });
  return Object.values(fileModules).map((module) => module.default);
};
export const getFileIcon = (type: string) => {
  const fileIcons = getFileListUtils();
  return fileIcons.find(
    (icon) =>
      icon
        .split('/')
        .pop()
        ?.replace(/\.png$/i, '')
        .toLowerCase() === type.toLowerCase(),
  );
};
export const getFileSize = (files: FileType[]) => {
  return files
    .reduce((acc, file) => {
      const size = parseFloat(file.size);
      return acc + (file.size.includes('MB') ? size : size / 1024);
    }, 0)
    .toFixed(1);
};
