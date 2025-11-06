import { BOARD_KEYS } from '@/features/board/constants/boardConstants';
import FilterTab from '@/widgets/FilterTab';

interface ProjectFilterTabProps {
  value: 'status' | 'member';
  onChange: (value: 'status' | 'member') => void;
}

const ProjectFilterTab = ({ value, onChange }: ProjectFilterTabProps) => {
  const boardKey = value === 'status' ? BOARD_KEYS.PROJECT_STATUS : BOARD_KEYS.PROJECT_MEMBER;
  let isShowSortDropdown = true;

  if (value === 'member') isShowSortDropdown = false;

  return (
    <FilterTab
      boardKey={boardKey}
      value={value}
      onChange={onChange}
      showFilterToggle={true}
      showTagSearchInput={true}
      showSearchInput={true}
      showSortDropDown={isShowSortDropdown}
    />
  );
};

export default ProjectFilterTab;
