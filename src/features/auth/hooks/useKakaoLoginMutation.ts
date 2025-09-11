import { useMutation } from '@tanstack/react-query';
import type { KakaoLoginRequest, KakaoLoginResponse } from '../types/authTypes';
import { useAuthStore } from '../store/authStore';
import { fetchKaKaoLogin } from '../api/authApi';

export const useKakaoLoginMutation = () => {
  return useMutation({
    mutationFn: (data: KakaoLoginRequest) => fetchKaKaoLogin(data),
    onSuccess: (data: KakaoLoginResponse) => {
      const { setAuth } = useAuthStore.getState();
      setAuth({ token: data.accessToken });
    },
  });
};
