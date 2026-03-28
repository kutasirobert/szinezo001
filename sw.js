// sw.js - Minimális kód az offline módhoz és telepítéshez
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Telepítve');
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  console.log('[Service Worker] Aktív');
});

self.addEventListener('fetch', (e) => {
  // Kötelező elem a PWA-hoz, még ha csak továbbítja is a kérést
  e.respondWith(fetch(e.request));
});
