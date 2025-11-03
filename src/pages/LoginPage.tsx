import LeftInfoSection from '@/features/auth/components/LeftInfoSection';
import RightLoginSection from '@/features/auth/components/RightLoginSection';
import { useLocation } from 'react-router-dom';

const LoginPage = () => {
  const redirectUri = import.meta.env.VITE_REDIRECT_URI;
  const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const location = useLocation();

  const handleKakaoLogin = () => {
    const from = location.state?.from || '/my-task';
    localStorage.setItem('login_from', from);
    const encodedRedirectUri = encodeURIComponent(redirectUri);
    const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodedRedirectUri}`;
    window.location.href = kakaoUrl;
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-boost-blue/10 via-boost-blue/5 to-white">
      <div className="flex overflow-hidden w-full max-w-5xl h-[580px] bg-white rounded-3xl shadow-[0_3px_20px_rgb(0,0,0,0.1)]">
        <LeftInfoSection />
        <RightLoginSection onClick={handleKakaoLogin} />
      </div>
    </div>
  );
};

export default LoginPage;
