import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { AlarmClock, ArrowDown, BellRing, SquareCheck } from 'lucide-react';

import BooAlarmClick from '@/shared/assets/images/boost/boo-with-alarm.png';
import AlarmBell from '@/shared/assets/images/boost/alarm-bell.png';
import CircleBox from '@/shared/components/ui/CircleBox';
import { floatVariant, shakeVariant } from '@/shared/utils/animations/motionVariants';
import { useCreatePushSessionMutation } from '@/features/alarm/hooks/useCreatePushSessionMutation';
import toast from 'react-hot-toast';
import { ROUTE_PATH } from '@/app/routes/Router';
import { useNavigate } from 'react-router-dom';
import { usePushSessionStatusQuery } from '@/features/alarm/hooks/usePushSessionStatusQuery';

const AlarmSetupPage = () => {
  const navigate = useNavigate();
  const hasHandledStatus = useRef(false);

  const { mutate: createPushSession, data, isPending } = useCreatePushSessionMutation();
  const { data: statusData } = usePushSessionStatusQuery(data?.token);
  const [qrToken, setQrToken] = useState<string | null>(null);

  useEffect(() => {
    if (data?.token && !qrToken) {
      setQrToken(data.token);
    }
  }, [data, qrToken]);

  const qrData = qrToken
    ? `${window.location.origin}${ROUTE_PATH.ALARM_SETUP_MOBILE}?token=${qrToken}`
    : '';
  useEffect(() => {
    if (!statusData?.status) return;
    if (statusData.status === 'REGISTERED' && !hasHandledStatus.current) {
      hasHandledStatus.current = true;
      toast.success('푸시가 허용되었습니다.');
      navigate(ROUTE_PATH.MY_TASK);
    }
  }, [statusData, navigate]);
  useEffect(() => {
    createPushSession();

    // const interval = setInterval(() => {
    //   createPushSession();
    // }, 30 * 1000); // 30초 간격으로 실행

    // return () => {
    //   clearInterval(interval);
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isPending && !data) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 text-xl font-medium">
        QR 코드 생성 중...
      </div>
    );
  }

  return (
    <div className="flex flex-row h-screen">
      {/* 왼쪽 알림 예시 */}
      <section
        aria-label="Notification examples"
        className="flex flex-col justify-between items-center w-[25%] h-full pl-20 py-22 mr-5"
      >
        <CircleBox
          className="mr-14 bg-boost-yellow"
          variants={floatVariant}
          custom={10}
          animate="animate"
        >
          <BellRing />
          <p>
            할 일이 <br /> 생겼어요!
          </p>
        </CircleBox>
        <CircleBox
          className="ml-24 mb-10 bg-boost-blue-light"
          variants={floatVariant}
          custom={-10}
          animate="animate"
        >
          <AlarmClock />
          마감일이 얼마 <br /> 남지 않았어요!
        </CircleBox>
      </section>

      {/* 중앙 QR 영역 */}
      <section
        aria-label="QR code setup instructions"
        className="flex flex-col items-center justify-between gap-4 w-[50%] pt-10"
      >
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
        <div className="bg-gray-200 p-3 rounded-md">
          {qrData ? <QRCodeSVG value={qrData} size={220} /> : <p>QR 데이터가 없습니다.</p>}
        </div>
        {/* TODO: 만료시간을 어떻게 보여줄 지 논의 후 구 */}
        {/* 남은 시간 표시 */}
        {/* <p className="text-gray-500 font-semibold text-sm">
          남은 시간: {minutes}:{seconds.toString().padStart(2, '0')}
        </p> */}

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
        aria-label="Notification examples"
        className="flex flex-col justify-center items-center ml-5 w-[25%] h-full px-10 pr-30 py-20 pt-10"
      >
        <CircleBox
          className="mr-14 bg-boost-orange"
          variants={floatVariant}
          custom={10}
          animate="animate"
        >
          <SquareCheck />
          팀원의 작업을 <br /> 승인해주세요!
        </CircleBox>
      </section>
    </div>
  );
};

export default AlarmSetupPage;
