import { BOARD_KEYS } from '@/features/board/constants/boardConstants';
import FilterTab from '@/widgets/FilterTab';

const MyTaskFilterTab = () => {
  return (
    <FilterTab
      boardKey={BOARD_KEYS.MY_TASKS}
      showFilterToggle={false}
      showSearchInput={true}
      showTagSearchInput={false}
      showSortDropDown={true}
    />
  );
};

export default MyTaskFilterTab;
