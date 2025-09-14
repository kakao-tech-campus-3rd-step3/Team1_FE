import { useMutation } from '@tanstack/react-query';
import type { KakaoLoginRequest, KakaoLoginResponse } from '@/features/auth/types/authTypes';
import { useAuthStore } from '@/features/auth/store/authStore';
import { fetchKaKaoLogin } from '@/features/auth/api/authApi';

export const useKakaoLoginMutation = () => {
  return useMutation({
    mutationFn: (data: KakaoLoginRequest) => fetchKaKaoLogin(data),
    onSuccess: (data: KakaoLoginResponse) => {
      const { setAuth } = useAuthStore.getState();
      setAuth({ token: data.accessToken });
    },
  });
};
