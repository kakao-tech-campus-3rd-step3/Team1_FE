import { useMutation, useQueryClient, type InfiniteData } from '@tanstack/react-query';
import type {
  NotificationItem,
  NotificationsResponse,
} from '@/features/notifications/types/NotificationsType';
import { notificationsApi } from '@/features/notifications/api/notificationsApi';

export const useMarkNotificationAsReadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationsApi.markNotificationAsRead(id),

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ['notifications'] });

      const prev = queryClient.getQueryData<InfiniteData<NotificationsResponse>>(['notifications']);
      queryClient.setQueryData<InfiniteData<NotificationsResponse>>(['notifications'], (old) => {
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
      });

      return { prev };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};
