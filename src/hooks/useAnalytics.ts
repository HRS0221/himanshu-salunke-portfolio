import { useState, useEffect } from 'react'

export const useAnalytics = () => {
  const [isAnalyticsEnabled, setIsAnalyticsEnabled] = useState(false)
  const [hasConsent, setHasConsent] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if user has given consent
    const consent = localStorage.getItem('analytics-consent')
    if (consent === 'accepted') {
      setIsAnalyticsEnabled(true)
      setHasConsent(true)
    } else if (consent === 'declined') {
      setIsAnalyticsEnabled(false)
      setHasConsent(false)
    } else {
      setHasConsent(null) // No decision made yet
    }
  }, [])

  const enableAnalytics = () => {
    setIsAnalyticsEnabled(true)
    localStorage.setItem('analytics-consent', 'accepted')
  }

  const disableAnalytics = () => {
    setIsAnalyticsEnabled(false)
    localStorage.setItem('analytics-consent', 'declined')
  }

  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    if (isAnalyticsEnabled && typeof window !== 'undefined') {
      // Vercel Analytics tracking
      if (window.va) {
        window.va.track(eventName, properties)
      }
    }
  }

  const trackPageView = (url: string) => {
    if (isAnalyticsEnabled && typeof window !== 'undefined') {
      // Vercel Analytics page view tracking
      if (window.va) {
        window.va.track('page_view', { url })
      }
    }
  }

  return {
    isAnalyticsEnabled,
    hasConsent,
    enableAnalytics,
    disableAnalytics,
    trackEvent,
    trackPageView,
  }
}

// Extend Window interface for Vercel Analytics
declare global {
  interface Window {
    va?: {
      track: (eventName: string, properties?: Record<string, any>) => void
    }
  }
}
