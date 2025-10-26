import { useMutation } from '@tanstack/react-query';
import { webPushApi } from '../api/pushApi';
import type { CreatePushQrResponse } from '../types/pushApiTypes';
import toast from 'react-hot-toast';

export const useCreatePushSessionMutation = () => {
  return useMutation<CreatePushQrResponse>({
    mutationFn: webPushApi.createQrUrl,
    onSuccess: () => {
      console.log('Push session created successfully');
    },
    onError: () => {
      toast.error('QR 생성 중 문제가 발생했습니다.');
    },
  });
};
