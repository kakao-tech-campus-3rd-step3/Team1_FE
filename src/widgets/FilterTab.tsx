import SearchInput from '@/shared/components/ui/SearchInput';
import FilterToggle from '@/shared/components/ui/FilterToggle';
import SortDropDown from '@/shared/components/ui/SortDropDown';
import type { BoardKey } from '@/features/board/types/boardTypes';

interface FilterTabProps {
  boardKey: BoardKey;
  value?: 'status' | 'member';
  onChange?: (value: 'status' | 'member') => void;
  showFilterToggle?: boolean;
  showSearchInput?: boolean;
  showSortDropDown?: boolean;
}

const FilterTab = ({
  boardKey,
  value,
  onChange,
  showFilterToggle = true,
  showSearchInput = true,
  showSortDropDown = true,
}: FilterTabProps) => {
  return (
    <div className="flex flex-row p-2 pr-4 pl-4 justify-between">
      {showSearchInput && <SearchInput boardKey={boardKey} />}
      <div className="flex flex-row gap-4">
        {showFilterToggle && value !== undefined && onChange && (
          <FilterToggle value={value} onChange={onChange} />
        )}
        {showSortDropDown && <SortDropDown />}
      </div>
    </div>
  );
};

export default FilterTab;
