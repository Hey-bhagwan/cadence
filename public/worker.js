// public/worker.js

self.addEventListener('push', function (event) {
    const data = event.data.json(); // Assuming the server sends JSON
    const title = data.title || 'Cadence';
    const options = {
      body: data.body || 'You have a new notification.',
      icon: '/icon-192x192.png', // Optional: Add an icon to your public folder
      badge: '/badge-72x72.png', // Optional: Add a badge icon
    };
    event.waitUntil(self.registration.showNotification(title, options));
  });
  
  self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    // Optional: Open the app when the notification is clicked
    event.waitUntil(
      clients.openWindow('https://your-vercel-url.com/protected/dashboard') // Replace with your app's URL
    );
  });