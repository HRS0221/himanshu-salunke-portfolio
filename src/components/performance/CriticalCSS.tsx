import React from 'react'

export const CriticalCSS: React.FC = () => {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        /* Critical CSS for above-the-fold content */
        
        /* Reset and base styles */
        *, *::before, *::after {
          box-sizing: border-box;
        }
        
        html {
          font-family: 'Inter', system-ui, sans-serif;
          line-height: 1.5;
          -webkit-text-size-adjust: 100%;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        body {
          margin: 0;
          background-color: #fafafa;
          color: #171717;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        
        /* Dark mode base */
        .dark body {
          background-color: #0a0a0a;
          color: #fafafa;
        }
        
        /* Header critical styles */
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid #e5e5e5;
          transition: all 0.3s ease;
        }
        
        .dark .header {
          background-color: rgba(10, 10, 10, 0.95);
          border-bottom-color: #404040;
        }
        
        .header.recruiter-mode {
          top: 2rem;
        }
        
        /* Navigation */
        .nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          max-width: 1280px;
          margin: 0 auto;
        }
        
        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        
        .nav-link {
          color: #525252;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        
        .nav-link:hover {
          color: #3b82f6;
        }
        
        .dark .nav-link {
          color: #a3a3a3;
        }
        
        .dark .nav-link:hover {
          color: #60a5fa;
        }
        
        /* Main content */
        .main-content {
          padding-top: 4rem;
          min-height: 100vh;
        }
        
        .main-content.recruiter-mode {
          padding-top: 6rem;
        }
        
        /* Hero section critical styles */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          overflow: hidden;
        }
        
        .hero-content {
          text-align: center;
          color: white;
          z-index: 10;
          position: relative;
          max-width: 800px;
          padding: 0 1.5rem;
        }
        
        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          line-height: 1.1;
          margin: 0 0 1.5rem 0;
          background: linear-gradient(45deg, #ffffff, #e0e7ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hero-subtitle {
          font-size: 1.25rem;
          font-weight: 500;
          margin: 0 0 2rem 0;
          opacity: 0.9;
        }
        
        .hero-description {
          font-size: 1.125rem;
          line-height: 1.6;
          margin: 0 0 2.5rem 0;
          opacity: 0.8;
        }
        
        /* Button critical styles */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
          border: none;
          cursor: pointer;
        }
        
        .btn-primary {
          background-color: #3b82f6;
          color: white;
        }
        
        .btn-primary:hover {
          background-color: #2563eb;
          transform: translateY(-1px);
        }
        
        /* Loading spinner */
        .loading-spinner {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.125rem;
          }
          
          .hero-description {
            font-size: 1rem;
          }
          
          .nav {
            padding: 1rem;
          }
          
          .nav-links {
            gap: 1.5rem;
          }
        }
        
        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }
          
          .nav-links {
            gap: 1rem;
          }
        }
        
        /* Accessibility */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        
        /* Focus styles */
        .focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
        
        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* High contrast mode */
        @media (prefers-contrast: high) {
          .hero {
            background: #000;
          }
          
          .hero-title {
            color: #fff;
            -webkit-text-fill-color: #fff;
          }
        }
      `
    }} />
  )
}

export const NonCriticalCSS: React.FC = () => {
  return (
    <link
      rel="preload"
      href="/src/index.css"
      as="style"
      onLoad={(e) => {
        const target = e.target as HTMLLinkElement
        target.onload = null
        target.rel = 'stylesheet'
      }}
    />
  )
}
