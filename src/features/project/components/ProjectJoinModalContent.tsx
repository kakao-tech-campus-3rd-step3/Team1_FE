import { useState } from 'react';
import { Input } from '@/shared/components/shadcn/input';
import { Button } from '@/shared/components/shadcn/button';
import { DialogFooter } from '@/shared/components/shadcn/dialog';
import useModalStore from '@/shared/store/useModalStore';

interface ProjectJoinModalProps {
  onConfirm: (joinCode: string) => Promise<void> | void;
}

const ProjectJoinModalContent = ({ onConfirm }: ProjectJoinModalProps) => {
  const [joinCode, setJoinCode] = useState('');
  const { closeModal, isLoading, setLoading, backModal } = useModalStore();

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm(joinCode);
      closeModal();
    } catch (error) {
      console.error('Project creation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="py-4">
        <Input
          id="joinCode"
          value={joinCode}
          placeholder="참여코드를 입력해주세요."
          onChange={(e) => setJoinCode(e.target.value)}
          disabled={isLoading}
          className="border-gray-400 h-10 focus:ring-transparent focus:border-gray-600"
        />
      </div>
      <DialogFooter>
        <Button
          onClick={backModal}
          variant="outline"
          disabled={isLoading}
          className="border-gray-400 sm:w-20 hover:bg-gray-200 cursor-pointer"
        >
          취소
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={!joinCode || isLoading}
          className="bg-boost-blue sm:w-20 hover:bg-boost-blue-pressed cursor-pointer"
        >
          입력
        </Button>
      </DialogFooter>
    </>
  );
};

export default ProjectJoinModalContent;
