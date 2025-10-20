import { Button } from '@/shared/components/shadcn/button';
import { DialogFooter } from '@/shared/components/shadcn/dialog';
import useModalStore from '@/shared/store/useModalStore';
import toast from 'react-hot-toast';
import { Copy } from 'lucide-react';
import { useJoinCode } from '@/features/project/hooks/useJoinCode';

interface ProjectJoinCodeViewModalContentProps {
  projectId: string;
}

const ProjectJoinCodeViewModalContent = ({ projectId }: ProjectJoinCodeViewModalContentProps) => {
  const { joinCode, expiresAt, loading } = useJoinCode(projectId);
  const { resetModal } = useModalStore();

  const handleCopy = async () => {
    if (!joinCode) return;
    try {
      await navigator.clipboard.writeText(joinCode);
      toast.success('참여 코드가 복사되었습니다!');
    } catch (error) {
      toast.error('복사에 실패했습니다.');
      console.error('참여 코드 복사 실패:', error);
    }
  };

  return (
    <>
      <div className="py-4 flex flex-col gap-2">
        {loading ? (
          <p>참여 코드를 불러오는 중입니다!</p>
        ) : joinCode ? (
          <>
            <p className="subtitle2-bold flex items-center justify-between">
              참여 코드 <span className="subtitle2-regular">{joinCode}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-4 h-4" />
                복사
              </Button>
            </p>
            <p className="label1-regular text-gray-500">만료일: {expiresAt}</p>
          </>
        ) : (
          <p className="text-red-500">참여 코드를 불러올 수 없습니다.</p>
        )}
      </div>

      <DialogFooter>
        <Button onClick={resetModal} className="bg-boost-blue hover:bg-boost-hover cursor-pointer">
          닫기
        </Button>
      </DialogFooter>
    </>
  );
};

export default ProjectJoinCodeViewModalContent;
