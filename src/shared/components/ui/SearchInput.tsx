import { useState, useEffect } from 'react';
import type { BoardKey } from '@/features/board/types/boardTypes';
import { useBoardSearchStore } from '@/features/board/store/useBoardSearchStore';
import { Input } from '@/shared/components/shadcn/input';
import { Search } from 'lucide-react';
import { useDebounce } from '@/shared/hooks/useDebounce';

interface SearchInputProps {
  boardKey: BoardKey;
}

const SearchInput = ({ boardKey }: SearchInputProps) => {
  const setSearch = useBoardSearchStore((state) => state.setSearch);
  const clearOtherBoardSearch = useBoardSearchStore((state) => state.clearOtherBoardSearch);

  const [localValue, setLocalValue] = useState('');
  const debouncedValue = useDebounce(localValue, 300);

  useEffect(() => {
    clearOtherBoardSearch(boardKey);
    setSearch(boardKey, debouncedValue);
  }, [debouncedValue, boardKey, setSearch, clearOtherBoardSearch]);

  return (
    <div className="relative w-[300px]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      <Input
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="w-full pl-10 pr-3 py-2 h-10 rounded-lg border-gray-300 focus:border-gray-500 focus:ring-transparent placeholder-gray-400 transition"
        placeholder="검색어를 입력하세요"
      />
    </div>
  );
};

export default SearchInput;
