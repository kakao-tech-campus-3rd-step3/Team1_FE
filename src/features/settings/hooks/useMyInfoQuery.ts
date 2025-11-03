import { useQuery } from '@tanstack/react-query';
import { settingsApi } from '@/features/settings/api/settingsApi';

export const useMyInfoQuery = () => {
  return useQuery({
    queryKey: ['myInfo'],
    queryFn: settingsApi.getMyInfo,
  });
};
