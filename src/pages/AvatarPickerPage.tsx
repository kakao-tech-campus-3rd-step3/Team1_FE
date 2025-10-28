import { useState } from 'react';

import AvatarHeader from '@/features/avatar-picker/components/AvatarHeader';
import AvatarInfo from '@/features/avatar-picker/components/AvatarInfo';
import AvatarBackgroundDecorations from '@/features/avatar-picker/components/AvatarBackgroundDecorations';
import AvatarSaveBtn from '@/features/avatar-picker/components/AvatarSaveBtn';
import AvatarSelector from '@/features/avatar-picker/components/AvatarSelector';
import { useAuthStore } from '@/features/auth/store/authStore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/app/routes/Router';
import { getRandomAvatarId } from '@/features/avatar-picker/utils/avatarUtils';
import { useAvatarSaveMutation } from '@/features/avatar-picker/hooks/useAvatarSaveMutation';

const AvatarSettingsPage = () => {
  const [selectedAvatarId, setSelectedAvatarId] = useState<string>(() => getRandomAvatarId());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { mutate: saveAvatar } = useAvatarSaveMutation();

  const handleAvatarSelect = (id: string) => {
    setSelectedAvatarId(id);
  };

  const handleSave = () => {
    setAuth({ user: { avatar: String(selectedAvatarId) } });

    saveAvatar(String(selectedAvatarId), {
      onSuccess: () => {
        toast.success('아바타가 저장되었습니다!');
        navigate(ROUTE_PATH.MY_TASK);
      },
      onError: () => {
        toast.error('아바타 저장에 실패했습니다.');
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      <AvatarBackgroundDecorations />
      <div className="max-w-md mx-auto items-center">
        <AvatarHeader />
        <AvatarSelector
          isDrawerOpen={isDrawerOpen}
          selectedAvatar={selectedAvatarId}
          setIsDrawerOpen={setIsDrawerOpen}
          handleAvatarSelect={handleAvatarSelect}
        />
        <AvatarInfo />
        <AvatarSaveBtn handleSave={handleSave} />
      </div>
    </div>
  );
};

export default AvatarSettingsPage;
