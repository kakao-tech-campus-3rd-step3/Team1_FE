import { useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsApi } from '@/features/settings/api/settingsApi';
import toast from 'react-hot-toast';

interface UpdateAvatarPayload {
  avatar: string;
  backgroundColor: string;
}
export const useUpdateAvatarMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UpdateAvatarPayload>({
    mutationFn: (data) => settingsApi.updateAvatar(data),
    onSuccess: () => {
      toast.success('아바타가 변경되었습니다!');
      queryClient.invalidateQueries({ queryKey: ['myInfo'] });
    },
    onError: () => {
      toast.error('아바타 변경에 실패했습니다.');
    },
  });
};
