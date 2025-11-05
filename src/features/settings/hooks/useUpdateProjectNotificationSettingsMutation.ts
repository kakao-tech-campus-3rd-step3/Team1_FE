import { notificationsApi } from '@/features/notifications/api/notificationsApi';
import type { UpdateProjectNotificationSettingsResponse } from '@/features/notifications/types/NotificationsType';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useUpdateProjectNotificationSettingsMutation = (
  setProjectAlarms: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
) => {
  return useMutation<
    UpdateProjectNotificationSettingsResponse,
    Error,
    { projectId: string; enabled: boolean }
  >({
    mutationFn: ({ projectId, enabled }) =>
      notificationsApi.updateProjectNotificationSettings(projectId, enabled),
    onMutate: async ({ projectId, enabled }) => {
      setProjectAlarms((prev) => ({
        ...prev,
        [projectId]: enabled,
      }));
      return { projectId, enabled };
    },
    onError: (_err, { projectId, enabled }) => {
      setProjectAlarms((prev) => ({
        ...prev,
        [projectId]: !enabled,
      }));
      toast.error('프로젝트 알림 설정 변경에 실패했습니다.');
    },
  });
};
