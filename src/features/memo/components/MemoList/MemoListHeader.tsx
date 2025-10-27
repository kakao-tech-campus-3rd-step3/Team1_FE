import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/shadcn/button';
import type { Memo } from '@/features/memo/types/memoTypes';

interface MemoListHeaderProps {
  memos?: Memo[];
  selectedRows: Set<string>;
  onDeleteSelected: () => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageCount: number;
}

const MemoListHeader = ({
  memos,
  selectedRows,
  onDeleteSelected,
  currentPage,
  setCurrentPage,
  pageCount,
}: MemoListHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="text-sm text-gray-500 flex items-center gap-3">
        {selectedRows.size > 0 ? (
          <>
            <span className="font-medium text-boost-blue-600">
              {selectedRows.size}개 항목 선택됨
            </span>
            <Button
              variant="secondaryBoost"
              size="sm"
              onClick={onDeleteSelected}
              className="text-xs rounded-md px-3"
            >
              <Trash2 />
              선택 삭제
            </Button>
          </>
        ) : (
          <span>총 {memos?.length || 0}개 메모</span>
        )}
      </div>

      <div className="flex items-center gap-2 pr-2">
        <Button
          variant="defaultBoost"
          size="icon"
          disabled={currentPage === 0}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="disabled:bg-white disabled:text-gray-600 border disabled:border-gray-500 rounded-full"
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="defaultBoost"
          size="icon"
          disabled={currentPage + 1 >= pageCount}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="disabled:bg-white disabled:text-gray-600 border disabled:border-gray-500 rounded-full"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default MemoListHeader;
