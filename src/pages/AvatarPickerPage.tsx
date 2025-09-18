import { useState, useEffect } from 'react';
import { getAvatarListUtils, getRandomAvatar } from '@/features/avatar-picker/utils/avatarUtils';
import AvatarHeader from '@/features/avatar-picker/components/AvatarHeader';
import AvartarInfo from '@/features/avatar-picker/components/AvatarInfo';
import AvatarBackgroundDecorations from '../features/avatar-picker/components/AvatarBackgroundDecorations';
import AvartarSaveBtn from '@/features/avatar-picker/components/AvatarSaveBtn';
import AvatarSelector from '@/features/avatar-picker/components/AvatarSelector';

const AvatarSettingsPage = () => {
  const avatarList = getAvatarListUtils();
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // 초기 랜덤 아바타 선택
  useEffect(() => {
    const randomAvatar = getRandomAvatar(avatarList);
    setSelectedAvatar(randomAvatar);
  }, []);

  const handleAvatarSelect = (avatarUrl: string) => {
    setSelectedAvatar(avatarUrl);
    setIsDrawerOpen(false);
  };

  const handleSave = () => {
    console.log('Selected avatar:', selectedAvatar);
    alert('아바타가 저장되었습니다!');
    //TODO: 페이지 이동 구현하기
    //TODO: API 연동하기
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      <AvatarBackgroundDecorations />
      <div className="max-w-md mx-auto items-center">
        <AvatarHeader />
        <AvatarSelector
          isDrawerOpen={isDrawerOpen}
          selectedAvatar={selectedAvatar}
          setIsDrawerOpen={setIsDrawerOpen}
          avatarList={avatarList}
          handleAvatarSelect={handleAvatarSelect}
        />
        <AvartarInfo />
        <AvartarSaveBtn handleSave={handleSave} />
      </div>
    </div>
  );
};

export default AvatarSettingsPage;
