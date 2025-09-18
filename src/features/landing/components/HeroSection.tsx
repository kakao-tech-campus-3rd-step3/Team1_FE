import { Button } from '@/shared/components/shadcn/button';
import { useNavigate } from 'react-router';
import { ROUTE_PATH } from '@/app/routes/Router';
import { motion } from 'framer-motion';
import Boost_3D from '@/shared/assets/images/boost-3d.png';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/shadcn/dropdown-menu';

const HeroSection = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const options = [
    { label: '프로젝트 페이지', click: () => navigate(`/project/${123}`) },
    { label: '에러 페이지', click: () => navigate('/error') },
    { label: '아바타 설정ru 페이지', click: () => navigate('/avartar') },
  ];

  return (
    <section id="home" className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
              시작하기
            </Button>

            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="bg-gray-300 shadow-sm w-full sm:w-36 h-10 focus:ring-transparent"
                >
                  데모 보기
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-full sm:w-36 border-gray-300 mt-1">
                {options.map((opt) => (
                  <DropdownMenuItem
                    key={opt.label}
                    className="flex items-center justify-between"
                    onClick={opt.click}
                  >
                    {opt.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
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
    </section>
  );
};

export default HeroSection;
