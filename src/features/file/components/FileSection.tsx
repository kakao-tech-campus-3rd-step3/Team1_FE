import { useParams } from 'react-router-dom';
import { Loader2, ChevronDown } from 'lucide-react';
import { useProjectFilesQuery } from '@/features/file/hooks/useProjectFilesQuery';
import { Button } from '@/shared/components/shadcn/button';
import { Table } from '@/shared/components/shadcn/table';
import FileTableInfo from '@/features/file/components/FileTableInfo';
import FileTableHeader from '@/features/file/components/FileTableHeader';
import FileTableBody from '@/features/file/components/FileTableBody';
import FileTableEmpty from '@/features/file/components/FileTableEmpty';

const FileSection = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
    useProjectFilesQuery(projectId!);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );

  if (error) return <p className="text-red-500 text-center">파일을 불러오지 못했습니다.</p>;

  const allFiles = data?.pages.flatMap((page) => page.files) ?? [];

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-50 rounded-lg shadow-sm h-full">
      <FileTableInfo files={allFiles} />

      <div className="flex-1 flex flex-col border border-gray-200 rounded-xl shadow-[0_0_6px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="flex-shrink-0">
          <div className="flex-1 overflow-auto border border-gray-200">
            <Table className="min-w-full table-fixed border-collapse">
              <FileTableHeader />
            </Table>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <Table className="min-w-full table-fixed border-collapse">
            {allFiles.length > 0 ? <FileTableBody files={allFiles} /> : <FileTableEmpty />}
          </Table>
        </div>
      </div>

      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <div className="flex items-center gap-2 text-gray-600 bg-white px-6 py-2.5 rounded-full shadow-sm">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm font-medium">불러오는 중...</span>
          </div>
        </div>
      )}

      {hasNextPage && !isFetchingNextPage && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <Button
            onClick={() => fetchNextPage()}
            variant="outline"
            className="group relative px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 bg-white hover:bg-gray-50 border-gray-200"
          >
            <span className="flex items-center gap-2 label1-regular text-gray-700">
              더보기
              <ChevronDown className="w-4 h-4 " />
            </span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileSection;
