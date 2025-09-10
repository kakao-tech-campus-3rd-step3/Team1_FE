import { useAuthStore } from '@/features/auth/store/authStore';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:4000', // 추후 백엔드 주소로 교체
  withCredentials: true, //쿠키를 포함한 요청을 보냅니다.
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore();
  if (token) {
    //헤더에 access token 붙여서 보내기
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // access token 만료 (401) + 재시도 안한 요청이라면
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // refresh token은 쿠키에 있으니 그냥 요청만 보내면 됨
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );

        const newAccessToken = data.accessToken;
        useAuthStore.getState().setAuth({ token: newAccessToken });

        // 새 access token으로 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        //엑세스, 리프레시 둘다 만료되었을 때
        if (refreshError.response?.status === 401) {
          useAuthStore.getState().clearAuth();

          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
