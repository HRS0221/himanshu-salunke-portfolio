import { useState, useEffect } from 'react'

export const useSafeWindow = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const getWindow = () => {
    if (typeof window !== 'undefined') {
      return window
    }
    return null
  }

  const getLocation = () => {
    const window = getWindow()
    return window?.location || null
  }

  const getCurrentUrl = () => {
    const location = getLocation()
    return location?.href || ''
  }

  return {
    isClient,
    window: getWindow(),
    location: getLocation(),
    currentUrl: getCurrentUrl()
  }
}
