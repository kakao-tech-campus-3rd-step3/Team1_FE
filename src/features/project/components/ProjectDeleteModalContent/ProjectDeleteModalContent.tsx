import { useProjectStore } from '@/features/project/store/useProjectStore';
import { useDeleteProjectMutation } from '@/features/project/hooks/useDeleteProjectMutation';
import { useModal } from '@/shared/hooks/useModal';
import { ROUTE_PATH } from '@/app/routes/Router';
import { type NavigateFunction } from 'react-router';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Button } from '@/shared/components/shadcn/button';
import ProjectDeleteRotatingText from '@/features/project/components/ProjectDeleteModalContent/ProjectDeleteRotatingText';
import Boo from '@/shared/assets/images/boost/boo.png';

interface ProjectDeleteModalContentProps {
  navigate: NavigateFunction;
}

const ProjectDeleteModalContent = ({ navigate }: ProjectDeleteModalContentProps) => {
  const { projectData } = useProjectStore();
  const { resetModal, backModal } = useModal();
  const { mutateAsync: deleteProject } = useDeleteProjectMutation();

  if (!projectData) return null;

  const handleDeleteConfirm = async () => {
    try {
      await deleteProject(projectData.id);
      resetModal();
      navigate(ROUTE_PATH.MY_TASK);
      toast.success('프로젝트가 삭제되었습니다.');
    } catch (error) {
      toast.error('프로젝트 삭제 실패 : ' + error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.img
        src={Boo}
        alt="Boo"
        className="w-30 h-30 m-5"
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <ProjectDeleteRotatingText />
      <div className="flex gap-2 mt-2 w-full">
        <Button
          variant="outline"
          onClick={backModal}
          className="flex flex-1 border-gray-300 hover:bg-gray-100"
        >
          취소
        </Button>
        <Button
          variant="destructive"
          onClick={handleDeleteConfirm}
          className="flex-1 bg-boost-blue hover:bg-boost-blue-pressed text-gray-100"
        >
          삭제
        </Button>
      </div>
    </div>
  );
};

export default ProjectDeleteModalContent;
