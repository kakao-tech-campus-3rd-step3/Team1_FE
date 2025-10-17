import { useState } from 'react';
import { Input } from '@/shared/components/shadcn/input';
import { Button } from '@/shared/components/shadcn/button';
import { DialogFooter } from '@/shared/components/shadcn/dialog';
import useModalStore from '@/shared/store/useModalStore';

interface ProjectJoinCodeInputModalProps {
  onConfirm: (joinCode: string) => Promise<void> | void;
  onCreateClick: () => void;
}

const ProjectJoinCodeInputModalContent = ({
  onConfirm,
  onCreateClick,
}: ProjectJoinCodeInputModalProps) => {
  const [joinCode, setJoinCode] = useState('');
  const { resetModal, setLoading, backModal, stack } = useModalStore();
  const isLoading = stack[stack.length - 1]?.isLoading ?? false;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm(joinCode);
      resetModal();
    } catch (error) {
      console.error('프로젝트 참여 실패 :', error);
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
      <DialogFooter className="!mt-0 pt-4 border-t border-gray-300 flex !justify-between items-center">
        <Button
          onClick={() => {
            onCreateClick();
          }}
          variant="outline"
          disabled={isLoading}
          className="border-gray-400 hover:bg-gray-200 border-none text-gray-500 p-1 hover:text-gray-600 underline"
        >
          생성할래요
        </Button>
        <div className="flex gap-2">
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
        </div>
      </DialogFooter>
    </>
  );
};

export default ProjectJoinCodeInputModalContent;
