import { useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsApi } from '@/features/settings/api/settingsApi';

export const useUpdateAvatarMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (avatar: string) => settingsApi.updateAvatar(avatar),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myInfo'] });
    },
  });
};
