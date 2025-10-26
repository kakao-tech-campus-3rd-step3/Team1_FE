import api from '@/shared/api/axiosInstance';
import type {
  CreatePushQrResponse,
  PushSubscriptionRequest,
  PushSubscriptionResponse,
} from '../types/pushApiTypes';
// TODO: API 명세 나오면 수정해야해요!
export const webPushApi = {
  createQrUrl: async (): Promise<CreatePushQrResponse> => {
    const { data } = await api.post('/push/session');
    return data;
  },
  registSubscription: async (
    payload: PushSubscriptionRequest,
  ): Promise<PushSubscriptionResponse> => {
    const { data } = await api.post('/push/subscription', payload);
    return data;
  },
  unregisterSubscription: async (token: string): Promise<void> => {
    await api.delete(`/push/subscription`, {
      data: { token },
    });
  },
};
