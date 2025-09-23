import { useState } from 'react';
import { Input } from '@/shared/components/shadcn/input';
import { Button } from '@/shared/components/shadcn/button';
import { DialogFooter } from '@/shared/components/shadcn/dialog';
import useModalStore from '@/shared/store/useModalStore';

interface ProjectCreateModalProps {
  onConfirm: (projectName: string) => Promise<void> | void;
}

const ProjectCreateModalContent = ({ onConfirm }: ProjectCreateModalProps) => {
  const [projectName, setProjectName] = useState('');
  const { closeModal, isLoading, setLoading, backModal } = useModalStore();

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm(projectName);
      closeModal();
    } catch (error) {
      console.error('프로젝트 생성 실패 :', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="py-4">
        <Input
          id="projectName"
          value={projectName}
          placeholder="프로젝트 이름을 입력해주세요."
          onChange={(e) => setProjectName(e.target.value)}
          disabled={isLoading}
          className="border-gray-400 h-10 focus:ring-transparent focus:border-gray-600"
        />
      </div>
      <DialogFooter>
        <Button
          onClick={backModal}
          variant="outline"
          disabled={isLoading}
          className="border-gray-400 sm:w-20 hover:bg-gray-200"
        >
          취소
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={!projectName || isLoading}
          className="bg-boost-blue sm:w-20 hover:bg-boost-blue-pressed cursor-pointer"
        >
          생성
        </Button>
      </DialogFooter>
    </>
  );
};

export default ProjectCreateModalContent;
