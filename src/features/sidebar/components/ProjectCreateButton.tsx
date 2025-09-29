import { DropdownMenuItem } from '@/shared/components/shadcn/dropdown-menu';
import { useModal } from '@/shared/hooks/useModal';
import { SquarePlus } from 'lucide-react';
import ProjectCreateModalContent from '@/features/sidebar/components/ProjectCreateModalContent';

const ProjectCreateButton = () => {
  const { showCustom, resetModal } = useModal();

  const handleClick = () => {
    showCustom({
      title: '프로젝트 생성',
      description: '새로운 프로젝트를 만들고 시작해보세요!',
      content: <ProjectCreateModalContent />,
      buttons: [
        {
          text: '등록',
          onClick: () => {
            /* 등록 로직 */
            resetModal();
          },
          variant: 'primary',
        },
      ],
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
