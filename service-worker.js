const cacheName = 'workout-generator-v2';
const resourcesToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/script.js',
    '/images/cardio.jpg',
    '/images/flexibility.jpg',
    '/images/strength-training.jpg'
];

// Install event
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('Service Worker: Caching resources');
            return cache.addAll(resourcesToCache);
        })
    );
});

// Activate event
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((key) => {
                    if (key !== cacheName) {
                        console.log('Service Worker: Deleting old cache:', key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// Fetch event
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Exclude Firestore API calls from service worker caching
    if (url.origin.includes('googleapis.com')) {
        console.log('Service Worker: Bypassing Firestore API call:', event.request.url);
        return;
    }

    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                console.log('Service Worker: Serving from cache:', event.request.url);
                return response;
            }

            console.log('Service Worker: Fetching from network:', event.request.url);
            return fetch(event.request)
                .then((networkResponse) => {
                    // Cache the new response
                    return caches.open(cacheName).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                })
                .catch((error) => {
                    console.error('Service Worker: Fetch failed for:', event.request.url, 'Error:', error);

                    // Fallback for offline mode
                    if (event.request.mode === 'navigate') {
                        return caches.match('/index.html');
                    }

                    return new Response('You are offline, and the resource is unavailable.', {
                        status: 503,
                        statusText: 'Service Unavailable',
                    });
                });
        })
    );
});
