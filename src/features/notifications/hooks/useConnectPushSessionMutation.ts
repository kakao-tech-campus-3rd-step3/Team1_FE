import { webPushApi } from '@/features/notifications/api/webPushApi';
import type {
  ConnectPushSessionRequest,
  ConnectPushSessionResponse,
} from '@/features/notifications/types/pushApiTypes';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export const useConnectPushSessionMutation = () => {
  return useMutation<ConnectPushSessionResponse, Error, ConnectPushSessionRequest>({
    mutationFn: webPushApi.connectSession,
    onSuccess: () => {
      toast.success('QR 연결에 성공했습니다.');
    },
    onError: (err) => {
      console.log(err);
      toast.error('QR 연결에 실패했습니다. QR을 다시 스캔해주세요.');
    },
  });
};
