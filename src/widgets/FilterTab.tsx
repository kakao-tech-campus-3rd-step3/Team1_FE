import SearchInput from '@/shared/components/ui/SearchInput';
import FilterToggle from '@/shared/components/ui/FilterToggle';
import SortDropDown from '@/shared/components/ui/SortDropDown';

const FilterTab = () => {
  return (
    <div className="flex flex-row p-2 pr-4 pl-4 justify-between">
      <SearchInput />
      <div className="flex flex-row gap-4">
        <FilterToggle />
        <SortDropDown />
      </div>
    </div>
  );
};
export default FilterTab;
