// sw.js - Offline mód és gyorsítótárazás
const CACHE_NAME = 'haztaji-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './favicon.ico',
  './icon.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './background.jpg'
];

// Telepítés: fájlok mentése a cache-be
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Fájlok cache-elése');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Aktiválás: régi cache törlése
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Adatlekérés: először a cache-ben nézi meg, ha nincs ott, megy a netre
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
