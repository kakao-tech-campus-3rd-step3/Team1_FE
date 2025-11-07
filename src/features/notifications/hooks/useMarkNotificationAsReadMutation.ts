import { useMutation, useQueryClient, type InfiniteData } from '@tanstack/react-query';
import type {
  NotificationItem,
  NotificationsResponse,
} from '@/features/notifications/types/NotificationsType';
import { notificationsApi } from '@/features/notifications/api/notificationsApi';
import { NOTIFICATION_QUERY_KEYS } from '@/features/notifications/constants/notificationQueryKeys';

export const useMarkNotificationAsReadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationsApi.markNotificationAsRead(id),

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: NOTIFICATION_QUERY_KEYS.all });

      const prev = queryClient.getQueryData<InfiniteData<NotificationsResponse>>(
        NOTIFICATION_QUERY_KEYS.list,
      );

      queryClient.setQueryData<InfiniteData<NotificationsResponse>>(
        NOTIFICATION_QUERY_KEYS.list,
        (old) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              notifications: page.notifications.map((n: NotificationItem) =>
                n.id === id ? { ...n, read: true } : n,
              ),
            })),
          };
        },
      );

      return { prev };
    },

    onError: (_err, _id, context) => {
      if (context?.prev) {
        queryClient.setQueryData(NOTIFICATION_QUERY_KEYS.list, context.prev);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEYS.counts });
    },
  });
};
