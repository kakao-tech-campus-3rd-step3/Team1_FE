import { Button } from '@/shared/components/shadcn/button';
import { useDeleteAccountMutation } from '@/features/settings/hooks/useDeleteAccountMutation';
import toast from 'react-hot-toast';
import { SettingsSectionCard } from '@/features/settings/components/SettingsSectionCard';

export const DeleteAccountCard = () => {
  const { mutate: deleteAccount, isPending } = useDeleteAccountMutation();

  const handleDelete = () => {
    if (confirm('정말로 탈퇴하시겠습니까?')) {
      deleteAccount(undefined, {
        onSuccess: () => {
          toast.success('계정이 삭제되었습니다.');
          window.location.href = '/';
        },
        onError: () => toast.error('회원 탈퇴에 실패했습니다.'),
      });
    }
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
