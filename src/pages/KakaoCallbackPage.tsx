import { fetchKaKaoLogin } from '@/features/auth/api/authApi';
import { useAuthStore } from '@/features/auth/store/authStore';
import type { KakaoLoginRequest, KakaoLoginResponse } from '@/features/auth/types/auth';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

const KakaoCallbackPage = () => {
  const { mutate } = useMutation({
    mutationFn: (data: KakaoLoginRequest) => fetchKaKaoLogin(data),
    onSuccess: (data: KakaoLoginResponse) => {
      const { setAuth } = useAuthStore.getState();
      setAuth({ token: data.accessToken });
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code) {
      mutate({ code });
    }
  }, [mutate]);
  return <div>로그인 처리 중..</div>;
};

export default KakaoCallbackPage;
