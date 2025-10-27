import { useMutation } from '@tanstack/react-query';
import { webPushApi } from '../api/webPushApi';
import toast from 'react-hot-toast';
import type { CreatePushSessionResponse } from '@/features/alarm/types/pushApiTypes';

export const useCreatePushSessionMutation = () => {
  return useMutation<CreatePushSessionResponse>({
    mutationFn: webPushApi.createSession,
    onSuccess: () => {
      console.log('Push session created successfully');
    },
    onError: () => {
      toast.error('QR 생성 중 문제가 발생했습니다.');
    },
  });
};
