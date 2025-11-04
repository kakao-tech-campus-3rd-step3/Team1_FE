import { useParams } from 'react-router-dom';
import { useProjectFilesQuery } from '@/features/file/hooks/useProjectFilesQuery';
import FileHeader from '@/features/file/components/FileHeader';
import FileList from '@/features/file/components/FileList';
import { Loader2, ChevronDown } from 'lucide-react';
import { Button } from '@/shared/components/shadcn/button';
import FileListSkeleton from '@/features/file/components/FileListSkeleton';

const FileSection = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
    useProjectFilesQuery(projectId!);

  if (isLoading) {
    return <FileListSkeleton />;
  }

  if (error) {
    return <p className="text-red-500 text-center">파일을 불러오지 못했습니다.</p>;
  }

  const allFiles = data?.pages.flatMap((page) => page.files) ?? [];
  return (
    <div className="flex min-h-screen flex-col space-y-4 p-4 bg-gray-50 rounded-lg shadow-sm">
      <FileHeader />

      <FileList files={allFiles} />

      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <div className="flex items-center gap-2 text-gray-600 bg-white px-6 py-2.5 rounded-full shadow-sm">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm font-medium">불러오는 중...</span>
          </div>
        </div>
      )}

      {hasNextPage && !isFetchingNextPage && (
        <div className="flex justify-center  pt-3 pb-7">
          <Button
            onClick={() => fetchNextPage()}
            variant="outline"
            className="group relative px-6 py-5 rounded-full shadow-sm hover:shadow-md transition-all duration-200 bg-white hover:bg-gray-50 border-gray-200"
          >
            <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
              더보기
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" />
            </span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileSection;
