import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // Immediately scroll to top when route changes
    const scrollToTop = () => {
      window.scrollTo(0, 0)
      if (document.documentElement) {
        document.documentElement.scrollTop = 0
      }
      if (document.body) {
        document.body.scrollTop = 0
      }
    }
    
    // Immediate scroll
    scrollToTop()
    
    // Additional scroll resets with different delays to ensure it works
    const timeoutIds = [
      setTimeout(scrollToTop, 10),
      setTimeout(scrollToTop, 50),
      setTimeout(scrollToTop, 100)
    ]
    
    return () => {
      timeoutIds.forEach(id => clearTimeout(id))
    }
  }, [pathname])

  return null
}

export default ScrollToTop
