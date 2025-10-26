import api from '@/shared/api/axiosInstance';
import type { CreatePushQrResponse } from '../types/pushApiTypes';

export const webPushApi = {
  fetchQrUrl: async (): Promise<CreatePushQrResponse> => {
    const { data } = await api.get('/push/session');
    return data;
  },
};
