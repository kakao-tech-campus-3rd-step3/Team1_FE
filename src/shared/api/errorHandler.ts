import { useAuthStore } from '@/features/auth/store/authStore';
import type { AxiosError } from 'axios';

export class ApiError extends Error {
  public status: number;
  public originalError?: AxiosError;

  constructor(message: string, status: number, originalError?: AxiosError) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.originalError = originalError;
  }
}

interface ApiErrorResponse {
  message: string;
}

export const handleUnauthorized = (error?: AxiosError) => {
  const clearAuth = useAuthStore.getState().clearAuth;
  clearAuth();
  // alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
  return Promise.reject(error);
};

export const handleGeneralApiError = (error: AxiosError<ApiErrorResponse>) => {
  if (!error.response) {
    alert('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요');
    return;
  }
  const { status, data } = error.response;
  switch (status) {
    case 401:
      return handleUnauthorized(error);

    case 500:
      //500 에러일때 에러바운더리에 걸리게 함
      throw new ApiError(data?.message || '서버 에러가 발생했습니다. ', status, error);

    case 409:
      // 409 : API 훅에서 필요에 따라 처리
      throw error;

    case 404:
      // 404 : API 훅에서 필요에 따라 처리
      throw error;

    case 403:
      // 403 : API 훅에서 필요에 따라 처리
      throw error;

    case 400:
      // 400 : API 훅에서 필요에 따라 처리
      throw error;

    default:
      alert(data.message || '알 수 없는 오류가 발생했습니다.');
  }
};
//TODO: BE와 에러코드에 관한 논의 후 더 추가할 예정
