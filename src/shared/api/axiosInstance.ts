import { useAuthStore } from '@/features/auth/store/useAuthStore';
import axios from 'axios';
import { handleGeneralApiError } from '@/shared/api/errorHandler';
import { handleUnauthorizedRequest } from '@/shared/api/authIntercepter';
// TODO: 인증 불필요 API에도 토큰이 붙음 → 보안상 불필요. 나중에 apiPublic 같은 인스턴스 분리 고려
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, //쿠키를 포함한 요청을 보냅니다.
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiPublic = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      return handleUnauthorizedRequest(originalRequest);
    }
    //인증 외 일반 API 에러
    handleGeneralApiError(error);
    return Promise.reject(error);
  },
);

export default api;
