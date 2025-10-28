import api from '@/shared/api/axiosInstance';
import type { MyInfoResponse, UpdateMyInfoRequest } from '../types/settingsTypes';
export const settingsApi = {
  getMyInfo: async (): Promise<MyInfoResponse> => {
    const { data } = await api.get('/members/me');
    return data;
  },

  updateMyInfo: async (payload: UpdateMyInfoRequest): Promise<void> => {
    await api.put('/members/me', payload);
  },

  // 회원 탈퇴
  deleteAccount: async (): Promise<void> => {
    await api.delete('/members/me');
  },
};
