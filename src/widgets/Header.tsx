import { useCreateTaskMutation } from '@/features/task/hooks/useCreateTaskMutation';
import { Button } from '@/shared/components/shadcn/button';
import { PlusCircle, UserPlus } from 'lucide-react';
import TaskCreateModalContent from '@/features/task/components/TaskCreateModalContent/TaskCreateModalContent';
import ProjectOptionsMenu from '@/features/project/components/ProjectOptionsMenu';
import { useModal } from '@/shared/hooks/useModal';
import toast from 'react-hot-toast';
import type { Project } from '@/features/project/types/projectTypes';

interface HeaderProps {
  project: Project;
}

const Header = ({ project }: HeaderProps) => {
  const { mutate: createTaskMutation } = useCreateTaskMutation();
  const { showCustom } = useModal();

  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });

  const handleTaskCreateClick = () => {
    showCustom({
      title: '할 일 생성',
      size: 'lg',
      description: '새로운 할 일 만들어보세요!',
      content: (
        <TaskCreateModalContent
          onConfirm={async (taskData) => {
            await createTaskMutation(taskData);
            toast.success('할 일이 성공적으로 생성되었습니다!');
          }}
        />
      ),
    });
  };

  return (
    <div className="flex items-center justify-between w-full h-26 p-6 bg-white shadow-sm">
      <div className="flex flex-col justify-center gap-1">
        <span className="label1-regular text-gray-500">{today}</span>
        <span className="title1-bold !text-3xl">{project.name}</span>
      </div>

      <div className="flex items-center gap-2">
        <Button size="icon" variant="outline" className="border-gray-300">
          <UserPlus />
        </Button>
        <ProjectOptionsMenu projectId={project.id} />
        <Button
          className="text-gray-100 m-2 justify-center bg-boost-blue hover:bg-boost-blue/90 h-8 ml-auto px-3 py-1 rounded"
          onClick={handleTaskCreateClick}
        >
          <PlusCircle />할 일 추가
        </Button>
      </div>
    </div>
  );
};

export default Header;
