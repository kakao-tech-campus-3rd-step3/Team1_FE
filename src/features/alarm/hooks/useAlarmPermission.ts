import toast from 'react-hot-toast';
import { webPushApi } from '@/features/alarm/api/webPushApi';
import { normalizeSubscription } from '@/features/alarm/utils/normalizeSubscription';

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
};

export const useAlarmPermission = (token: string | null) => {
  const registerPushSubscription = async () => {
    try {
      if (!('serviceWorker' in navigator)) {
        toast.error('지원하지 않는 브라우저입니다.');
        return;
      }

      if (!token) {
        toast.error('로그인 후 이용 가능합니다.');
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      const existing = await registration.pushManager.getSubscription();
      if (existing) {
        toast('이미 푸시 구독이 활성화되어 있습니다.');
        return;
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(import.meta.env.VITE_VAPID_PUBLIC_KEY),
      });

      const subData = normalizeSubscription(subscription.toJSON());
      await webPushApi.registerSubscription({
        token,
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

  return { registerPushSubscription };
};
