import { useQuery } from '@tanstack/react-query';
import { webPushApi } from '@/features/webpush/api/webPushApi';

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
