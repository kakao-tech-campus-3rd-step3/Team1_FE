type FileModule = { default: string };

export const getFileListUtils = () => {
  const fileModules = import.meta.glob<FileModule>('@/shared/assets/images/fileIcon/*.png', {
    eager: true,
  });
  console.log(Object.values(fileModules).map((module) => module.default));
  return Object.values(fileModules).map((module) => module.default);
};
export const getFileIcon = (type: string) => {
  console.log('타입은 ', type);
  const fileIcons = getFileListUtils();
  const match = fileIcons.find((icon) => {
    const fileName = icon.split('/').pop()?.replace('.png', '').toLowerCase();
    return fileName === type.toLowerCase();
  });
  console.log(match);
  return match;
};
