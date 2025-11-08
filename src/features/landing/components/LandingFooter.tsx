import { Button } from '@/shared/components/shadcn/button';
import HelpQr from '@/shared/assets/images/boost/boost-help-qr.png';

const LandingFooter = () => {
  return (
    <div className="mt-24 bg-gray-900 text-white w-screen py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-6">궁금한 점이 있으신가요?</h2>
          <p className="text-gray-300 mb-12 text-lg">
            BOOST에 대해 더 자세히 알고 싶거나 도움이 필요하시다면 <br />
            아래 QR 코드를 스캔 혹은 버튼을 눌러 네이버폼으로 이동해주세요.
          </p>
          <div className="w-56 h-56 bg-gray-800 rounded-xl flex items-center justify-center mb-10 overflow-hidden">
            <img
              src={HelpQr}
              alt="Naver Form QR"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          <Button asChild className="w-60 h-13 text-lg font-medium">
            <a href="https://naver.me/G9pDvPJh" target="_blank" rel="noopener noreferrer">
              네이버폼 바로가기
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingFooter;
