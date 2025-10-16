import { Bell, X, CheckCircle } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const STATUS_CONTENT = {
  initial: {
    icon: Bell,
    color: 'blue',
    title: '알림을 허용해주세요',
    message: (
      <>
        중요한 소식을 놓치지 않으려면
        <br />
        알림 권한을 허용해주세요.
      </>
    ),
  },
  granted: {
    icon: CheckCircle,
    color: 'green',
    title: '설정 완료!',
    message: '이제 중요한 알림을 받을 수 있어요.',
  },
  denied: {
    icon: X,
    color: 'red',
    title: '알림이 비활성화됨',
    message: '알림을 받을 수 없습니다.',
  },
};

const StatusView = ({
  status,
  children,
}: {
  status: keyof typeof STATUS_CONTENT;
  children?: React.ReactNode;
}) => {
  const { icon: Icon, color, title, message } = STATUS_CONTENT[status];

  return (
    <div className="h-screen flex flex-col justify-center items-center p-6 space-y-6 text-center">
      <div className="relative inline-block">
        <div className={`absolute inset-0 bg-${color}-400/20 rounded-full blur-xl`} />
        <div className={`relative bg-${color}-50 p-4 rounded-full w-fit mx-auto`}>
          <Icon className={`w-10 h-10 text-${color}-500`} />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {typeof message === 'string' ? (
          <p className="text-sm text-gray-600">{message}</p>
        ) : (
          <p className="text-sm text-gray-600 leading-relaxed">{message}</p>
        )}
      </div>

      {children}
    </div>
  );
};

const WebPushMobile = () => {
  const [permission, setPermission] = useState<'granted' | 'denied' | 'initial'>('initial');

  const handleAllow = () => {
    setPermission('granted');
    toast.success('알림이 활성화되었습니다!');
  };

  const handleDeny = () => {
    setPermission('denied');
    toast.error('알림을 받지 않기로 선택했습니다.');
  };

  if (permission === 'denied') return <StatusView status="denied" />;

  if (permission === 'granted')
    return (
      <StatusView status="granted"/>
    );

  return (
    <StatusView status="initial">
      <div className="space-y-2.5 pt-2 w-full max-w-xs mx-auto">
        <button
          onClick={handleAllow}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          <CheckCircle className="w-4 h-4" />
          허용
        </button>

        <button
          onClick={handleDeny}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          <X className="w-4 h-4" />
          거부
        </button>
      </div>
    </StatusView>
  );
};

export default WebPushMobile;
