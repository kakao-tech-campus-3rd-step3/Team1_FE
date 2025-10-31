import AvatarsDrawer from '@/features/avatar-picker/components/AvatarsDrawer';
import { DeleteAccountCard } from '@/features/settings/components/DeleteAccountCard';
import { LicenseCard } from '@/features/settings/components/LicenseCard';
import { useMyInfoQuery } from '@/features/settings/hooks/useMyInfoQuery';
import { Separator } from '@/shared/components/shadcn/separator';

import AlarmSettingCard from '@/features/settings/components/AlarmSettingCard';
import { UserInfoCard } from '@/features/settings/components/UserInfoCard';

export default function SettingsPage() {
  const { data: myInfo, isLoading } = useMyInfoQuery();

  if (isLoading || !myInfo) return <p className="p-10 text-gray-500">불러오는 중...</p>;

  return (
    <div className="flex flex-col pr-10 pl-10 space-y-8">
      {/* 내 정보 */}
      <UserInfoCard member={myInfo} />
      <AvatarsDrawer showEditButton={false} />
      <Separator />
      <AlarmSettingCard />
      <Separator />
      {/* 회원탈퇴 */}
      <DeleteAccountCard />
      <Separator />
      {/* 라이선스 명시 */}
      <LicenseCard />
    </div>
  );
}
