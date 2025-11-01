import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/app/routes/Router';
import AvatarHeader from '@/features/avatar-picker/components/AvatarHeader';
import AvatarSelector from '@/features/avatar-picker/components/AvatarSelector';
import AvatarInfo from '@/features/avatar-picker/components/AvatarInfo';
import AvatarBackgroundDecorations from '@/features/avatar-picker/components/AvatarBackgroundDecorations';
import AvatarSaveBtn from '@/features/avatar-picker/components/AvatarSaveBtn';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useAvatarStore } from '@/features/avatar-picker/store/useAvatarStore';
import { useUpdateAvatarMutation } from '@/features/settings/hooks/useUpdateAvatarMutation';

const AvatarSettingsPage = () => {
  const { selectedAvatarId, selectedBgColor } = useAvatarStore();
  const setAuth = useAuthStore((s) => s.setAuth);
  const { mutate: saveAvatar } = useUpdateAvatarMutation();
  const navigate = useNavigate();

  const handleSave = () => {
    if (!selectedBgColor) {
      toast.error('배경색을 선택해주세요!');
      return;
    }

    const avatarInfo = {
      avatar: selectedAvatarId,
      backgroundColor: selectedBgColor,
    };

    setAuth({ user: avatarInfo });

    saveAvatar(avatarInfo, {
      onSuccess: () => {
        navigate(ROUTE_PATH.MY_TASK);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      <AvatarBackgroundDecorations />
      <div className="max-w-md mx-auto items-center">
        <AvatarHeader />
        <AvatarSelector />
        <AvatarInfo />
        <AvatarSaveBtn handleSave={handleSave} />
      </div>
    </div>
  );
};

export default AvatarSettingsPage;
