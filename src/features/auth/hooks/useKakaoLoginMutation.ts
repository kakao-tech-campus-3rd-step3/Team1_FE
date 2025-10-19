import { useMutation } from '@tanstack/react-query';
import type { KakaoLoginRequest, KakaoLoginResponse } from '@/features/auth/types/authTypes';
import { useAuthStore } from '@/features/auth/store/authStore';
import { fetchKaKaoLogin } from '@/features/auth/api/authApi';
import { useNavigate } from 'react-router';
import { ROUTE_PATH } from '@/app/routes/Router';
import toast from 'react-hot-toast';

export const useKakaoLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: KakaoLoginRequest) => {
      const loginData: KakaoLoginResponse = await fetchKaKaoLogin(data);
      const { setAuth } = useAuthStore.getState();
      setAuth({ token: loginData.accessToken, user: loginData.memberResponseDto });

      return loginData.isNewUser;
    },
    onSuccess: (isNewUser) => {
      toast.success('로그인이 완료되었습니다.');
      if (isNewUser)
         navigate(ROUTE_PATH.AVATAR);
      else navigate(ROUTE_PATH.MY_TASK)
    },
    onError: (err) => {
      console.dir(err);
      toast.error('로그인 중 오류가 발생했습니다 😢');
    },
  });
};
