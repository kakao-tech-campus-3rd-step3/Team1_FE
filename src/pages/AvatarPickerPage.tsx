import { useState, useEffect, useMemo } from 'react';
import { getAvatarListUtils, getRandomAvatarId } from '@/features/avatar-picker/utils/avatarUtils';
import AvatarHeader from '@/features/avatar-picker/components/AvatarHeader';
import AvatarInfo from '@/features/avatar-picker/components/AvatarInfo';
import AvatarBackgroundDecorations from '@/features/avatar-picker/components/AvatarBackgroundDecorations';
import AvatarSaveBtn from '@/features/avatar-picker/components/AvatarSaveBtn';
import AvatarSelector from '@/features/avatar-picker/components/AvatarSelector';
import { useAuthStore } from '@/features/auth/store/authStore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { ROUTE_PATH } from '@/app/routes/Router';
import { useUpdateAvatarMutation } from '@/features/member/hooks/useUpdateAvatarMutation';

const AvatarSettingsPage = () => {
  const avatarList = useMemo(() => getAvatarListUtils(), []);
  const [selectedAvatarId, setSelectedAvatarId] = useState<number | null>(null);
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  //TODO: 아바타 설정 API 교체 예정
  const updateMemberMutation = useUpdateAvatarMutation(); 

  useEffect(() => {
    const randomId = getRandomAvatarId(avatarList);
    setSelectedAvatarId(randomId);
    setSelectedAvatarUrl(avatarList[randomId]);
  }, [avatarList]);

  const handleAvatarSelect = (id: number) => {
    setSelectedAvatarId(id);
    setSelectedAvatarUrl(avatarList[id]);
  };

  const handleSave = () => {
    if (selectedAvatarId === null) return;

    setAuth({ user: { avatar: String(selectedAvatarId) } });

    updateMemberMutation.mutate(
      { avatar: String(selectedAvatarId) }, 
      {
        onSuccess: () => {
          toast.success('아바타가 저장되었습니다!');
          navigate(ROUTE_PATH.MY_TASK);
        },
        onError: () => {
          toast.error('아바타 저장에 실패했습니다.');
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      <AvatarBackgroundDecorations />
      <div className="max-w-md mx-auto items-center">
        <AvatarHeader />
        <AvatarSelector
          isDrawerOpen={isDrawerOpen}
          selectedAvatar={selectedAvatarUrl}
          setIsDrawerOpen={setIsDrawerOpen}
          avatarList={avatarList}
          handleAvatarSelect={handleAvatarSelect}
        />
        <AvatarInfo />
        <AvatarSaveBtn handleSave={handleSave} />
      </div>
    </div>
  );
};

export default AvatarSettingsPage;
