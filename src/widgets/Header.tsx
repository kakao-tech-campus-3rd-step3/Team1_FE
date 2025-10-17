import { useCreateTaskMutation } from '@/features/task/hooks/useCreateTaskMutation';
import { Button } from '@/shared/components/shadcn/button';
import { MoreVertical, PlusCircle, UserPlus } from 'lucide-react';
import TaskCreateModalContent from '@/features/task/components/TaskCreateModalContent/TaskCreateModalContent';
import { useModal } from '@/shared/hooks/useModal';
import toast from 'react-hot-toast';
import type { Project } from '@/features/project/types/projectTypes';
import ProjectUpdateModalContent from '@/features/project/components/ProjectUpdateModalContent/ProjectUpdateModalContent';
import { useNavigate } from 'react-router';
import ProjectJoinCodeViewModalContent from '@/features/project/components/ProjectJoinCodeViewModalContent';

interface HeaderProps {
  project: Project;
}

const Header = ({ project }: HeaderProps) => {
  const { mutate: createTaskMutation } = useCreateTaskMutation(project.id);
  const { showCustom } = useModal();
  const navigate = useNavigate();

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

  const handleProjectUpdateClick = () => {
    showCustom({
      title: '프로젝트 관리',
      size: 'lg',
      description: '프로젝트 기본 정보와 멤버를 관리합니다.',
      content: <ProjectUpdateModalContent navigate={navigate} />,
    });
  };

  const handleProjectJoinCodeViewMoadal = () => {
    showCustom({
      title: '프로젝트 참여 코드 확인',
      description: '프로젝트 참여 코드를 확인하거나 복사할 수 있어요.',
      content: <ProjectJoinCodeViewModalContent projectId={project.id} />,
    });
  };

  return (
    <div className="flex items-center justify-between w-full h-26 p-6 bg-white shadow-sm">
      <div className="flex flex-col justify-center gap-1">
        <span className="label1-regular text-gray-500">{today}</span>
        <span className="title1-bold !text-3xl">{project.name}</span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={handleProjectUpdateClick}
          size="icon"
          variant="outline"
          className="border-gray-300"
        >
          <MoreVertical />
        </Button>
        <Button
          onClick={handleProjectJoinCodeViewMoadal}
          size="icon"
          variant="outline"
          className="border-gray-300"
        >
          <UserPlus />
        </Button>
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
