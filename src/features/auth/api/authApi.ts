import api from '@/shared/api/axiosInstance';
import type {
  KakaoLoginRequest,
  KakaoLoginResponse,
  RefreshTokenResponse,
} from '@/features/auth/types/authTypes';
import { useAuthStore } from '@/features/auth/store/authStore';

//카카오 로그인 (받아온 인가코드와 함께 BE에 전송)
export const fetchKaKaoLogin = async ({ code }: KakaoLoginRequest): Promise<KakaoLoginResponse> => {
  const res = await api.post('/auth/login/kakao', {
    code,
    redirectUri: 'http://localhost:5173/auth/callback',
  });
  return res.data;
};

export const fetchLogout = async () => {
  const res = await api.post('/auth/logout');
  return res.data;
};

// 토큰 재발급 (특수한 경우에서만 사용되는 API)
export const fetchRefreshToken = async (): Promise<RefreshTokenResponse> => {
  const { accessToken } = useAuthStore.getState();
  if (!accessToken) {
    console.error('[fetchRefreshToken] ❌ accessToken이 없습니다. 헤더 필수값 누락!');
    throw new Error('Access token is missing — cannot reissue');
  }
  const res = await api.post('/auth/reissue', {}, { withCredentials: true });
  return res.data;
};
export const fetchMyInfo = async () => {
  const res = await api.get('/members/me');
  return res.data;
};
