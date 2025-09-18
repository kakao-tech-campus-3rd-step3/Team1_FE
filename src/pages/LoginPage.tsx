import { Button } from '@/shared/components/shadcn/button';
import Logo from '@/shared/assets/images/boost-3d.png';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/shadcn/card';
import KakaoLogin from '@/shared/assets/images/kakao_login.png';

const LoginPage = () => {
  const handleKakaoLogin = () => {
    //TODO: 인증 URL 받으면 아래의 주소도 수정할 예정입니다.
    // window.location.href = '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      {/* 배경 장식 요소들 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <Card className="w-full max-w-md relative backdrop-blur-sm bg-white/80 border-0 shadow-2xl">
        <CardHeader className="space-y-6 pb-8">
          {/* 로고 이미지 가운데 정렬 및 크기 조정 */}
          <div className="flex justify-center">
            <img src={Logo} alt="서비스 로고" className="w-32 h-32 object-contain" />
          </div>

          <div className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              환영합니다
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              간편하게 로그인하고 서비스를 시작하세요
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col items-center pb-8">
          {/* 카카오 로그인 버튼 - 가운데 정렬 */}
          <Button
            className="cursor-pointer bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent border-0 shadow-none p-0"
            onClick={handleKakaoLogin}
            size="lg"
          >
            <img
              className="w-60 h-auto rounded-lg hover:scale-105 transition-transform duration-200"
              src={KakaoLogin}
              alt="카카오로 로그인"
            />
          </Button>

          {/* 하단 안내 텍스트 */}
          <div className="text-center space-y-4 pt-6 w-full">
            <p className="text-sm text-gray-500">
              로그인 시
              <button className="text-blue-600 hover:text-blue-700 underline underline-offset-2 transition-colors">
                서비스 약관
              </button>
              및
              <button className="text-blue-600 hover:text-blue-700 underline underline-offset-2 transition-colors">
                개인정보처리방침
              </button>
              에 동의한 것으로 간주됩니다.
            </p>

            <div className="flex items-center justify-center space-x-6 text-sm">
              <button className="text-gray-600 hover:text-gray-800 transition-colors">
                고객센터
              </button>
              <div className="w-px h-4 bg-gray-300"></div>
              <button className="text-gray-600 hover:text-gray-800 transition-colors">
                도움말
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
