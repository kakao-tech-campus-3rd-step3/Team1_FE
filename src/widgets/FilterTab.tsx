import SearchInput from '@/shared/components/SearchInput';
import FilterToggle from '@/shared/components/FilterToggle';
import SortDropDown from '@/shared/components/SortDropDown';

function FilterTab() {
  return (
    <div className="flex flex-row p-2 pr-4 pl-4 justify-between">
      <SearchInput />
      <div className="flex flex-row gap-4">
        <FilterToggle />
        <SortDropDown />
      </div>
    </div>
  );
}
export default FilterTab;
