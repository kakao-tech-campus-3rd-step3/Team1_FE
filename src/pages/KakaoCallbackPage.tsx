import { useKakaoLoginMutation } from '@/features/auth/hooks/useKakaoLoginMutation';
import { useEffect } from 'react';

const KakaoCallbackPage = () => {
  const { mutate: kakaoLoginMutation } = useKakaoLoginMutation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code) {
      console.log('인가코드:', code);
      kakaoLoginMutation({ code });
    }
  }, [kakaoLoginMutation]);
  return null; //백그라운드 로그인 처리용 페이지이므로 null 처리
};

export default KakaoCallbackPage;
