import { notificationsApi } from '@/features/notifications/api/notificationsApi';
import { NOTIFICATION_QUERY_KEYS } from '@/features/notifications/constants/notificationQueryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useMarkAllNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationsApi.markAllNotificationAsRead,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEYS.counts });
      toast.success('모든 알림을 읽음 처리했습니다.');
    },

    onError: () => {
      toast.error('알림 읽음 처리에 실패했습니다.');
    },
  });
};
