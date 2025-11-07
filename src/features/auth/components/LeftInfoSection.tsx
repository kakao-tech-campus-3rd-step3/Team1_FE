import BoostRocket from '@/shared/assets/images/boost/rocket-2d.png';
import BoostLogo from '@/shared/assets/images/boost/boost-logo-white.png';
import InfoListAnimation from '@/features/auth/components/InfoListAnimation';

const LeftInfoSection = () => (
  <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-16 overflow-hidden bg-gradient-to-br from-blue-800 via-boost-blue to-boost-blue-hover text-center">
    <div className="flex items-center justify-center gap-3 mb-6">
      <div className="flex items-center justify-center w-12 h-12 md:w-15 md:h-15 bg-boost-yellow rounded-2xl shadow-lg">
        <img src={BoostRocket} alt="boost-rocket" className="w-10 md:w-14 h-auto" />
      </div>
      <img src={BoostLogo} alt="boost-logo" className="w-[180px] md:w-[250px] h-auto" />
    </div>

    <p className="title1-bold text-white leading-relaxed mb-6 md:mb-1">
      더 빠르게, 더 쉽게
      <br />
      당신의 프로젝트를 부스트하세요
    </p>

    <div className="w-full max-w-md mx-auto">
      <InfoListAnimation />
    </div>
  </div>
);

export default LeftInfoSection;
