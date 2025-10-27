import { Bell, CheckCircle, X } from 'lucide-react';

export const STATUS_CONTENT = {
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
