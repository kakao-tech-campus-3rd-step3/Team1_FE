import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/shadcn/table';
import { Checkbox } from '@/shared/components/shadcn/checkbox';
import MemoTableRow from '@/features/memo/components/MemoList/MemoTableRow';
import type { Memo } from '@/features/memo/types/memoTypes';
import { cn } from '@/shared/lib/utils';

interface MemoTableProps {
  currentData?: Memo[];
  selectedRows: Set<string>;
  onSelectAll: () => void;
  onSelectRow: (id: string) => void;
  onSelectMemo: (id: string) => void;
  onDeleteOne: (id: string) => void;
  currentPage: number;
  pageSize: number;
}

const MemoTable = ({
  currentData,
  selectedRows,
  onSelectAll,
  onSelectRow,
  onSelectMemo,
  onDeleteOne,
  currentPage,
  pageSize,
}: MemoTableProps) => {
  const defaultFont = 'text-gray-800 subtitle2-bold';

  return (
    <div className="flex-1 overflow-auto rounded-xl border border-gray-200 shadow-[0_0_6px_rgba(0,0,0,0.08)]">
      <Table className="min-w-full table-fixed">
        <TableHeader>
          <TableRow className="border-b border-gray-300 bg-white h-12 hover:bg-whtie">
            <TableHead className="w-[6%] px-5">
              <Checkbox
                checked={
                  selectedRows.size === (currentData?.length || 0) && (currentData?.length || 0) > 0
                }
                onCheckedChange={onSelectAll}
                aria-label="Select all"
                className="rounded-md"
              />
            </TableHead>
            <TableHead className={cn('w-[8%]', defaultFont)}>번호</TableHead>
            <TableHead className={cn('w-[24%]', defaultFont)}>제목</TableHead>
            <TableHead className={cn('w-[25%]', defaultFont)}>생성일</TableHead>
            <TableHead className={cn('w-[25%]', defaultFont)}>수정일</TableHead>
            <TableHead className={cn('w-[12%] text-center', defaultFont)}>삭제</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentData && currentData.length > 0 ? (
            currentData.map((memo, index) => (
              <MemoTableRow
                key={memo.id}
                memo={memo}
                index={index}
                currentPage={currentPage}
                pageSize={pageSize}
                selected={selectedRows.has(memo.id)}
                onSelectRow={onSelectRow}
                onSelectMemo={onSelectMemo}
                onDeleteOne={onDeleteOne}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                <div className="flex flex-col items-center justify-center text-gray-400 pt-16 h-full">
                  <div className="text-4xl mb-2">📄</div>
                  <div className="body1-regular">메모가 존재하지 않아요!</div>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MemoTable;
