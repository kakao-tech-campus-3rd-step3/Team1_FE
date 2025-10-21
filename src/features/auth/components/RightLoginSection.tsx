import KakaoLoginButton from '@/features/auth/components/KakaoLoginButton';
import BubbleDecoration from './BubbleDecoration';

interface RightLoginPanel {
  onClick: () => void;
}

const RightLoginSection = ({ onClick }: RightLoginPanel) => {
  return (
    <div className="flex-1 p-20 flex flex-col justify-center bg-white">
      <div className="mb-12">
        <h2 className="text-4xl font-extrabold mb-3 text-boost-blue-dark">환영합니다!</h2>
        <p className="text-gray-600 text-base leading-relaxed">
          Boost와 함께 새로운 경험을 시작해보세요.
          <br />
          카카오 계정으로 간편하게 시작할 수 있어요.
        </p>
      </div>
      <div className="relative flex flex-col items-center mt-10">
        <BubbleDecoration />
        <KakaoLoginButton onClick={onClick} />
      </div>

      <div className="flex items-center my-8">
        <div className="flex-1 h-px bg-gray-300" />
        <span className="px-4 label1-regular text-gray-400">간편 로그인</span>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      <div className="bg-gray-200 p-5 rounded-xl">
        <p className="label1-regular text-gray-600 leading-relaxed">
          로그인 시{' '}
          <a href="#" className="text-boost-blue label1-bold hover:underline">
            이용약관
          </a>{' '}
          및{' '}
          <a href="#" className="text-boost-blue label1-bold hover:underline">
            개인정보처리방침
          </a>
          에 동의하게 됩니다.
        </p>
      </div>
    </div>
  );
};

export default RightLoginSection;
