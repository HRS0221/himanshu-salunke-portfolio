import React, { useEffect } from 'react'

interface FontPreloaderProps {
  fonts?: Array<{
    family: string
    weight?: string | number
    style?: string
    display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional'
  }>
}

export const FontPreloader: React.FC<FontPreloaderProps> = ({ 
  fonts = [
    { family: 'Inter', weight: '400', display: 'swap' },
    { family: 'Inter', weight: '500', display: 'swap' },
    { family: 'Inter', weight: '600', display: 'swap' },
    { family: 'Inter', weight: '700', display: 'swap' },
    { family: 'JetBrains Mono', weight: '400', display: 'swap' },
    { family: 'JetBrains Mono', weight: '500', display: 'swap' },
  ]
}) => {
  useEffect(() => {
    // Preload critical fonts
    const preloadFonts = async () => {
      const fontPromises = fonts.map(font => {
        const fontFace = new FontFace(
          font.family,
          `url(/fonts/${font.family.toLowerCase().replace(/\s+/g, '-')}-${font.weight || '400'}.woff2)`,
          {
            weight: font.weight || '400',
            style: font.style || 'normal',
            display: font.display || 'swap'
          }
        )

        return fontFace.load().then(loadedFont => {
          document.fonts.add(loadedFont)
          return loadedFont
        }).catch(error => {
          console.warn(`Failed to load font ${font.family}:`, error)
          return null
        })
      })

      try {
        await Promise.all(fontPromises)
        console.log('Fonts preloaded successfully')
      } catch (error) {
        console.warn('Some fonts failed to preload:', error)
      }
    }

    preloadFonts()
  }, [fonts])

  return (
    <>
      {/* Preload critical fonts in HTML head */}
      {fonts.map((font, index) => (
        <link
          key={index}
          rel="preload"
          href={`/fonts/${font.family.toLowerCase().replace(/\s+/g, '-')}-${font.weight || '400'}.woff2`}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      ))}
    </>
  )
}

export const FontDisplayOptimizer: React.FC = () => {
  useEffect(() => {
    // Optimize font display for better performance
    const optimizeFontDisplay = () => {
      // Set font-display: swap for all fonts
      const style = document.createElement('style')
      style.textContent = `
        @font-face {
          font-family: 'Inter';
          font-display: swap;
        }
        @font-face {
          font-family: 'JetBrains Mono';
          font-display: swap;
        }
      `
      document.head.appendChild(style)
    }

    optimizeFontDisplay()
  }, [])

  return null
}

export const CriticalResourcePreloader: React.FC = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      const criticalResources = [
        { href: '/images/hero-bg.webp', as: 'image' },
        { href: '/images/logo.svg', as: 'image' },
        { href: '/api/current-focus', as: 'fetch', crossOrigin: 'anonymous' },
      ]

      criticalResources.forEach(resource => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.href = resource.href
        link.as = resource.as
        if (resource.crossOrigin) {
          link.crossOrigin = resource.crossOrigin
        }
        document.head.appendChild(link)
      })
    }

    preloadCriticalResources()
  }, [])

  return null
}
