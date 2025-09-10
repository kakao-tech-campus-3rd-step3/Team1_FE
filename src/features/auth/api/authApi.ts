import { api } from '@/shared/api/axiosInstance';
import type { KakaoLoginRequest } from '../types/auth';

//카카오 로그인 (받아온 인가코드와 함께 BE에 전송)
export const fetchKaKaoLogin = async ({ code }: KakaoLoginRequest) => {
  const res = await api.get('auth/kakao/callback', { params: { code } });
  return res.data;
};

// 로그아웃
export const fetchLogout = async () => {
  const res = await api.post('/auth/logout');
  return res.data;
};

// 토큰 재발급
export const fetchRefreshToken = async () => {
  const res = await api.post('/auth/refresh');
  return res.data;
};
