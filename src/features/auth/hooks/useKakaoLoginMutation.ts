import { useMutation } from '@tanstack/react-query';
import type { KakaoLoginRequest, KakaoLoginResponse } from '@/features/auth/types/authTypes';
import { useAuthStore } from '@/features/auth/store/authStore';
import { fetchKaKaoLogin, fetchMyInfo } from '@/features/auth/api/authApi';
import { useNavigate } from 'react-router';
import { ROUTE_PATH } from '@/app/routes/Router';
import toast from 'react-hot-toast';

export const useKakaoLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: KakaoLoginRequest) => fetchKaKaoLogin(data),
    onSuccess: async (data: KakaoLoginResponse) => {
      const { setAuth } = useAuthStore.getState();
      setAuth({ token: data.accessToken });

      const token = data.accessToken;
      if (!token) return;

      try {
        const myInfo = await fetchMyInfo();
        console.log('내 정보', myInfo);
        setAuth({ token: data.accessToken, user: myInfo });
        toast.success('로그인이 완료되었습니다.');
        navigate(ROUTE_PATH.AVATAR);
      } catch (error) {
        console.error('내 정보 조회 실패:', error);
        toast.error('로그인은 되었지만 사용자 정보를 불러오지 못했습니다 😢');
      }
    },
    onError: (err) => {
      console.dir(err);
      toast.error('로그인 중 오류가 발생했습니다 😢');
    },
  });
};
