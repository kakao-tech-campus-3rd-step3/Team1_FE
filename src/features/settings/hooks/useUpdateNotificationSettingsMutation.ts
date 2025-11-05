import { notificationsApi } from '@/features/notifications/api/notificationsApi';
import type { UpdateNotificationSettingsResponse } from '@/features/notifications/types/NotificationsType';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useUpdateNotificationSettingsMutation = (
  setIsServiceAlarmOn: React.Dispatch<React.SetStateAction<boolean>>,
  resetProjectAlarms: () => void,
) => {
  return useMutation<
    UpdateNotificationSettingsResponse,
    Error,
    boolean,
    { previousValue: boolean }
  >({
    mutationFn: (enabled) => notificationsApi.updateNotificationSettings(enabled),

    onMutate: async (enabled) => {
      setIsServiceAlarmOn(enabled);
      return { previousValue: !enabled };
    },

    onError: (_error, _enabled, context) => {
      if (context) {
        setIsServiceAlarmOn(!context.previousValue);
      }
      toast.error('서비스 전체 알림 설정에 실패했습니다');
    },

    onSuccess: (data) => {
      if (!data.enabled) resetProjectAlarms();
      toast.success(data.enabled ? '서비스 알림이 켜졌습니다' : '서비스 전체 알림이 꺼졌습니다');
    },
  });
};
