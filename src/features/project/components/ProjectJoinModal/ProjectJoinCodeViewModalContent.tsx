import { useEffect, useState } from 'react';
import { Button } from '@/shared/components/shadcn/button';
import { DialogFooter } from '@/shared/components/shadcn/dialog';
import useModalStore from '@/shared/store/useModalStore';
import toast from 'react-hot-toast';
import { Copy, RefreshCw } from 'lucide-react';
import { useJoinCode } from '@/features/project/hooks/useJoinCode';
import { formatSecondsToHHMMSS, getRemainingSeconds } from '@/shared/utils/dateUtils';

interface ProjectJoinCodeViewModalContentProps {
  projectId: string;
}

const ProjectJoinCodeViewModalContent = ({ projectId }: ProjectJoinCodeViewModalContentProps) => {
  const { joinCode, expiresAt, loading, loadJoinCode } = useJoinCode(projectId);
  const { resetModal } = useModalStore();
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  useEffect(() => {
    if (!expiresAt) return;

    const updateRemainingTime = () => setRemainingTime(getRemainingSeconds(expiresAt));
    updateRemainingTime();

    const interval = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

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

  const handleRefresh = async () => {
    if (!loadJoinCode) return;
    await loadJoinCode();
    toast.success('새 참여 코드가 발급되었습니다!');
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
            {remainingTime !== null && remainingTime > 0 ? (
              <p className="absolute bottom-9 left-6 label2-regular text-gray-500">
                참여 코드 만료 D-{formatSecondsToHHMMSS(remainingTime)}
              </p>
            ) : (
              <Button
                variant="link"
                onClick={handleRefresh}
                className="absolute bottom-6 left-3 cursor-pointer label2-regular text-gray-500"
              >
                <RefreshCw className="w-3 h-3" /> 참여 코드가 만료되었습니다. 여기를 눌러 참여코드를
                재발급 해주세요!
              </Button>
            )}
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
