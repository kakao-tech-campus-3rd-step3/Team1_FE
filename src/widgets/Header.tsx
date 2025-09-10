import { useCreateTask } from '@/features/kanban/hooks/kanbanQueries';
import { useProjectQuery } from '@/features/project/hooks/projectQueries';
import { Button } from '@/shared/components/shadcn/button';
import type { Id } from '@/shared/types/commonTypes';
import { PlusCircle, MoreVertical, UserPlus } from 'lucide-react';

interface Props {
  projectId: Id;
}

function Header({ projectId }: Props) {
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });

  const { mutate: createTaskMutation } = useCreateTask();
  const { data: project, isLoading, isError } = useProjectQuery(projectId);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !project) return <div>프로젝트를 불러오지 못했습니다.</div>;

  return (
    <div className="flex items-center justify-between w-full h-35 p-6 bg-white shadow-sm">
      <div className="flex flex-col justify-center">
        <span className="label1-regular text-gray-500">{today}</span>
        <span className="title1-bold !text-3xl">{project.name}</span>
      </div>

      <div className="flex items-center gap-2">
        <Button size="icon" variant="outline" className="border-gray-300">
          <UserPlus />
        </Button>
        {project.role === 'admin' && (
          <Button size="icon" variant="outline" className="border-gray-300">
            <MoreVertical />
          </Button>
        )}
        <Button
          className=" text-gray-100 m-2 justify-center bg-boost-blue hover:bg-boost-blue/90 h-8 ml-auto px-3 py-1 rounded"
          onClick={() => {
            createTaskMutation('TODO');
          }}
        >
          <PlusCircle />할 일 추가
        </Button>
      </div>
    </div>
  );
}

export default Header;
