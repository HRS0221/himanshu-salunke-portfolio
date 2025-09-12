import React, { useState, useRef, useEffect, memo } from 'react'
import { motion } from 'framer-motion'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
  placeholder?: string
  sizes?: string
  quality?: number
  format?: 'webp' | 'avif' | 'auto'
  blurDataURL?: string
}

export const OptimizedImage: React.FC<OptimizedImageProps> = memo(({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  placeholder,
  sizes = '100vw',
  quality = 80,
  format = 'auto',
  blurDataURL
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // Generate optimized image URL
  const getOptimizedImageUrl = (originalSrc: string, format: string, quality: number) => {
    if (format === 'auto') {
      return originalSrc
    }
    
    // For Vite imagetools integration
    if (originalSrc.startsWith('/') && !originalSrc.includes('?')) {
      const params = new URLSearchParams()
      if (format !== 'auto') {
        params.set('format', format)
      }
      params.set('quality', quality.toString())
      return `${originalSrc}?${params.toString()}`
    }
    
    return originalSrc
  }

  // Generate srcSet for responsive images
  const generateSrcSet = (baseSrc: string, format: string, quality: number) => {
    if (format === 'auto') {
      return undefined
    }

    const sizes = [400, 800, 1200, 1600, 2000]
    return sizes
      .map(size => {
        const params = new URLSearchParams()
        params.set('format', format)
        params.set('quality', quality.toString())
        params.set('w', size.toString())
        return `${baseSrc}?${params.toString()} ${size}w`
      })
      .join(', ')
  }

  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoaded(true)
  }

  const optimizedSrc = getOptimizedImageUrl(src, format, quality)
  const srcSet = generateSrcSet(src, format, quality)

  return (
    <div className={`relative overflow-hidden ${className}`} ref={imgRef}>
      {/* Shimmer placeholder */}
      {!isLoaded && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700"
          animate={{
            backgroundPosition: ['-200% 0', '200% 0'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundSize: '200% 100%',
          }}
        />
      )}

      {/* Blur placeholder */}
      {blurDataURL && !isLoaded && (
        <div
          className="absolute inset-0 bg-neutral-200 dark:bg-neutral-700"
          style={{
            backgroundImage: `url(${blurDataURL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(10px)',
          }}
        />
      )}

      {/* Optimized image with picture element for format selection */}
      {isInView && (
        <picture>
          {/* AVIF format (best compression) */}
          {format === 'auto' && (
            <source
              srcSet={generateSrcSet(src, 'avif', quality)}
              sizes={sizes}
              type="image/avif"
            />
          )}
          
          {/* WebP format (good compression, wide support) */}
          {format === 'auto' && (
            <source
              srcSet={generateSrcSet(src, 'webp', quality)}
              sizes={sizes}
              type="image/webp"
            />
          )}
          
          {/* Fallback image */}
          <motion.img
            src={optimizedSrc}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt}
            width={width}
            height={height}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
          />
        </picture>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
          <div className="text-center text-neutral-500 dark:text-neutral-400">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Failed to load image</p>
          </div>
        </div>
      )}
    </div>
  )
})

// Preload critical images
export const preloadImage = (src: string, format: string = 'webp') => {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = src
  if (format) {
    link.type = `image/${format}`
  }
  document.head.appendChild(link)
}

// Generate blur data URL for placeholder
export const generateBlurDataURL = (width: number = 10, height: number = 10) => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  
  if (ctx) {
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, '#f3f4f6')
    gradient.addColorStop(1, '#e5e7eb')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
  }
  
  return canvas.toDataURL()
}

// Image optimization utilities
export const imageUtils = {
  // Get optimal image format based on browser support
  getOptimalFormat: () => {
    if (typeof window === 'undefined') return 'webp'
    
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    
    // Check AVIF support
    if (canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0) {
      return 'avif'
    }
    
    // Check WebP support
    if (canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
      return 'webp'
    }
    
    return 'jpeg'
  },
  
  // Calculate optimal image dimensions
  getOptimalDimensions: (containerWidth: number, containerHeight: number, devicePixelRatio: number = 1) => {
    return {
      width: Math.ceil(containerWidth * devicePixelRatio),
      height: Math.ceil(containerHeight * devicePixelRatio)
    }
  },
  
  // Generate responsive srcSet
  generateResponsiveSrcSet: (baseSrc: string, format: string, quality: number) => {
    const breakpoints = [320, 640, 768, 1024, 1280, 1536, 1920]
    return breakpoints
      .map(bp => {
        const params = new URLSearchParams()
        params.set('format', format)
        params.set('quality', quality.toString())
        params.set('w', bp.toString())
        return `${baseSrc}?${params.toString()} ${bp}w`
      })
      .join(', ')
  }
}
