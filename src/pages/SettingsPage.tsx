import AvatarsDrawer from '@/features/avatar-picker/components/AvatarsDrawer';
import { UserInfo } from '@/features/settings/components/UserInfo';
import { useMyInfoQuery } from '@/features/settings/hooks/useMyInfoQuery';
import { useUpdateAvatarMutation } from '@/features/settings/hooks/useUpdateAvatarMutation';
import { Separator } from '@/shared/components/shadcn/separator';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data: myInfo, isLoading } = useMyInfoQuery();
  const { mutate: updateAvatar } = useUpdateAvatarMutation();
  // const { mutate: deleteAccount } = useDeleteAccountMutation();

  const handleAvatarSelect = (id: string) => {
    setSelectedAvatar(id);
    updateAvatar(id, {
      onSuccess: () => {
        toast.success('아바타가 변경되었습니다!');
        setIsDrawerOpen(false);
      },
      onError: () => {
        toast.error('아바타 변경에 실패했습니다.');
      },
    });
  };
  if (isLoading || !myInfo) return <p>불러오는 중...</p>;

  return (
    <div className="flex flex-col pr-20 pl-20">
      {/* 내 정보 */}
      <UserInfo member={myInfo} />

      <Separator />
      <AvatarsDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        selectedAvatar={selectedAvatar}
        handleAvatarSelect={handleAvatarSelect}
      />
   
    </div>
  );
}
