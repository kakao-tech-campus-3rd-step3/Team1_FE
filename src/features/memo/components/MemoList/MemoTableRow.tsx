import { Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/shadcn/button';
import { Checkbox } from '@/shared/components/shadcn/checkbox';
import { TableCell, TableRow } from '@/shared/components/shadcn/table';
import type { Memo } from '@/features/memo/types/memoTypes';

interface MemoTableRowProps {
  memo: Memo;
  index: number;
  currentPage: number;
  pageSize: number;
  selected: boolean;
  onSelectRow: (id: string) => void;
  onSelectMemo: (id: string) => void;
  onDeleteOne: (id: string) => void;
}

const MemoTableRow = ({
  memo,
  index,
  currentPage,
  pageSize,
  selected,
  onSelectRow,
  onSelectMemo,
  onDeleteOne,
}: MemoTableRowProps) => {
  return (
    <TableRow
      className="bg-white border-b border-gray-100 hover:bg-blue-50/30 transition-colors duration-150 h-[50px]"
      data-state={selected ? 'selected' : undefined}
      onClick={() => onSelectMemo(memo.id)}
    >
      <TableCell className="px-5">
        <Checkbox
          checked={selected}
          onCheckedChange={() => onSelectRow(memo.id)}
          onClick={(e) => e.stopPropagation()}
          aria-label="Select row"
          className="rounded-md"
        />
      </TableCell>
      <TableCell className="text-gray-600 font-medium">
        {currentPage * pageSize + index + 1}
      </TableCell>
      <TableCell>
        <Button
          variant="link"
          className="p-0 h-fit text-gray-900 cursor-pointer"
          onClick={() => onSelectMemo(memo.id)}
        >
          {memo.title}
        </Button>
      </TableCell>
      <TableCell className="text-gray-600">
        {new Date(memo.createdAt).toLocaleString('ko-KR')}
      </TableCell>
      <TableCell className="text-gray-600">
        {new Date(memo.updatedAt).toLocaleString('ko-KR')}
      </TableCell>
      <TableCell className="text-center">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-red-600"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteOne(memo.id);
          }}
        >
          <Trash2 />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default MemoTableRow;
