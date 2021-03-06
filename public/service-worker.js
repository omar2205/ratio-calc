const PRECACHE = 'precache-v2'
const RUNTIME = 'runtime'

const PRECACHE_URLS = [
  'index.html',
  './',
  'global.css',
  '/build/bundle.css',
  '/build/bundle.js',
  'https://unpkg.com/@material/textfield@7.0.0/dist/mdc.textfield.min.css',
  '/fonts/font.css',
  '/fonts/F37Moon-ExtraBold.otf',
  '/fonts/F37Moon-Thin.otf'
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
