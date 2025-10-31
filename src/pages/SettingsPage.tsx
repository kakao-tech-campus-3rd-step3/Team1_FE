import AvatarsDrawer from '@/features/avatar-picker/components/AvatarsDrawer';
import { DeleteAccountCard } from '@/features/settings/components/DeleteAccountCard';
import { LicenseCard } from '@/features/settings/components/LicenseCard';
import { useMyInfoQuery } from '@/features/settings/hooks/useMyInfoQuery';
import { useUpdateAvatarMutation } from '@/features/settings/hooks/useUpdateAvatarMutation';
import { Separator } from '@/shared/components/shadcn/separator';
import { useState } from 'react';
import toast from 'react-hot-toast';
import AlarmSettingCard from '@/features/settings/components/AlarmSettingCard';
import { UserInfoCard } from '@/features/settings/components/UserInfoCard';

export default function SettingsPage() {
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data: myInfo, isLoading } = useMyInfoQuery();
  const { mutate: updateAvatar } = useUpdateAvatarMutation();

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

  if (isLoading || !myInfo) return <p className="p-10 text-gray-500">불러오는 중...</p>;

  return (
    <div className="flex flex-col pr-10 pl-10 space-y-8">
      {/* 내 정보 */}
      <UserInfoCard member={myInfo} onAvatarEdit={() => setIsDrawerOpen(true)} />
      <AvatarsDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        selectedAvatar={selectedAvatar}
        handleAvatarSelect={handleAvatarSelect}
      />
      <Separator />
      <AlarmSettingCard/>
      <Separator />
      {/* 회원탈퇴 */}
      <DeleteAccountCard />
      <Separator />
      {/* 라이선스 명시 */}
      <LicenseCard />
    </div>
  );
}
