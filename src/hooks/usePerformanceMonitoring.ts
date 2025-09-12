import { useEffect, useState, useCallback } from 'react'

interface PerformanceMetrics {
  fcp: number | null
  lcp: number | null
  fid: number | null
  cls: number | null
  ttfb: number | null
  fmp: number | null
}

interface PerformanceReport {
  metrics: PerformanceMetrics
  score: number
  recommendations: string[]
}

export const usePerformanceMonitoring = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    fmp: null
  })

  const [isMonitoring, setIsMonitoring] = useState(false)

  const calculatePerformanceScore = useCallback((metrics: PerformanceMetrics): number => {
    let score = 100

    // FCP scoring (0-2.5s is good)
    if (metrics.fcp && metrics.fcp > 2500) {
      score -= Math.min(20, (metrics.fcp - 2500) / 100)
    }

    // LCP scoring (0-2.5s is good)
    if (metrics.lcp && metrics.lcp > 2500) {
      score -= Math.min(25, (metrics.lcp - 2500) / 100)
    }

    // FID scoring (0-100ms is good)
    if (metrics.fid && metrics.fid > 100) {
      score -= Math.min(20, (metrics.fid - 100) / 10)
    }

    // CLS scoring (0-0.1 is good)
    if (metrics.cls && metrics.cls > 0.1) {
      score -= Math.min(25, metrics.cls * 100)
    }

    // TTFB scoring (0-800ms is good)
    if (metrics.ttfb && metrics.ttfb > 800) {
      score -= Math.min(10, (metrics.ttfb - 800) / 100)
    }

    return Math.max(0, Math.round(score))
  }, [])

  const generateRecommendations = useCallback((metrics: PerformanceMetrics): string[] => {
    const recommendations: string[] = []

    if (metrics.fcp && metrics.fcp > 2500) {
      recommendations.push('Optimize First Contentful Paint by reducing render-blocking resources')
    }

    if (metrics.lcp && metrics.lcp > 2500) {
      recommendations.push('Improve Largest Contentful Paint by optimizing images and fonts')
    }

    if (metrics.fid && metrics.fid > 100) {
      recommendations.push('Reduce First Input Delay by minimizing JavaScript execution time')
    }

    if (metrics.cls && metrics.cls > 0.1) {
      recommendations.push('Minimize Cumulative Layout Shift by setting image dimensions')
    }

    if (metrics.ttfb && metrics.ttfb > 800) {
      recommendations.push('Improve Time to First Byte by optimizing server response time')
    }

    return recommendations
  }, [])

  const startMonitoring = useCallback(() => {
    if (isMonitoring) return

    setIsMonitoring(true)

    // Monitor First Contentful Paint (FCP)
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint')
      if (fcpEntry) {
        setMetrics(prev => ({ ...prev, fcp: fcpEntry.startTime }))
      }
    })
    fcpObserver.observe({ entryTypes: ['paint'] })

    // Monitor Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      if (lastEntry) {
        setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }))
      }
    })
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

    // Monitor First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach(entry => {
        const fid = entry.processingStart - entry.startTime
        setMetrics(prev => ({ ...prev, fid }))
      })
    })
    fidObserver.observe({ entryTypes: ['first-input'] })

    // Monitor Cumulative Layout Shift (CLS)
    let clsValue = 0
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
          setMetrics(prev => ({ ...prev, cls: clsValue }))
        }
      })
    })
    clsObserver.observe({ entryTypes: ['layout-shift'] })

    // Monitor Time to First Byte (TTFB)
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navigationEntry) {
      const ttfb = navigationEntry.responseStart - navigationEntry.requestStart
      setMetrics(prev => ({ ...prev, ttfb }))
    }

    // Monitor First Meaningful Paint (FMP)
    const fmpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const fmpEntry = entries.find(entry => entry.name === 'first-meaningful-paint')
      if (fmpEntry) {
        setMetrics(prev => ({ ...prev, fmp: fmpEntry.startTime }))
      }
    })
    fmpObserver.observe({ entryTypes: ['paint'] })

    // Cleanup function
    return () => {
      fcpObserver.disconnect()
      lcpObserver.disconnect()
      fidObserver.disconnect()
      clsObserver.disconnect()
      fmpObserver.disconnect()
      setIsMonitoring(false)
    }
  }, [isMonitoring])

  const getPerformanceReport = useCallback((): PerformanceReport => {
    const score = calculatePerformanceScore(metrics)
    const recommendations = generateRecommendations(metrics)

    return {
      metrics,
      score,
      recommendations
    }
  }, [metrics, calculatePerformanceScore, generateRecommendations])

  const logPerformanceMetrics = useCallback(() => {
    const report = getPerformanceReport()
    console.group('🚀 Performance Metrics')
    console.log('Score:', report.score)
    console.log('FCP:', report.metrics.fcp ? `${report.metrics.fcp.toFixed(2)}ms` : 'N/A')
    console.log('LCP:', report.metrics.lcp ? `${report.metrics.lcp.toFixed(2)}ms` : 'N/A')
    console.log('FID:', report.metrics.fid ? `${report.metrics.fid.toFixed(2)}ms` : 'N/A')
    console.log('CLS:', report.metrics.cls ? report.metrics.cls.toFixed(4) : 'N/A')
    console.log('TTFB:', report.metrics.ttfb ? `${report.metrics.ttfb.toFixed(2)}ms` : 'N/A')
    console.log('Recommendations:', report.recommendations)
    console.groupEnd()
  }, [getPerformanceReport])

  useEffect(() => {
    const cleanup = startMonitoring()
    return cleanup
  }, [startMonitoring])

  return {
    metrics,
    isMonitoring,
    getPerformanceReport,
    logPerformanceMetrics,
    startMonitoring
  }
}

export const useResourceTiming = () => {
  const [resourceMetrics, setResourceMetrics] = useState<Array<{
    name: string
    duration: number
    size: number
    type: string
  }>>([])

  useEffect(() => {
    const analyzeResources = () => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
      const metrics = resources.map(resource => ({
        name: resource.name,
        duration: resource.duration,
        size: resource.transferSize || 0,
        type: resource.initiatorType
      }))

      setResourceMetrics(metrics)
    }

    // Analyze resources after page load
    if (document.readyState === 'complete') {
      analyzeResources()
    } else {
      window.addEventListener('load', analyzeResources)
    }

    return () => {
      window.removeEventListener('load', analyzeResources)
    }
  }, [])

  const getSlowResources = useCallback((threshold: number = 1000) => {
    return resourceMetrics.filter(resource => resource.duration > threshold)
  }, [resourceMetrics])

  const getLargeResources = useCallback((threshold: number = 100000) => {
    return resourceMetrics.filter(resource => resource.size > threshold)
  }, [resourceMetrics])

  return {
    resourceMetrics,
    getSlowResources,
    getLargeResources
  }
}
