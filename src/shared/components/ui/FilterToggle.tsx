import { Tabs, TabsList, TabsTrigger } from '@/shared/components/shadcn/tabs';

const FilterToggle = () => {
  return (
    <div className="flex max-w-sm flex-col gap-6">
      <Tabs defaultValue="state">
        <TabsList>
          <TabsTrigger value="state">상태</TabsTrigger>
          <TabsTrigger value="team-member">팀원</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default FilterToggle;
