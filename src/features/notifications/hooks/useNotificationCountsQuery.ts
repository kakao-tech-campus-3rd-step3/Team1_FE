import { notificationsApi } from '@/features/notifications/api/notificationsApi';
import type { NotificationCountsResponse } from '@/features/notifications/types/NotificationsType';
import { useQuery } from '@tanstack/react-query';

export const useNotificationCountsQuery = () => {
  return useQuery<NotificationCountsResponse>({
    queryKey: ['notifications', 'counts'],
    queryFn: notificationsApi.fetchNotificationCounts,
    staleTime: 1000 * 30,
  });
};
