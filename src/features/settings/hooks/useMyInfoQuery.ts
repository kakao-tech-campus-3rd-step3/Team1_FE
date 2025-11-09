import { useQuery } from '@tanstack/react-query';
import { settingsApi } from '@/features/settings/api/settingsApi';
import { useAuthStore } from '@/features/auth/store/useAuthStore';

export const useMyInfoQuery = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ['myInfo'],
    queryFn: settingsApi.getMyInfo,
    enabled: !!accessToken,
  });
};
