import { useQuery } from '@tanstack/react-query';
import { webPushApi } from '@/features/alarm/api/webPushApi';

export const usePushSessionStatusQuery = (token?: string) => {
  return useQuery({
    queryKey: ['pushStatus', token],
    queryFn: async () => {
      if (!token) return null;
      return await webPushApi.getSessionStatus(token);
    },
    enabled: !!token,
    refetchInterval: 3000,
  });
};
