
// sw.txt
const CACHE_NAME = 'rtpnaga2000-v1';

const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/javascript.js',
  '/manifest.json',
  '/img/logo/naga2000.webp',
  '/img/banner/naga2000.webp',
  '/img/icon/naga2000.webp',
  '/img/gif/naga2000.gif'
];

// Install event: Cache file inti
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Meng-cache file inti');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Fetch event: Logika utama untuk cache dinamis
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika ada di cache, kembalikan langsung
        if (response) {
          return response;
        }

        // Jika tidak ada di cache, ambil dari network
        return fetch(event.request).then(response => {
          // Periksa apakah respons valid
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone respons karena respons adalah stream dan hanya bisa dibaca sekali
          const responseToCache = response.clone();

          // Buka cache dan simpan respons baru
          caches.open(CACHE_NAME)
            .then(cache => {
              // --- MAGIC TERJADI DI SINI ---
              // Cek apakah URL yang diminta adalah gambar .webp di dalam folder /img/
              if (event.request.url.includes('/img/') && event.request.url.endsWith('.webp')) {
                cache.put(event.request, responseToCache);
                console.log('Service Worker: Meng-cache gambar baru -> ' + event.request.url);
              }
            });

          return response;
        });
      })
  );
});

// Activate event: Hapus cache lama
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Service Worker: Menghapus cache lama -> ' + cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});