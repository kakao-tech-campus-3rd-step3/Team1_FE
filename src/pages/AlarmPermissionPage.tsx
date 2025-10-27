import { X, CheckCircle } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/shadcn/button';
import { useSearchParams } from 'react-router-dom';
import { useAlarmPermission } from '@/features/alarm/hooks/useAlarmPermission';
import { STATUS_CONTENT } from '@/features/alarm/constants/alarmStatusContent';

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
  const token = params.get('token');

  const [permission, setPermission] = useState<'initial' | 'granted' | 'denied'>('initial');
  const { registerPushSubscription, unregisterPushSubscription } = useAlarmPermission(token);

  if (!token) {
    toast.error('잘못된 QR 입니다');
  }
  const handleAllow = async () => {
    const result = await Notification.requestPermission();
    if (result === 'granted') {
      setPermission('granted');
      await registerPushSubscription();
    } else {
      setPermission('denied');
    }
  };

  const handleDeny = async () => {
    setPermission('denied');
    await unregisterPushSubscription();
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
      {permission === 'initial' && (
        <div className="space-y-2.5 pt-2 w-full max-w-xs mx-auto">
          <Button
            onClick={handleAllow}
            className="w-full py-6 bg-boost-blue hover:bg-boost-blue-hover active:bg-boost-blue-pressed text-gray-100 title2-bold duration-300 shadow-md cursor-pointer"
          >
            <CheckCircle className="w-4 h-4" />
            허용
          </Button>

          <Button
            onClick={handleDeny}
            className="w-full py-2.5 px-4 bg-gray-100 text-gray-500 title2-regular hover:bg-gray-100 hover:text-gray-700 hover:font-bold active:text-gray-700 duration-300 cursor-pointer"
          >
            <X className="w-4 h-4" />
            알림을 받지 않을래요
          </Button>
        </div>
      )}
    </StatusView>
  );
};

export default AlarmPermissionPage;
