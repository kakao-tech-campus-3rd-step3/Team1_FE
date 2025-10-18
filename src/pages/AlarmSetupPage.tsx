import BooAlarmClick from '@/shared/assets/images/boost/boo-with-alarm.png';
import AlarmBell from '@/shared/assets/images/boost/alarm-bell.png';
import QR from '@/shared/assets/images/qr-code.png';
import { motion } from 'framer-motion';
import { floatVariant, shakeVariant } from '@/shared/utils/animations/motionVariants';
import { AlarmClock, ArrowDown, BellRing, SquareCheck } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

const AlarmSetupPage = () => {
  const circleBox =
    'flex flex-col items-center justify-center gap-2 w-[200px] h-[200px] rounded-full text-center font-semibold text-lg shadow-md text-white';

  return (
    <>
      <div className="flex flex-row h-screen">
        <section
          aria-label="first-section"
          className="flex flex-col justify-between items-center w-[25%] h-full pl-20 py-22 mr-5"
        >
          <motion.div
            className={cn('mr-14 bg-boost-yellow', circleBox)}
            variants={floatVariant}
            custom={10}
            animate="animate"
          >
            <BellRing />
            <p>
              할 일이 <br /> 생겼어요!
            </p>
          </motion.div>
          <motion.div
            className={cn('ml-24 mb-10 bg-boost-blue-light', circleBox)}
            variants={floatVariant}
            custom={-10}
            animate="animate"
          >
            <AlarmClock />
            마감일이 얼마 <br /> 남지 않았어요!
          </motion.div>
        </section>

        <section
          aria-label="second-section"
          className="flex flex-col items-center justify-between gap-4 w-[50%] pt-10"
        >
          {/* 글자 설명 부분 */}
          <div aria-label="text" className="flex flex-col items-center gap-3">
            <div className="text-4xl font-semibold">
              <span className="text-boost-blue-light">알림</span>을 허용해보세요!
            </div>
            <div className="text-gray-600 subtitle1-bold">
              모바일로 하단의 QR 코드를 스캔해주세요!
            </div>
            <ArrowDown className="text-boost-blue-light" />
          </div>

          {/* QR 코드 */}
          <div className="p-4 shadow-md w-fit h-fit rounded-md">
            <img src={QR} alt="qr-code" className="w-40" />
          </div>

          {/* 이미지 부분 */}
          <div aria-label="image" className="flex flex-col items-center">
            <div aria-label="mockup" className="relative w-[640px] mt-1">
              <motion.img
                src={AlarmBell}
                alt="alarm-bell"
                className="absolute w-36 h-auto right-15"
                variants={shakeVariant}
                animate="animate"
              />
              <img src={BooAlarmClick} alt="alarm-mockup" />
            </div>
          </div>
        </section>

        <section
          aria-label="third-section"
          className="flex flex-col justify-center items-center ml-5 w-[25%] h-full px-10 pr-30 py-20 pt-10"
        >
          <motion.div
            className={cn('mr-14 bg-boost-orange', circleBox)}
            variants={floatVariant}
            custom={10}
            animate="animate"
          >
            <SquareCheck />
            팀원의 작업을 <br /> 승인해주세요!
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default AlarmSetupPage;
