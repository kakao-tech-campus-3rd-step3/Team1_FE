import { Bell, CheckCircle } from 'lucide-react';

export const STATUS_CONTENT = {
  CREATED: {
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
  CONNECTED: {
    icon: CheckCircle,
    title: '기기 연결 완료!',
    message: (
      <>
        QR 인증이 완료되었습니다.
        <br />
        이제 알림 권한을 허용해주세요.
      </>
    ),
    blurClass: 'bg-orange-300/20',
    bgClass: 'bg-orange-50',
    textClass: 'text-orange-500',
  },
  REGISTERED: {
    icon: CheckCircle,
    title: '설정 완료!',
    message: '이제 중요한 알림을 받을 수 있어요.',
    blurClass: 'bg-green-400/20',
    bgClass: 'bg-green-50',
    textClass: 'text-green-500',
  },
} as const;
