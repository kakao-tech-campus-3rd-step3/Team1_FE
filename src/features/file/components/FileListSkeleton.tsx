import FileItemSkeleton from './FileItemSkeleton';

const FileListSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <FileItemSkeleton key={i} />
      ))}
    </div>
  );
};

export default FileListSkeleton;
