import { CheckCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/shadcn/button';
import { useSearchParams } from 'react-router-dom';
import { useAlarmPermission } from '@/features/notifications/hooks/useAlarmPermission';
import { STATUS_CONTENT } from '@/features/notifications/constants/alarmStatusContent';
import { WebPushStatus, type WebPushStatusType } from '@/features/notifications/types/pushApiTypes';
import { useConnectPushSessionMutation } from '@/features/notifications/hooks/useConnectPushSessionMutation';
import { usePushSessionStatusQuery } from '@/features/notifications/hooks/usePushSessionStatusQuery';

const AlarmPermissionPage = () => {
  const [params] = useSearchParams();
  const qrToken = params.get('token');
  const { mutate: connectPushSession } = useConnectPushSessionMutation();
  const [permission, setPermission] = useState<WebPushStatusType>(WebPushStatus.CREATED);
  const { registerPushSubscription } = useAlarmPermission(qrToken!);

  const hasShownError = useRef(false);

  // 서버 구독 상태 폴링 (3초마다)
  const { data: serverStatus } = usePushSessionStatusQuery(qrToken || undefined);

  useEffect(() => {
    const init = async () => {
      if (!qrToken && !hasShownError.current) {
        toast.error('잘못된 QR입니다.');
        hasShownError.current = true;
        return;
      }

      if (!('serviceWorker' in navigator)) {
        toast.error('이 브라우저는 알림을 지원하지 않습니다.');
        return;
      }

      if (qrToken) {
        const deviceInfo = navigator.userAgent;
        connectPushSession({ token: qrToken, deviceInfo });
      }

      // 현재 브라우저 구독 상태 확인
      await checkBrowserSubscriptionStatus();
    };
    init();
  }, [qrToken, connectPushSession]);

  // 서버 상태가 변경되면 permission 업데이트
  useEffect(() => {
    if (serverStatus?.status) {
      setPermission(serverStatus.status);
    }
  }, [serverStatus]);

  const checkBrowserSubscriptionStatus = async () => {
    try {
      const notificationPermission = Notification.permission;

      if (notificationPermission === 'denied') {
        setPermission(WebPushStatus.CREATED);
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (!subscription) {
        setPermission(WebPushStatus.CREATED);
        return;
      }

      // 브라우저에 구독이 있더라도 서버 상태를 기다림
      // serverStatus useEffect에서 처리됨
    } catch (error) {
      console.error('브라우저 구독 상태 확인 실패:', error);
      setPermission(WebPushStatus.CREATED);
    }
  };

  const handleAllow = async () => {
    if (!qrToken) {
      toast.error('QR 토큰이 유효하지 않습니다.');
      return;
    }

    const result = await Notification.requestPermission();

    if (result === 'granted') {
      try {
        // registerPushSubscription이 서버에 구독 정보를 전송
        await registerPushSubscription();
        // 서버 응답을 기다리지 않고 일단 REGISTERED로 설정
        // usePushSessionStatusQuery가 폴링해서 실제 상태를 가져옴
        setPermission(WebPushStatus.REGISTERED);
        toast.success('알림이 활성화되었습니다!');
      } catch (error) {
        console.error('구독 등록 실패:', error);
        toast.error('구독 등록에 실패했습니다. 다시 시도해주세요.');
      }
    } else if (result === 'denied') {
      toast.error('브라우저 설정에서 알림을 허용해주세요.');
    } else {
      toast('알림 요청이 무시되었습니다. 다시 시도해주세요.');
    }
  };

  const status = STATUS_CONTENT[permission];
  return (
    <div className="flex flex-col h-screen justify-center items-center text-center p-6 space-y-6">
      <div className="relative inline-block">
        <div className={cn('absolute inset-0 rounded-full blur-xs', status.blurClass)} />
        <div className={cn('relative p-4 rounded-full w-fit mx-auto', status.bgClass)}>
          <status.icon className={cn('w-10 h-10', status.textClass)} />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="title1-bold text-gray-900">{status.title}</h2>
        <p className="subtitle2-regular text-gray-600 leading-relaxed">{status.message}</p>
      </div>

      <div className="space-y-2.5 pt-2 w-full max-w-xs mx-auto">
        <Button
          onClick={handleAllow}
          className="w-full py-6 bg-boost-blue hover:bg-boost-blue-hover active:bg-boost-blue-pressed text-gray-100 title2-bold duration-300 shadow-md cursor-pointer"
          disabled={permission === WebPushStatus.REGISTERED}
        >
          <CheckCircle className="w-4 h-4" />
          {permission === WebPushStatus.REGISTERED ? '이미 허용됨' : '허용'}
        </Button>
      </div>
    </div>
  );
};

export default AlarmPermissionPage;
