import { useQuery } from '@tanstack/react-query';
import { webPushApi } from '@/features/alarm/api/pushApi';

export const useCheckPushStatus = (token?: string) => {
  return useQuery({
    queryKey: ['pushStatus', token],
    queryFn: async () => {
      if (!token) return null;
      const { data } = await webPushApi.checkSubscriptionStatus(token);
      return data;
    },
    enabled: !!token,
    refetchInterval: 3000,
  });
};
