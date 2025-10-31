import { useMutation, useQueryClient } from '@tanstack/react-query';
import { avatarApi } from '@/features/avatar-picker/api/avatarApi';
import type { AvatarInfo } from '@/features/user/types/userTypes';

export const useAvatarSaveMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, AvatarInfo>({
    mutationFn: async ({ avatarId, backgroundColor }) => {
      console.log(avatarId, backgroundColor);
      await avatarApi.uploadAvatar({ avatarId: avatarId, backgroundColor });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myInfo'] });
    },
  });
};
