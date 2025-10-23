import { useMutation } from '@tanstack/react-query';
import { avatarApi } from '@/features/avatar-picker/api/avatarApi';

export const useAvatarSaveMutation = () => {
  return useMutation<void, Error, string>({
    mutationFn: async (avatar) => {
      await avatarApi.uploadAvatar(avatar);
    },
  });
};
