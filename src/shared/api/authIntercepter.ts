import axios, { type AxiosRequestConfig } from 'axios';
import { handleUnauthorized } from '@/shared/api/errorHandler';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { apiPublic } from '@/shared/api/axiosInstance';
interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}
export const handleUnauthorizedRequest = async (originalRequest: AxiosRequestConfigWithRetry) => {
  originalRequest._retry = true;
  try {
    const { data } = await apiPublic.post(`/auth/reissue`, {}, { withCredentials: true });

    const newAccessToken = data.accessToken;
    useAuthStore.getState().setAuth({ token: newAccessToken });

    if (!originalRequest.headers) originalRequest.headers = {};
    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

    return axios(originalRequest); // 재요청
  } catch (err) {
    // refresh token도 만료
    handleUnauthorized();
    return Promise.reject(err);
  }
};
