import { TableHeader, TableRow, TableHead } from '@/shared/components/shadcn/table';
import { cn } from '@/shared/lib/utils';

const FileTableHeader = () => {
  const headClass = 'text-left body2-bold';
  return (
    <TableHeader>
      <TableRow className="border-b border-gray-300 h-12 bg-white z-10">
        <TableHead className="w-[6%] pl-6 body2-bold">번호</TableHead>
        <TableHead className={cn('w-[30%]', headClass)}>파일명</TableHead>
        <TableHead className={cn('w-[10%]', headClass)}>용량</TableHead>
        <TableHead className={cn('w-[20%]', headClass)}>업로드일</TableHead>
        <TableHead className={cn('w-[20%]', headClass)}>연결된 할 일</TableHead>
        <TableHead className="w-[14%] text-center body2-bold">다운로드</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default FileTableHeader;
