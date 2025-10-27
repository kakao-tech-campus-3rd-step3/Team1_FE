export interface CreatePushQrResponse {
  token: string;
  registerUrl: string;
  expiredAt: string;
}

export interface PushSubscriptionRequest {
  token: string;
  subscription: {
    endpoint: string;
    keys: {
      p256dh: string;
      auth: string;
    };
  };
}

export interface PushSubscriptionResponse {
  status: 'registered' | 'denied';
}
// 푸시 구독 상태 확인
export interface PushSubscriptionStatusResponse {
  isRegistered: boolean;
}
