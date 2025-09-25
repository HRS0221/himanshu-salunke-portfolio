import React from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

interface VercelAnalyticsProps {
  isEnabled: boolean
}

export const VercelAnalytics: React.FC<VercelAnalyticsProps> = ({ isEnabled }) => {
  // Only render Analytics components if enabled
  if (!isEnabled) {
    return null
  }

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}
