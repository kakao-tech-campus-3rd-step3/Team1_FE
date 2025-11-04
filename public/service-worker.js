// 푸시 수신 시 실행됨
self.addEventListener('push', (event) => {
  if (!event.data) return;
  const payload = event.data.json();

  const title = payload.title || '새 알림이 도착했습니다!';
  const options = {
    body: payload.body || '',
    data: payload.url || '/',
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// 사용자가 알림을 클릭했을 때
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetUrl = event.notification.data || '/';
  event.waitUntil(clients.openWindow(targetUrl));
});
