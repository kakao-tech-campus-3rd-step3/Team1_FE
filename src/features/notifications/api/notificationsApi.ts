import type {
  MarkNotificationAsReadResponse,
  NotificationsResponse,
} from '@/features/notifications/types/NotificationsType';
import api from '@/shared/api/axiosInstance';

export const notificationsApi = {
  fetchNotifications: async (cursor?: string, limit = 10): Promise<NotificationsResponse> => {
    const { data } = await api.get<NotificationsResponse>('/notifications', {
      params: { cursor, limit },
    });
    return data;
  },
  markNotificationAsRead: async (
    notificationId: string,
  ): Promise<MarkNotificationAsReadResponse> => {
    const { data } = await api.patch(`/notifications/${notificationId}/read`);
    return data;
  },
};
