importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
)

workbox.loadModule('workbox-strategies')

const {registerRoute} = workbox.routing
const {StaleWhileRevalidate, CacheFirst} = workbox.strategies

registerRoute(
  new RegExp('https://unpkg\\.com/*'),
  new StaleWhileRevalidate()
)

registerRoute(
  new RegExp('https://fonts\\.gstatic\\.com/*'),
  new StaleWhileRevalidate()
)

registerRoute(
  new RegExp('/|/index.html|/global.css'),
  new StaleWhileRevalidate()
)

registerRoute(
  ({url}) => url.pathname.startsWith('/build'),
  new StaleWhileRevalidate()
)

registerRoute(
  ({url}) => url.pathname.startsWith('/icons'),
  new CacheFirst()
)
