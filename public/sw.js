// Service Worker for caching model files for offline use

const CACHE_NAME = 'pose-model-cache-v1';
const MODEL_FILES = [
  '/pose_model/model.json',
  '/pose_model/metadata.json',
  '/pose_model/weights.bin'
];

// Install event - cache model files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching model files for offline use');
        return cache.addAll(MODEL_FILES);
      })
      .catch((error) => {
        console.error('Failed to cache model files:', error);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve cached files when offline
self.addEventListener('fetch', (event) => {
  // Only handle requests for model files
  if (MODEL_FILES.some(file => event.request.url.includes(file))) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          // Return cached version if available
          if (response) {
            return response;
          }
          
          // Otherwise, fetch from network
          return fetch(event.request).then((response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response to put in cache
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          });
        })
        .catch(() => {
          // If both cache and network fail, we're offline
          console.log('Offline mode: serving cached model files');
        })
    );
  }
});