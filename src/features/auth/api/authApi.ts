import api from '@/shared/api/axiosInstance';
import type {
  KakaoLoginRequest,
  KakaoLoginResponse,
  RefreshTokenResponse,
} from '@/features/auth/types/authTypes';

//카카오 로그인 (받아온 인가코드와 함께 BE에 전송)
export const fetchKaKaoLogin = async ({ code }: KakaoLoginRequest): Promise<KakaoLoginResponse> => {
  console.log('인가코드:', code);
  const res = await api.post('/api/auth/login/kakao', { code });
  return res.data;
};

export const fetchLogout = async () => {
  const res = await api.post('/auth/logout/');
  return res.data;
};

// 토큰 재발급 (특수한 경우에서만 사용되는 API)
export const fetchRefreshToken = async (): Promise<RefreshTokenResponse> => {
  const res = await api.post('/auth/reissue/', {}, { withCredentials: true });
  return res.data;
};
