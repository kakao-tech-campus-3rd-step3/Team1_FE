import FilterToggle from '@/shared/components/ui/FilterToggle';
import SortDropDown from '@/shared/components/ui/SortDropDown';
import SearchInput from '@/shared/components/ui/SearchInput';

import type { BoardKey } from '@/features/board/types/boardTypes';
import TagSearchInput from '@/shared/components/ui/TagSearchInput';

interface FilterTabProps {
  boardKey: BoardKey;
  value?: 'status' | 'member';
  onChange?: (value: 'status' | 'member') => void;
  showFilterToggle?: boolean;
  showTagSearchInput?: boolean;
  showSearchInput?: boolean;
  showSortDropDown?: boolean;
}

const FilterTab = ({
  boardKey,
  value,
  onChange,
  showFilterToggle = true,
  showTagSearchInput = true,
  showSearchInput = true,
  showSortDropDown = true,
}: FilterTabProps) => {
  return (
    <div className="flex flex-row p-2 pr-4 pl-4 justify-between items-center gap-4">
      <div className="flex flex-row gap-4">
        {showSearchInput && <SearchInput boardKey={boardKey} />}
        {showTagSearchInput && <TagSearchInput />}
      </div>

      <div className="flex flex-row gap-4">
        {showSortDropDown && <SortDropDown />}
        {showFilterToggle && value !== undefined && onChange && (
          <FilterToggle value={value} onChange={onChange} />
        )}
      </div>
    </div>
  );
};

export default FilterTab;
