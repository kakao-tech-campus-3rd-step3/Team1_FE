import { useMutation } from '@tanstack/react-query';
import { webPushApi } from '@/features/notifications/api/webPushApi';
import toast from 'react-hot-toast';
import type { CreatePushSessionResponse } from '@/features/notifications/types/pushApiTypes';

export const useCreatePushSessionMutation = (
  onSuccessCallback?: (data: CreatePushSessionResponse) => void,
) => {
  return useMutation<CreatePushSessionResponse>({
    mutationFn: webPushApi.createSession,
    onSuccess: (res) => {
      console.log('Push session created successfully');
      onSuccessCallback?.(res);
    },
    onError: () => {
      toast.error('QR 생성 중 문제가 발생했습니다.');
    },
  });
};
