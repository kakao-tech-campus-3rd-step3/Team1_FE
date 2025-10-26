export interface CreatePushQrResponse {
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
