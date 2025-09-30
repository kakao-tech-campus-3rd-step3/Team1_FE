import { Tabs, TabsList, TabsTrigger } from '@/shared/components/shadcn/tabs';

interface FilterToggleProps {
  value: 'state' | 'team-member';
  onChange: (value: 'state' | 'team-member') => void;
}

const FilterToggle = ({ value, onChange }: FilterToggleProps) => {
  return (
    <div className="flex max-w-sm flex-col gap-6">
      <Tabs
        value={value}
        defaultValue="state"
        onValueChange={(val) => onChange(val as 'state' | 'team-member')}
      >
        <TabsList>
          <TabsTrigger value="state">상태</TabsTrigger>
          <TabsTrigger value="team-member">팀원</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default FilterToggle;
