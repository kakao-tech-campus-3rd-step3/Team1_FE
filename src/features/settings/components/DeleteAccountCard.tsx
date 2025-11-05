import { Button } from '@/shared/components/shadcn/button';
import { SettingsSectionCard } from '@/features/settings/components/SettingsSectionCard';
import { useModal } from '@/shared/hooks/useModal';
import DeleteAccountModalContent from '@/features/settings/components/DeleteAccountModalContent';

export const DeleteAccountCard = () => {
  const { showCustom } = useModal();
  const showModal = () => {
    showCustom({
      title: '회원 탈퇴',
      description: '정말로 회원을 탈퇴하시겠습니까?',
      size: 'md',
      titleAlign: 'center',
      content: <DeleteAccountModalContent />,
    });
  };

  return (
    <SettingsSectionCard
      title="회원탈퇴"
      desc="탈퇴 시 모든 데이터가 삭제되며, 복구할 수 없습니다."
    >
      <Button variant="destructive" onClick={showModal}>
        회원탈퇴
      </Button>
    </SettingsSectionCard>
  );
};
