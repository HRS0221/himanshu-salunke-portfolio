// Service Worker for Portfolio Website
const CACHE_NAME = 'portfolio-v1.0.0'
const STATIC_CACHE = 'portfolio-static-v1.0.0'
const DYNAMIC_CACHE = 'portfolio-dynamic-v1.0.0'

// Static assets to cache
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/favicon.svg',
  '/apple-touch-icon.png',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/favicon-192x192.png',
  '/favicon-512x512.png',
  '/robots.txt'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...')
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        console.log('Service Worker: Static assets cached successfully')
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('Service Worker: Failed to cache static assets', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('Service Worker: Activated successfully')
        return self.clients.claim()
      })
  )
})

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return
  }

  // Handle different types of requests
  if (isStaticAsset(request)) {
    // Static assets - cache first strategy
    event.respondWith(cacheFirst(request))
  } else if (isAPIRequest(request)) {
    // API requests - network first strategy
    event.respondWith(networkFirst(request))
  } else if (isPageRequest(request)) {
    // Page requests - network first with cache fallback
    event.respondWith(networkFirstWithFallback(request))
  } else {
    // Other requests - stale while revalidate
    event.respondWith(staleWhileRevalidate(request))
  }
})

// Cache first strategy for static assets
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    console.error('Cache first strategy failed:', error)
    return new Response('Offline', { status: 503 })
  }
}

// Network first strategy for API requests
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    return new Response('Offline', { status: 503 })
  }
}

// Network first with cache fallback for pages
async function networkFirstWithFallback(request) {
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/index.html')
    }
    return new Response('Offline', { status: 503 })
  }
}

// Stale while revalidate for other requests
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE)
  const cachedResponse = await cache.match(request)

  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  }).catch(() => {
    // Network failed, return cached version if available
    return cachedResponse
  })

  return cachedResponse || fetchPromise
}

// Helper functions
function isStaticAsset(request) {
  const url = new URL(request.url)
  return url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)
}

function isAPIRequest(request) {
  const url = new URL(request.url)
  return url.pathname.startsWith('/api/')
}

function isPageRequest(request) {
  return request.mode === 'navigate' || 
         (request.method === 'GET' && request.headers.get('accept').includes('text/html'))
}

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm())
  }
})

async function syncContactForm() {
  // Handle offline form submissions when connection is restored
  console.log('Service Worker: Syncing contact form submissions')
  // Implementation would depend on your form handling logic
}

// Push notifications (if needed in future)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: '/favicon-192x192.png',
      badge: '/favicon-32x32.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey
      }
    }
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    )
  }
})

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  
  event.waitUntil(
    clients.openWindow('/')
  )
})
