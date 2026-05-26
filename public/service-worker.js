// Ép Service Worker cài đặt và chạy ngay lập tức không cần chờ
self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(clients.claim());
});

// Xử lý khi có thông báo bắn về
self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || 'Bạn có thông báo mới',
    icon: 'https://cdn-icons-png.flaticon.com/512/1071/1071063.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/1071/1071063.png',
    vibrate: [200, 100, 200, 100, 200, 100, 200],
    data: { url: '/' }
  };
  event.waitUntil(self.registration.showNotification(data.title || 'Cảnh báo Ads', options));
});

// Xử lý khi bấm vào thông báo
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
