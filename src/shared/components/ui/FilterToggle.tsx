import { Tabs, TabsList, TabsTrigger } from '@/shared/components/shadcn/tabs';

interface FilterToggleProps {
  value: 'status' | 'member';
  onChange: (value: 'status' | 'member') => void;
}

const FilterToggle = ({ value, onChange }: FilterToggleProps) => {
  return (
    <div className="flex max-w-sm flex-col gap-6">
      <Tabs
        value={value}
        defaultValue="status"
        onValueChange={(val) => onChange(val as 'status' | 'member')}
      >
        <TabsList>
          <TabsTrigger value="status">상태</TabsTrigger>
          <TabsTrigger value="member">팀원</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default FilterToggle;
