import BoostRocket from '@/shared/assets/images/boost/rocket-2d.png';
import BoostLogo from '@/shared/assets/images/boost/boost-logo-white.png';
import InfoListAnimation from '@/features/auth/components/InfoListAnimation';

const LeftInfoSection = () => (
  <div className="flex flex-1 flex-col justify-center items-center p-16 overflow-hidden bg-gradient-to-br from-blue-800 via-boost-blue to-boost-blue-hover">
    <div className="text-center">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="flex items-center justify-center w-15 h-15 bg-boost-yellow rounded-2xl shadow-lg">
          <img src={BoostRocket} alt="boost-rocket" className="w-14 h-auto" />
        </div>
        <img src={BoostLogo} alt="boost-logo" className="w-[250px] h-auto" />
      </div>
      <p className="title1-bold text-white leading-relaxed mb-10">
        더 빠르게, 더 쉽게
        <br />
        당신의 프로젝트를 부스트하세요
      </p>
      <InfoListAnimation />
    </div>
  </div>
);

export default LeftInfoSection;
