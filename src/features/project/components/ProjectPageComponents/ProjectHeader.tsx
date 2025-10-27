import Header from '@/widgets/Header';
import { useModal } from '@/shared/hooks/useModal';
import { useNavigate, useLocation } from 'react-router-dom';
import ProjectUpdateModalContent from '@/features/project/components/ProjectUpdateModal/ProjectUpdateModalContent';
import ProjectJoinCodeViewModalContent from '@/features/project/components/ProjectJoinModal/ProjectJoinCodeViewModalContent';
import TaskCreateModalContent from '@/features/task/components/TaskCreateModal/TaskCreateModalContent';
import type { Project } from '@/features/project/types/projectTypes';
import { ROUTES } from '@/app/routes/Router';

interface ProjectHeaderProps {
  project: Project;
}

const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  const { showCustom } = useModal();
  const navigate = useNavigate();
  const location = useLocation();

  const handleButtonClick = () => {
    if (location.pathname.includes('/memo')) {
      navigate(ROUTES.PROJECT_MEMO_EDIT(project.id, ''));
      navigate(`/project/${project.id}/memo/edit`);
    } else {
      showCustom({
        title: '할 일 생성',
        size: 'lg',
        description: '새로운 할 일을 만들어보세요!',
        content: <TaskCreateModalContent isMyTask={false} projectId={project.id} />,
      });
    }
  };

  return (
    <Header
      title={project.name}
      showProjectActions
      onProjectManageClick={() =>
        showCustom({
          title: '프로젝트 관리',
          size: 'lg',
          description: '프로젝트 기본 정보와 멤버를 관리합니다.',
          content: <ProjectUpdateModalContent navigate={navigate} />,
        })
      }
      onProjectJoinCodeClick={() =>
        showCustom({
          title: '프로젝트 참여 코드 확인',
          description: '프로젝트 참여 코드를 확인하거나 복사할 수 있어요.',
          content: <ProjectJoinCodeViewModalContent projectId={project.id} />,
        })
      }
      onCreate={handleButtonClick}
      createLabel={location.pathname.includes('/memo') ? '메모 생성' : '할 일 생성'}
    />
  );
};

export default ProjectHeader;
