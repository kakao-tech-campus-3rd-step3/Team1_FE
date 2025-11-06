import { CheckCircle } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/shadcn/button';
import { useSearchParams } from 'react-router-dom';
import { useAlarmPermission } from '@/features/notifications/hooks/useAlarmPermission';
import { STATUS_CONTENT } from '@/features/notifications/constants/alarmStatusContent';
import { WebPushStatus, type WebPushStatusType } from '@/features/notifications/types/pushApiTypes';
import { useConnectPushSessionMutation } from '@/features/notifications/hooks/useConnectPushSessionMutation';

interface StatusViewProps {
  title: string;
  message: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
  blurClass: string;
  bgClass: string;
  textClass: string;
  children?: React.ReactNode;
}

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
  const [permission, setPermission] = useState<WebPushStatusType>(WebPushStatus.CREATED);
  const [isLoading, setIsLoading] = useState(false);
  const { registerPushSubscription } = useAlarmPermission(qrToken!);

  const hasShownError = useRef(false);

  useEffect(() => {
    if (!qrToken && !hasShownError.current) {
      toast.error('잘못된 QR 입니다');
      hasShownError.current = true;
      return;
    }
    if (!('serviceWorker' in navigator)) {
      toast.error('이 브라우저는 Service Worker를 지원하지 않습니다.');
      return;
    }
    if (qrToken) {
      const deviceInfo = navigator.userAgent;
      connectPushSession({ token: qrToken, deviceInfo });
    }
  }, [qrToken, connectPushSession]);

  const handleAllow = async () => {
    if (!qrToken) {
      toast.error('QR 토큰이 유효하지 않습니다.');
      return;
    }

    try {
      setIsLoading(true);
      const result = await Notification.requestPermission();

      if (result === 'granted') {
        // registerPushSubscription
        // 1. 기존 구독 확인
        // 2. 없으면 새로 생성
        // 3. 백엔드에 등록
        await registerPushSubscription();
        setPermission(WebPushStatus.REGISTERED);
      } else if (result === 'denied') {
        toast.error('알림이 차단되었습니다. 브라우저 설정에서 알림을 허용해주세요.');
      } else {
        toast.error('알림 허용이 필요합니다.');
      }
    } catch (error) {
      console.error('[handleAllow error]', error);
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
