import { notificationsApi } from '@/features/notifications/api/notificationsApi';
import type { UpdateNotificationSettingsResponse } from '@/features/notifications/types/NotificationsType';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useUpdateNotificationSettingsMutation = () => {
  return useMutation<UpdateNotificationSettingsResponse, Error, boolean>({
    mutationFn: (enabled: boolean) => notificationsApi.updateNotificationSettings(enabled),
    onSuccess: (data) => {
      toast.success(data.enabled ? '알림이 활성화되었습니다.' : '알림이 비활성화되었습니다.');
    },
    onError: () => {
      toast.error('서비스 전체 알림 설정에 실패했습니다');
    },
  });
};
