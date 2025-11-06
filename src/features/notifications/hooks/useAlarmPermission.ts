import toast from 'react-hot-toast';
import { webPushApi } from '@/features/notifications/api/webPushApi';
import { normalizeSubscription } from '@/features/notifications/utils/normalizeSubscription';

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
};

export const useAlarmPermission = (token: string | null) => {
  const registerPushSubscription = async () => {
    try {
      if (!token) {
        toast.error('QR 토큰이 유효하지 않습니다.');
        return;
      }

      const registration = await navigator.serviceWorker
        .register('/service-worker.js')
        .catch((err) => {
          toast.error('서비스 워커 등록에 실패했습니다.');
          throw err;
        });

      const existing = await registration.pushManager.getSubscription();

      const targetSub =
        existing ??
        (await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(import.meta.env.VITE_VAPID_PUBLIC_KEY),
        }));

      const subData = normalizeSubscription(targetSub.toJSON());

      await webPushApi.registerSubscription({
        token,
        webPushUrl: subData.endpoint,
        publicKey: subData.keys.p256dh,
        authKey: subData.keys.auth,
      });
      toast.success('알림이 활성화되었습니다!');
    } catch (error) {
      console.error('[registerPushSubscription error]', error);
      toast.error('푸시 구독 등록 중 오류가 발생했습니다.');
    }
  };

  return { registerPushSubscription };
};
