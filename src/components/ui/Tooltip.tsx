import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TooltipProps {
  children: React.ReactNode
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  className?: string
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = 'top',
  delay = 300,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const showTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    const id = setTimeout(() => {
      setIsVisible(true)
    }, delay)
    setTimeoutId(id)
  }

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    setIsVisible(false)
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [timeoutId])

  return (
    <div
      ref={tooltipRef}
      className={`relative ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 px-3 py-2 text-sm font-medium text-white bg-neutral-800 dark:bg-neutral-200 dark:text-neutral-800 rounded-lg shadow-lg whitespace-nowrap"
            style={{
              bottom: position === 'top' ? '100%' : 'auto',
              top: position === 'bottom' ? '100%' : 'auto',
              left: '50%',
              transform: 'translateX(-50%)',
              marginBottom: position === 'top' ? '8px' : '0',
              marginTop: position === 'bottom' ? '8px' : '0',
            }}
            role="tooltip"
          >
            {content}
            {/* Arrow */}
            <div
              className="absolute w-0 h-0 border-4"
              style={{
                top: position === 'top' ? '100%' : 'auto',
                bottom: position === 'bottom' ? '100%' : 'auto',
                left: '50%',
                transform: 'translateX(-50%)',
                borderColor: position === 'top' 
                  ? 'transparent transparent #1f2937 transparent'
                  : '#1f2937 transparent transparent transparent',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
