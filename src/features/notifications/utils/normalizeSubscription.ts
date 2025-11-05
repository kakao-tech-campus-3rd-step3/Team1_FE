export const normalizeSubscription = (
  sub: PushSubscriptionJSON,
): {
  endpoint: string;
  keys: { p256dh: string; auth: string };
} => {
  if (!sub.endpoint || !sub.keys?.p256dh || !sub.keys?.auth) {
    throw new Error('잘못된 PushSubscription 데이터');
  }
  return {
    endpoint: sub.endpoint,
    keys: {
      p256dh: sub.keys.p256dh,
      auth: sub.keys.auth,
    },
  };
};
