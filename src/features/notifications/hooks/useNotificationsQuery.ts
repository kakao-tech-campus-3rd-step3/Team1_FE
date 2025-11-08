import { useInfiniteQuery } from '@tanstack/react-query';
import { notificationsApi } from '@/features/notifications/api/notificationsApi';
import type { NotificationsResponse } from '@/features/notifications/types/NotificationsType';
import { NOTIFICATION_QUERY_KEYS } from '@/features/notifications/constants/notificationQueryKeys';

export const useNotificationsQuery = () => {
  return useInfiniteQuery<NotificationsResponse, Error>({
    queryKey: NOTIFICATION_QUERY_KEYS.list,

    queryFn: async ({ pageParam }) => {
      return notificationsApi.fetchNotifications(pageParam as string | undefined, 5);
    },

    initialPageParam: undefined,

    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor : undefined),
  });
};
