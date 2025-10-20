import api from '@/shared/api/axiosInstance';
import type { Member } from '../types/memberTypes';

export const memberApi = {
  // 내 정보 조회
  fetchMyInfo: async (): Promise<Member> => {
    const res = await api.get('members/me');
    return res.data;
  },

  // 내 정보 수정
  updateMemberInfo: async (payload: { name?: string; avatar?: string }): Promise<Member> => {
    const res = await api.put('members/me', payload);
    return res.data;
  },

  // 회원 탈퇴
  deleteMember: async () => {
    const res = await api.delete('members/me');
    return res.data;
  },
};
