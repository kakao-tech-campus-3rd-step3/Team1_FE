import { notificationsApi } from '@/features/notifications/api/notificationsApi';
import { NOTIFICATION_QUERY_KEYS } from '@/features/notifications/constants/notificationQueryKeys';
import type { NotificationCountsResponse } from '@/features/notifications/types/NotificationsType';
import { useQuery } from '@tanstack/react-query';

export const useNotificationCountsQuery = () => {
  return useQuery<NotificationCountsResponse>({
    queryKey: NOTIFICATION_QUERY_KEYS.counts,
    queryFn: notificationsApi.fetchNotificationCounts,
    staleTime: 1000 * 30,
  });
};
