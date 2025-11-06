import { Button } from '@/shared/components/shadcn/button';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/app/routes/Router';
import { motion } from 'framer-motion';
import Boost_3D from '@/shared/assets/images/boost/boost-logo-3d.png';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[80vh] gap-6 sm:gap-10">
        <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
            팀 프로젝트를
            <br />
            <span className="text-boost-blue">쉽게 관리</span>하세요
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            칸반보드로 진행 현황을 확인하고, 서로에게 피드백을 남겨보세요.
            <br />
            대학생 팀프로젝트에 필요한 기능들을 제공합니다!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:justify-start">
            <Button
              onClick={() => navigate(ROUTE_PATH.LOGIN)}
              className="bg-boost-blue shadow-sm h-10 w-full sm:w-auto hover:bg-boost-blue-hover"
              size="lg"
            >
              서비스 경험하기
            </Button>
          </div>
        </div>

        {/* 이미지 영역 */}
        <motion.img
          src={Boost_3D}
          alt="Boost 3D"
          className="w-[400px] justify-self-center mt-6 lg:mt-0"
          animate={{ y: [0, -15, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </div>
  );
};

export default HeroSection;
