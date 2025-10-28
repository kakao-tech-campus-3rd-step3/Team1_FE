import SearchInput from '@/shared/components/ui/SearchInput';
import FilterToggle from '@/shared/components/ui/FilterToggle';
import SortDropDown from '@/shared/components/ui/SortDropDown';

interface FilterTabProps {
  value?: 'status' | 'member';
  onChange?: (value: 'status' | 'member') => void;
  showFilterToggle?: boolean;
  showSearchInput?: boolean;
  showSortDropDown?: boolean;
}

const FilterTab = ({
  value,
  onChange,
  showFilterToggle = true,
  showSearchInput = true,
  showSortDropDown = true,
}: FilterTabProps) => {
  return (
    <div className="flex flex-row p-2 pr-4 pl-4 justify-between">
      {showSearchInput && <SearchInput />}
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
