import { useMutation } from '@tanstack/react-query';
import { settingsApi } from '../api/settingsApi';

export const useDeleteAccountMutation = () => {
  return useMutation({
    mutationFn: settingsApi.deleteAccount,
  });
};
