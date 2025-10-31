import { useMutation } from '@tanstack/react-query';
import { settingsApi } from '@/features/settings/api/settingsApi';

export const useDeleteAccountMutation = () => {
  return useMutation({
    mutationFn: settingsApi.deleteAccount,
  });
};
