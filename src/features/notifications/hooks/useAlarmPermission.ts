import toast from 'react-hot-toast';
import { webPushApi } from '@/features/notifications/api/webPushApi';
import { normalizeSubscription } from '@/features/notifications/utils/normalizeSubscription';
import {
  WebPushStatus,
  type PushSubscriptionRequest,
} from '@/features/notifications/types/pushApiTypes';

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
};
export const useAlarmPermission = (token: string | null) => {
  const registerPushSubscription = async (): Promise<boolean> => {
    try {
      if (!token) {
        toast.error('QR 토큰이 유효하지 않습니다.');
        return false;
      }

      const registration = await navigator.serviceWorker
        .register('/service-worker.js')
        .catch(() => {
          toast.error('서비스 워커 등록에 실패했습니다.');
          return null;
        });

      if (!registration) return false;

      const existing = await registration.pushManager.getSubscription();

      const targetSub =
        existing ??
        (await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(import.meta.env.VITE_VAPID_PUBLIC_KEY),
        }));

      if (!targetSub) {
        toast.error('푸시 구독 생성에 실패했습니다.');
        return false;
      }

      const normalized = normalizeSubscription(targetSub.toJSON());
      const request: PushSubscriptionRequest = {
        token,
        webPushUrl: normalized.endpoint,
        publicKey: normalized.keys.p256dh,
        authKey: normalized.keys.auth,
      };

      const response = await webPushApi.registerSubscription(request);
      const isSuccess = response.status === WebPushStatus.REGISTERED;

      if (!isSuccess) {
        toast.error('서버 구독 등록에 실패했습니다.');
        return false;
      }

      return true;
    } catch (error) {
      console.error('[registerPushSubscription error]', error);
      return false;
    }
  };

  return { registerPushSubscription };
};
