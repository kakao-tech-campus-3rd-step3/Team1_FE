import FilterTab from '@/widgets/FilterTab';

interface ProjectFilterTabProps {
  value: 'status' | 'member';
  onChange: (value: 'status' | 'member') => void;
}

const ProjectFilterTab = ({ value, onChange }: ProjectFilterTabProps) => {
  return (
    <FilterTab
      value={value}
      onChange={onChange}
      showFilterToggle={true}
      showSearchInput={true}
      showSortDropDown={true}
    />
  );
};

export default ProjectFilterTab;
