import { notificationsApi } from '@/features/notifications/api/notificationsApi';
import type { UpdateProjectNotificationSettingsResponse } from '@/features/notifications/types/NotificationsType';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useUpdateProjectNotificationSettingsMutation = () => {
  return useMutation<
    UpdateProjectNotificationSettingsResponse,
    Error,
    { projectId: string; enabled: boolean }
  >({
    mutationFn: ({ projectId, enabled }) =>
      notificationsApi.updateProjectNotificationSettings(projectId, enabled),
    onError: () => {
      toast.error('프로젝트 알림 설정 변경에 실패했습니다.');
    },
  });
};
