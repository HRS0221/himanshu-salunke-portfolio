import React, { useEffect } from 'react'

interface VercelAnalyticsProps {
  isEnabled: boolean
}

export const VercelAnalytics: React.FC<VercelAnalyticsProps> = ({ isEnabled }) => {
  useEffect(() => {
    if (isEnabled && typeof window !== 'undefined') {
      // Load Vercel Analytics script
      const script = document.createElement('script')
      script.src = 'https://va.vercel-scripts.com/v1/script.debug.js'
      script.setAttribute('data-api', '/api/analytics')
      script.async = true
      document.head.appendChild(script)

      return () => {
        // Cleanup script on unmount
        const existingScript = document.querySelector('script[src*="vercel-scripts"]')
        if (existingScript) {
          document.head.removeChild(existingScript)
        }
      }
    }
  }, [isEnabled])

  return null
}
