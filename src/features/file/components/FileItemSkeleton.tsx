import { Skeleton } from '@/shared/components/shadcn/skeleton'; // shadcn UI의 Skeleton 컴포넌트

const FileItemSkeleton = () => {
  return (
    <div className="p-4 bg-white rounded-xl animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-10 h-10 bg-gray-200 rounded-md" />

          <div className="space-y-2">
            <Skeleton className="w-32 h-4" />
            <Skeleton className="w-24 h-3" />
          </div>
        </div>

        <Skeleton className="w-20 h-8 rounded-md" />

        <div className="flex items-center gap-3">
          <Skeleton className="w-9 h-9 rounded-md" />
          <Skeleton className="w-9 h-9 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default FileItemSkeleton;
