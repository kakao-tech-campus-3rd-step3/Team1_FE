import { CheckCircle } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/shadcn/button';
import { useSearchParams } from 'react-router-dom';
import { useAlarmPermission } from '@/features/alarm/hooks/useAlarmPermission.ts';
import { STATUS_CONTENT } from '@/features/alarm/constants/alarmStatusContent';
import type { WebPushStatusType } from '@/features/alarm/types/pushApiTypes';
import { useConnectPushSessionMutation } from '@/features/alarm/hooks/useConnectPushSessionMutation';

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
  const [permission, setPermission] = useState<WebPushStatusType>('CREATED');
  const { registerPushSubscription } = useAlarmPermission(qrToken);

  const hasShownError = useRef(false);

  useEffect(() => {
    if (!qrToken && !hasShownError.current) {
      toast.error('잘못된 QR 입니다');
      hasShownError.current = true;
      return;
    }

    if (!('serviceWorker' in navigator && 'PushManager' in window)) {
      toast.error('지원하지 않는 브라우저입니다.');
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

    const result = await Notification.requestPermission();

    if (result === 'granted') {
      await registerPushSubscription();
      setPermission('REGISTERED');
      toast.success('알림이 활성화되었습니다!');
    } else {
      toast.error('알림 허용이 필요합니다.');
    }
  };

  const status = STATUS_CONTENT[permission];
  return (
    <StatusView
      icon={status.icon}
      title={status.title}
      message={status.message}
      blurClass={status.blurClass}
      bgClass={status.bgClass}
      textClass={status.textClass}
    >
      {permission === 'CREATED' && (
        <div className="space-y-2.5 pt-2 w-full max-w-xs mx-auto">
          <Button
            onClick={handleAllow}
            className="w-full py-6 bg-boost-blue hover:bg-boost-blue-hover active:bg-boost-blue-pressed text-gray-100 title2-bold duration-300 shadow-md cursor-pointer"
          >
            <CheckCircle className="w-4 h-4" />
            허용
          </Button>
        </div>
      )}
    </StatusView>
  );
};

export default AlarmPermissionPage;
