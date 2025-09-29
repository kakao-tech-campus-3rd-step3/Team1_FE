import type { SidebarItem } from '@/widgets/AppSidebar';
import {
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from '@/shared/components/shadcn/sidebar';
import { Plus } from 'lucide-react';
import { Link } from 'react-router';
import ProjectCreateModalContent from '@/features/project/components/ProjectCreateModalContent';
import { useCreateProjectMutation } from '@/features/project/hooks/useCreateProjectMutation';
import toast from 'react-hot-toast';
import { useModal } from '@/shared/hooks/useModal';

interface SidebarMenuItemProps {
  item: SidebarItem;
}

const ProjectsMenu = ({ item }: SidebarMenuItemProps) => {
  const createProjectMutation = useCreateProjectMutation();
  const { showCustom } = useModal();

  const handleOpenProjectCreateModal = () => {
    showCustom({
      title: '프로젝트 생성하기',
      description: '프로젝트 이름을 입력하면, 새로운 프로젝트를 생성할 수 있어요.',
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
    <>
      <SidebarMenuButton>
        {item.icon}
        <span className="flex-shrink-0">{item.title}</span>

        <Plus
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleOpenProjectCreateModal();
          }}
          className="ml-auto cursor-pointer"
        />
      </SidebarMenuButton>
      <SidebarMenuSub>
        {item.subItems?.map((subItem, index) => {
          return (
            <SidebarMenuSubButton key={index} asChild>
              <Link to={subItem.url}>
                <span className="flex-1 text-left">{subItem.title}</span>
              </Link>
            </SidebarMenuSubButton>
          );
        })}
      </SidebarMenuSub>
    </>
  );
};

export default ProjectsMenu;
