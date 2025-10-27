import api from '@/shared/api/axiosInstance';
import type {
  CreatePushQrResponse,
  PushSubscriptionRequest,
  PushSubscriptionResponse,
} from '../types/pushApiTypes';
// TODO: API 명세 나오면 수정해야해요!

export const webPushApi = {
  // QR 생성
  createQrUrl: async (): Promise<CreatePushQrResponse> => {
    const { data } = await api.post('/push/session');
    return data;
  },
  // 푸시 구독 허용
  registSubscription: async (
    payload: PushSubscriptionRequest,
  ): Promise<PushSubscriptionResponse> => {
    const { data } = await api.post('/push/subscription', payload);
    return data;
  },
  // 푸시 구독 거부
  unregisterSubscription: async (token: string): Promise<void> => {
    await api.delete(`/push/subscription`, {
      data: { token },
    });
  },
  //푸시 구독 상태 체크
  checkSubscriptionStatus: async (token: string) => {
    return api.get(`/push/session/${token}/status`);
  },
};
