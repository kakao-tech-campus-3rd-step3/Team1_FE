import { notificationsApi } from '@/features/notifications/api/notificationsApi';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useEnableServiceAlarmMutation = () => {
  return useMutation({
    mutationFn: () => notificationsApi.updateNotificationSettings(true),

    onSuccess: () => {
      toast.success('이제 웹푸시를 받아볼 수 있습니다.');
    },

    onError: () => {
      toast.error('설정 페이지에서 웹푸시 알림을 켤 수 있습니다.');
    },
  });
};
