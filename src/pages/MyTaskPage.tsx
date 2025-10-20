import { useProjectsQuery } from '@/features/project/hooks/useProjectsQuery';
import { useModal } from '@/shared/hooks/useModal';
import { useEffect, useRef } from 'react';
import Boo from '@/shared/assets/images/boost/boo.png';
import { motion } from 'framer-motion';
import { useProjectModals } from '@/features/project/hooks/useProjectModals';

const BooAnimation = () => (
  <div className="flex justify-center items-center py-15">
    <motion.img
      src={Boo}
      className="w-32 h-32"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
);

const MyTaskPage = () => {
  const { data: projects, isLoading } = useProjectsQuery();
  const { showCustom } = useModal();
  const { showCreateProjectModal, showJoinProjectModal } = useProjectModals();

  const hasShownModal = useRef(false);

  useEffect(() => {
    if (!isLoading && projects?.length === 0 && !hasShownModal.current) {
      hasShownModal.current = true;
      showCustom({
        title: '프로젝트가 존재하지 않아요!',
        titleAlign: 'center',
        description: '프로젝트에 참여하거나, 생성해보세요.',
        size: 'md',
        content: <BooAnimation />,
        buttons: [
          {
            text: '프로젝트 생성',
            styleClass: 'bg-boost-orange hover:bg-boost-orange-hover duration-300 subtitle2-bold',
            onClick: showCreateProjectModal,
          },
          {
            text: '프로젝트 참여',
            styleClass: 'bg-boost-blue hover:bg-boost-blue-hover duration-300 subtitle2-bold',
            onClick: showJoinProjectModal,
          },
        ],
      });
    }
  }, [isLoading, projects, showCustom, showCreateProjectModal, showJoinProjectModal]);

  return <div>나의 할 일 페이지</div>;
};

export default MyTaskPage;
