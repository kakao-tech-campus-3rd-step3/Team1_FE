import { useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsApi } from '@/features/settings/api/settingsApi';
import toast from 'react-hot-toast';
import type { MyInfoResponse } from '@/features/settings/types/settingsTypes';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import type { AvatarInfo } from '@/features/user/types/userTypes';

interface UpdateAvatarPayload {
  avatar: string;
  backgroundColor: string;
}

export const useUpdateAvatarMutation = () => {
  const queryClient = useQueryClient();
  const { user, setAuth } = useAuthStore.getState();

  return useMutation<AvatarInfo, Error, UpdateAvatarPayload, { previousMyInfo?: MyInfoResponse }>({
    mutationFn: (data) => settingsApi.updateAvatar(data),

    onMutate: async (newAvatar) => {
      await queryClient.cancelQueries({ queryKey: ['myInfo'] });

      const previousMyInfo = queryClient.getQueryData<MyInfoResponse>(['myInfo']);

      if (previousMyInfo) {
        queryClient.setQueryData<MyInfoResponse>(['myInfo'], {
          ...previousMyInfo,
          avatar: newAvatar.avatar,
          backgroundColor: newAvatar.backgroundColor,
        });
      }

      return { previousMyInfo };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousMyInfo) {
        queryClient.setQueryData(['myInfo'], context.previousMyInfo);
      }
      toast.error('아바타 변경에 실패했습니다.');
    },

    onSuccess: (updated) => {
      if (user) {
        setAuth({
          user: {
            ...user,
            avatar: updated.avatar,
            backgroundColor: updated.backgroundColor,
          },
        });
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['myInfo'] });
    },
  });
};
