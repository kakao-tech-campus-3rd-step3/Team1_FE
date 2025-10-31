import { Button } from '@/shared/components/shadcn/button';
import toast from 'react-hot-toast';
import { SettingsSectionCard } from '@/features/settings/components/SettingsSectionCard';
import { useModal } from '@/shared/hooks/useModal';
import DeleteAccountModalContent from '@/features/settings/components/DeleteAccountModalContent';
import { useDeleteAccountMutation } from '@/features/settings/hooks/useDeleteAccountMutation';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/app/routes/Router';

export const DeleteAccountCard = () => {
  const { showSelect, resetModal } = useModal();
  const { mutate: deleteAccount, isPending } = useDeleteAccountMutation();
  const navigate = useNavigate()

  const handleDelete = () => {
    showSelect({
      title: '계정 탈퇴',
      description: '정말로 계정을 탈퇴하시겠습니까?',
      size: 'md',
      titleAlign: 'center',
      content: <DeleteAccountModalContent />,
      buttons: [
        {
          text: '취소',
          variant: 'outline',
          onClick: async () => {
            resetModal();
          },
        },
        {
          text: '탈퇴하기',
          variant: 'destructive',
          onClick: async () => {
            deleteAccount(undefined, {
              onSuccess: () => {
                toast.success('계정이 성공적으로 삭제되었습니다.');
                resetModal();
                navigate(ROUTE_PATH.MAIN);
              },
              onError: () => {
                toast.error('계정 삭제 중 오류가 발생했습니다.');
              },
            });
          },
        },
      ],
    });
  };

  return (
    <SettingsSectionCard
      title="회원탈퇴"
      desc="탈퇴 시 모든 데이터가 삭제되며, 복구할 수 없습니다."
    >
      <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
        {isPending ? '탈퇴 중...' : '회원탈퇴'}
      </Button>
    </SettingsSectionCard>
  );
};
