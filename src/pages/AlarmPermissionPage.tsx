import { Bell, X, CheckCircle } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/shadcn/button';

const STATUS_CONTENT = {
  initial: {
    icon: Bell,
    title: '알림을 허용해주세요',
    message: (
      <>
        중요한 소식을 놓치지 않으려면
        <br />
        알림 권한을 허용해주세요.
      </>
    ),
    blurClass: 'bg-boost-blue/25',
    bgClass: 'bg-boost-blue/20',
    textClass: 'text-boost-blue-pressed',
  },
  granted: {
    icon: CheckCircle,
    title: '설정 완료!',
    message: '이제 중요한 알림을 받을 수 있어요.',
    blurClass: 'bg-green-400/20',
    bgClass: 'bg-green-50',
    textClass: 'text-green-500',
  },
  denied: {
    icon: X,
    title: '알림이 비활성화됨',
    message: '알림을 받을 수 없습니다.',
    blurClass: 'bg-red-400/20',
    bgClass: 'bg-red-50',
    textClass: 'text-red-500',
  },
} as const;

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
  const [permission, setPermission] = useState<'initial' | 'granted' | 'denied'>('initial');

  const handleAllow = () => {
    setPermission('granted');
    toast.success('알림이 활성화되었습니다!');
  };

  const handleDeny = () => {
    setPermission('denied');
    toast.error('알림을 받지 않기로 선택했습니다.');
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
