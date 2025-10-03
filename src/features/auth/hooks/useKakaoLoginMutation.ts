import { useMutation } from '@tanstack/react-query';
import type { KakaoLoginRequest, KakaoLoginResponse } from '@/features/auth/types/authTypes';
import { useAuthStore } from '@/features/auth/store/authStore';
import { fetchKaKaoLogin } from '@/features/auth/api/authApi';
import { useNavigate } from 'react-router';
import { ROUTE_PATH } from '@/app/routes/Router';

export const useKakaoLoginMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: KakaoLoginRequest) => fetchKaKaoLogin(data),
    onSuccess: (data: KakaoLoginResponse) => {
      const { setAuth  } = useAuthStore.getState();
      setAuth({ token: data.accessToken });
      // const { accessToken }= useAuthStore.getState();
      navigate(ROUTE_PATH.AVATAR)
    },
    onError:(err)=>{console.dir(err)}
  });
};
