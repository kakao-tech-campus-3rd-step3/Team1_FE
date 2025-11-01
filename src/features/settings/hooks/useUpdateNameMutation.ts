import { useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsApi } from '@/features/settings/api/settingsApi';

export const useUpdateNameMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => settingsApi.updateName(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myInfo'] });
    },
  });
};
