import { Tabs, TabsList, TabsTrigger } from '@/shared/components/shadcn/tabs';

interface FilterToggleProps {
  value: 'status' | 'member';
  onChange: (value: 'status' | 'member') => void;
}

const FilterToggle = ({ value, onChange }: FilterToggleProps) => {
  const handleToggle = () => {
    onChange(value === 'status' ? 'member' : 'status');
  };

  return (
    <div className="flex max-w-sm flex-col gap-6">
      <Tabs value={value}>
        <TabsList>
          <TabsTrigger value="status" onClick={handleToggle} className="cursor-pointer select-none">
            상태
          </TabsTrigger>
          <TabsTrigger value="member" onClick={handleToggle} className="cursor-pointer select-none">
            팀원
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default FilterToggle;
