import { CheckCircle } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/shadcn/button';
import { useSearchParams } from 'react-router-dom';
import { useAlarmPermission } from '@/features/webpush/hooks/useAlarmPermission';
import { STATUS_CONTENT } from '@/features/webpush/constants/alarmStatusContent';
import { WebPushStatus, type WebPushStatusType } from '@/features/webpush/types/pushApiTypes';
import { useConnectPushSessionMutation } from '@/features/webpush/hooks/useConnectPushSessionMutation';

interface StatusViewProps {
  title: string;
  message: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
  blurClass: string;
  bgClass: string;
  textClass: string;
  children?: React.ReactNode;
}

const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  (navigator as unknown as { standalone?: boolean }).standalone === true;

const StatusView = ({
  title,
  message,
  icon: Icon,
  blurClass,
  bgClass,
  textClass,
  children,
}: StatusViewProps) => (
  <div className="flex flex-col h-screen justify-center items-center text-center p-6 space-y-6">
    <div className="relative inline-block">
      <div className={cn('absolute inset-0 rounded-full blur-xs', blurClass)} />
      <div className={cn('relative p-4 rounded-full w-fit mx-auto', bgClass)}>
        <Icon className={cn('w-10 h-10', textClass)} />
      </div>
    </div>

    <div className="space-y-2">
      <h2 className="title1-bold text-gray-900">{title}</h2>
      <p className="subtitle2-regular text-gray-600 leading-relaxed">{message}</p>
    </div>

    {children}
  </div>
);

const AlarmPermissionPage = () => {
  const [params] = useSearchParams();
  const qrToken = params.get('token');
  const { mutate: connectPushSession } = useConnectPushSessionMutation();
  const { registerPushSubscription } = useAlarmPermission(qrToken!);

  const [permission, setPermission] = useState<WebPushStatusType>(WebPushStatus.CREATED);
  const [isLoading, setIsLoading] = useState(false);

  const triedConnectRef = useRef(false);
  const hasShownError = useRef(false);

  useEffect(() => {
    if (!qrToken && !hasShownError.current) {
      toast.error('유효하지 않은 QR 코드입니다.');
      hasShownError.current = true;
      return;
    }

    if (!('serviceWorker' in navigator)) {
      toast.error('이 브라우저는 알림 기능을 지원하지 않습니다.');
      return;
    }

    if (isIOS && !isStandalone()) {
      console.log('iOS Safari → connectPushSession 실행 안 함');
      return;
    }

    if (qrToken && !triedConnectRef.current) {
      triedConnectRef.current = true;
      const deviceInfo = navigator.userAgent;
      connectPushSession({ token: qrToken, deviceInfo });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrToken]);

  const handleAllow = async () => {
    if (!qrToken) {
      toast.error('QR 토큰이 유효하지 않습니다.');
      return;
    }

    try {
      setIsLoading(true);

      const result = await Notification.requestPermission();

      if (result === 'granted') {
        const success = await registerPushSubscription();

        if (success) {
          setPermission(WebPushStatus.REGISTERED);
        } else {
          toast.error('푸시 구독에 실패했습니다. 다시 시도해주세요.');
        }
      } else if (result === 'denied') {
        toast.error('알림이 차단되었습니다. 브라우저 설정에서 알림을 허용해주세요.');
      } else {
        toast('알림 요청이 취소되었습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('[handleAllow error]', error);
      toast.error('알림 권한 설정 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const status = STATUS_CONTENT[permission];
  const shouldShowButton = permission === WebPushStatus.CREATED;

  return (
    <StatusView
      icon={status.icon}
      title={status.title}
      message={status.message}
      blurClass={status.blurClass}
      bgClass={status.bgClass}
      textClass={status.textClass}
    >
      {isIOS && (
        <div className="w-full max-w-xs mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800 leading-relaxed">
            <span className="text-md font-bold">
              {' '}
              📢 IOS 환경 사용자는 아래 단계로 진행해주세요
            </span>
            <br />
            1. Safari에서 <b>공유 버튼</b> 클릭하기
            <br />
            2. <b>홈 화면에 추가</b>하기
            <br />
            3. <b>허용 버튼</b> 클릭
          </p>
        </div>
      )}

      {shouldShowButton && (
        <div className="space-y-2.5 pt-2 w-full max-w-xs mx-auto">
          <Button
            onClick={handleAllow}
            disabled={isLoading}
            className="w-full py-6 bg-boost-blue hover:bg-boost-blue-hover active:bg-boost-blue-pressed text-gray-100 title2-bold duration-300 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle className="w-4 h-4" />
            {isLoading ? '처리 중...' : '허용'}
          </Button>
        </div>
      )}
    </StatusView>
  );
};

export default AlarmPermissionPage;
