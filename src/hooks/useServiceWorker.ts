import { useEffect, useState } from 'react'

interface ServiceWorkerState {
  isSupported: boolean
  isRegistered: boolean
  isUpdated: boolean
  registration: ServiceWorkerRegistration | null
  error: string | null
}

export const useServiceWorker = () => {
  const [state, setState] = useState<ServiceWorkerState>({
    isSupported: 'serviceWorker' in navigator,
    isRegistered: false,
    isUpdated: false,
    registration: null,
    error: null
  })

  useEffect(() => {
    if (!state.isSupported) {
      console.log('Service Worker not supported')
      return
    }

    const registerServiceWorker = async () => {
      try {
        console.log('Registering Service Worker...')
        
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        })

        console.log('Service Worker registered successfully:', registration)

        setState(prev => ({
          ...prev,
          isRegistered: true,
          registration
        }))

        // Handle updates
        registration.addEventListener('updatefound', () => {
          console.log('Service Worker update found')
          const newWorker = registration.installing

          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('New Service Worker installed, update available')
                setState(prev => ({
                  ...prev,
                  isUpdated: true
                }))
              }
            })
          }
        })

        // Handle controller change
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          console.log('Service Worker controller changed')
          window.location.reload()
        })

      } catch (error) {
        console.error('Service Worker registration failed:', error)
        setState(prev => ({
          ...prev,
          error: error instanceof Error ? error.message : 'Registration failed'
        }))
      }
    }

    // Register service worker
    registerServiceWorker()

    // Handle messages from service worker
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'CACHE_UPDATED') {
        console.log('Cache updated:', event.data.payload)
      }
    }

    navigator.serviceWorker.addEventListener('message', handleMessage)

    return () => {
      navigator.serviceWorker.removeEventListener('message', handleMessage)
    }
  }, [state.isSupported])

  const updateServiceWorker = () => {
    if (state.registration && state.registration.waiting) {
      state.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    }
  }

  const unregisterServiceWorker = async () => {
    if (state.registration) {
      await state.registration.unregister()
      setState(prev => ({
        ...prev,
        isRegistered: false,
        registration: null
      }))
    }
  }

  return {
    ...state,
    updateServiceWorker,
    unregisterServiceWorker
  }
}

// Service Worker utilities
export const serviceWorkerUtils = {
  // Check if app is running in standalone mode (PWA)
  isStandalone: () => {
    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any).standalone === true
  },

  // Get cache size
  getCacheSize: async () => {
    if (!('caches' in window)) return 0

    const cacheNames = await caches.keys()
    let totalSize = 0

    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName)
      const keys = await cache.keys()
      
      for (const request of keys) {
        const response = await cache.match(request)
        if (response) {
          const blob = await response.blob()
          totalSize += blob.size
        }
      }
    }

    return totalSize
  },

  // Clear all caches
  clearAllCaches: async () => {
    if (!('caches' in window)) return

    const cacheNames = await caches.keys()
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    )
  },

  // Preload critical resources
  preloadCriticalResources: async () => {
    if (!('caches' in window)) return

    const criticalResources = [
      '/',
      '/work',
      '/articles',
      '/about',
      '/contact'
    ]

    const cache = await caches.open('portfolio-critical')
    
    for (const resource of criticalResources) {
      try {
        const response = await fetch(resource)
        if (response.ok) {
          await cache.put(resource, response)
        }
      } catch (error) {
        console.warn(`Failed to preload ${resource}:`, error)
      }
    }
  }
}
