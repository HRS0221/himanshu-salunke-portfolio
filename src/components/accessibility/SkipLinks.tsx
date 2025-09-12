import React from 'react'
import { motion } from 'framer-motion'

export const SkipLinks: React.FC = () => {
  return (
    <div className="skip-links">
      <motion.a
        href="#main-content"
        className="skip-link"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 0 }}
        whileFocus={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        Skip to main content
      </motion.a>
      <motion.a
        href="#navigation"
        className="skip-link"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 0 }}
        whileFocus={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        Skip to navigation
      </motion.a>
      <motion.a
        href="#footer"
        className="skip-link"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 0 }}
        whileFocus={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        Skip to footer
      </motion.a>
    </div>
  )
}

export const FocusTrap: React.FC<{
  children: React.ReactNode
  isActive: boolean
  onEscape?: () => void
}> = ({ children, isActive, onEscape }) => {
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!isActive || !containerRef.current) return

    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus()
          e.preventDefault()
        }
      }
    }

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onEscape) {
        onEscape()
      }
    }

    document.addEventListener('keydown', handleTabKey)
    document.addEventListener('keydown', handleEscapeKey)

    // Focus first element
    firstElement?.focus()

    return () => {
      document.removeEventListener('keydown', handleTabKey)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isActive, onEscape])

  return (
    <div ref={containerRef} className="focus-trap">
      {children}
    </div>
  )
}

export const ScreenReaderOnly: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <span className="sr-only">
      {children}
    </span>
  )
}

export const VisuallyHidden: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <span className="visually-hidden">
      {children}
    </span>
  )
}
