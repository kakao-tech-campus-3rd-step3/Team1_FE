import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { webPushApi } from '@/features/alarm/api/webPushApi';
import { normalizeSubscription } from '@/features/alarm/utils/normalizeSubscription';

export const useAlarmPermission = (token: string | null) => {
  useEffect(() => {
    if (!token) return;

    const connectQrSession = async () => {
      try {
        const deviceInfo = navigator.userAgent;
        await webPushApi.connectSession({ token, deviceInfo });
        console.log('QR 세션 연결 성공');
      } catch (error) {
        console.error('[connectSession error]', error);
        toast.error('QR 세션 연결에 실패했습니다.');
      }
    };
    connectQrSession();
  }, [token]);

  const registerPushSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY,
      });

      const subData = normalizeSubscription(subscription.toJSON());
      await webPushApi.registerSubscription({
        token: token ?? '',
        webPushUrl: subData.endpoint,
        publicKey: subData.keys.p256dh,
        authKey: subData.keys.auth,
      });

      toast.success('푸시 구독이 완료되었습니다!');
    } catch (error) {
      console.error('[registerPushSubscription error]', error);
      toast.error('푸시 구독 등록에 실패했습니다.');
    }
  };

  const unregisterPushSubscription = async () => {
    try {
      await webPushApi.unregisterSubscription(token ?? '');
      toast('알림을 받지 않기로 선택했습니다.', { icon: '🔕' });
    } catch (error) {
      console.error('[unregisterSubscription error]', error);
      toast.error('푸시 구독 해제에 실패했습니다.');
    }
  };

  return { registerPushSubscription, unregisterPushSubscription };
};
