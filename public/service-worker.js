const PRECACHE = 'precache-v3'
const RUNTIME = 'runtime'

const PRECACHE_URLS = [
  'index.html',
  './',
  'global.css',
  '/build/bundle.css',
  '/build/bundle.js',
  'https://unpkg.com/@material/mwc-textfield@0.25.3/mwc-textfield.js?module',
  'https://fonts.googleapis.com/css2?family=Archivo:wght@100;400;700&display=swap',
  'https://fonts.gstatic.com/s/archivo/v9/k3kPo8UDI-1M0wlSV9XAw6lQkqWY8Q82sLydOxI.woff2',
]

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  )
})

self.addEventListener('activate', e => {
  const currentCaches = [PRECACHE, RUNTIME]
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName))
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete)
      }))
    }).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', e => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (e.request.url.startsWith(self.location.origin)) {
    e.respondWith(
      caches.match(e.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(e.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(e.request, response.clone()).then(() => {
              return response
            })
          })
        })
      })
    )
  }
})
