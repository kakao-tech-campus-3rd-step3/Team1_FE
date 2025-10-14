import { DropdownMenuItem } from '@/shared/components/shadcn/dropdown-menu';
import { useModal } from '@/shared/hooks/useModal';
import { SquarePlus } from 'lucide-react';
import ProjectCreateModalContent from '@/features/project/components/ProjectCreateModalContent';
import { useCreateProjectMutation } from '@/features/project/hooks/useCreateProjectMutation';
import toast from 'react-hot-toast';

const ProjectCreateButton = () => {
  const { showCustom } = useModal();
  const createProjectMutation = useCreateProjectMutation();

  const handleClick = () => {
    showCustom({
      title: '프로젝트 생성',
      description: '새로운 프로젝트를 만들고 시작해보세요!',
      content: (
        <ProjectCreateModalContent
          onConfirm={async (projectName) => {
            await createProjectMutation.mutateAsync(projectName);
            toast.success('프로젝트가 성공적으로 생성되었습니다!');
          }}
        />
      ),
    });
  };

  return (
    <DropdownMenuItem className="flex items-center pl-2 gap-2 cursor-pointer" onClick={handleClick}>
      <SquarePlus className="w-4 text-gray-600" />
      <span className="text-sm text-gray-600">프로젝트 생성</span>
    </DropdownMenuItem>
  );
};

export default ProjectCreateButton;
