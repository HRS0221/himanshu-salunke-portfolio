import React, { useEffect, useState, useRef } from 'react'
import { useScrollPerformance, useReducedMotion, throttle } from '../../hooks/useScrollOptimization'

interface ScrollPerformanceMonitorProps {
  showInDevelopment?: boolean
}

export const ScrollPerformanceMonitor: React.FC<ScrollPerformanceMonitorProps> = ({
  showInDevelopment = true
}) => {
  const fps = useScrollPerformance()
  const prefersReducedMotion = useReducedMotion()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show in development or when explicitly enabled
    if (process.env.NODE_ENV === 'development' && showInDevelopment) {
      setIsVisible(true)
    }
  }, [showInDevelopment])

  if (!isVisible) return null

  const getPerformanceColor = (fps: number) => {
    if (fps >= 55) return 'text-green-500'
    if (fps >= 30) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getPerformanceStatus = (fps: number) => {
    if (fps >= 55) return 'Excellent'
    if (fps >= 30) return 'Good'
    return 'Poor'
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-black/80 text-white p-3 rounded-lg text-xs font-mono">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${getPerformanceColor(fps)}`} />
        <span>Scroll FPS: {fps}</span>
        <span className={getPerformanceColor(fps)}>
          ({getPerformanceStatus(fps)})
        </span>
      </div>
      {prefersReducedMotion && (
        <div className="text-yellow-400 mt-1">
          Reduced motion enabled
        </div>
      )}
    </div>
  )
}

// Scroll performance optimization component
export const ScrollOptimizer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = React.useRef<NodeJS.Timeout>()

  useEffect(() => {
    const handleScrollStart = () => {
      setIsScrolling(true)
      document.body.classList.add('scroll-paused')
    }

    const handleScrollEnd = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
        document.body.classList.remove('scroll-paused')
      }, 150)
    }

    const throttledScrollStart = throttle(handleScrollStart, 16)
    const throttledScrollEnd = throttle(handleScrollEnd, 16)

    window.addEventListener('scroll', throttledScrollStart, { passive: true })
    window.addEventListener('scroll', throttledScrollEnd, { passive: true })

    return () => {
      window.removeEventListener('scroll', throttledScrollStart)
      window.removeEventListener('scroll', throttledScrollEnd)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  return <>{children}</>
}

