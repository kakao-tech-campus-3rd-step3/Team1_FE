import { useMutation } from '@tanstack/react-query';
import type { KakaoLoginRequest, KakaoLoginResponse } from '@/features/auth/types/authTypes';
import { useAuthStore } from '@/features/auth/store/authStore';
import { fetchKaKaoLogin } from '@/features/auth/api/authApi';
import { useNavigate } from 'react-router';
import { ROUTE_PATH } from '@/app/routes/Router';
import toast from 'react-hot-toast';

const decodeJwt = (token: string) => {
  try {
    const base64Payload = token.split('.')[1];
    const payload = JSON.parse(
      decodeURIComponent(
        Array.from(atob(base64Payload))
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join(''),
      ),
    );
    return payload;
  } catch (err) {
    console.error('JWT 디코딩 실패', err);
    return null;
  }
};

export const useKakaoLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: KakaoLoginRequest) => fetchKaKaoLogin(data),
    onSuccess: (data: KakaoLoginResponse) => {
      const { setAuth } = useAuthStore.getState();
      setAuth({ token: data.accessToken });

      const token = useAuthStore.getState().accessToken;
      if (!token) return;
      //TODO: 최초로그인 여부는 현재 토큰 필드에 USER 가 있으면 되게 했는데
      //백엔드로부터 최초 로그인인지 판단을 해서 필드로 반환해주는 것이 좋다고 해요!
      //논의 후 고쳐야 할 것 같습니다.

      const payload = decodeJwt(token);
      if (payload?.auth === 'USER') {
        const { setAuth } = useAuthStore.getState();
        const user = {
          id: payload.sup,
          name: payload.name,
          profileEmoji: payload.avatar,
          createdAt: new Date(), // 임시로 현재 시간
          updatedAt: new Date(),
        };
        setAuth({ token: data.accessToken, user: user });
        toast.success('로그인이 완료되었습니다.');
        navigate(ROUTE_PATH.AVATAR);
      } else {
        console.warn('JWT에 유저 정보 없음');
      }
    },
    onError: (err) => {
      console.dir(err);
      toast.error('로그인 중 오류가 발생했습니다 😢');
    },
  });
};
