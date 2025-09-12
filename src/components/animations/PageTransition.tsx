import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

interface PageTransitionProps {
  children: React.ReactNode
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 1.02
  }
}

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation()

  // Additional scroll reset for page transitions
  useEffect(() => {
    // Ensure scroll position is reset when page changes
    window.scrollTo(0, 0)
    if (document.documentElement) {
      document.documentElement.scrollTop = 0
    }
    if (document.body) {
      document.body.scrollTop = 0
    }
    
    // Additional scroll reset with delay to ensure it overrides any other scroll operations
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0)
      if (document.documentElement) {
        document.documentElement.scrollTop = 0
      }
      if (document.body) {
        document.body.scrollTop = 0
      }
    }, 50)
    
    return () => clearTimeout(timeoutId)
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export const StaggeredReveal: React.FC<{
  children: React.ReactNode
  className?: string
  delay?: number
}> = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}

export const CardTilt: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = '' }) => {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        rotateY: 5,
        rotateX: 5,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  )
}

export const SpringCounter: React.FC<{
  value: number
  duration?: number
  className?: string
}> = ({ value, duration = 2, className = '' }) => {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: 'spring',
          stiffness: 200,
          damping: 20,
          duration
        }}
      >
        {value}
      </motion.span>
    </motion.span>
  )
}

export const FloatingElement: React.FC<{
  children: React.ReactNode
  className?: string
  delay?: number
}> = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      className={className}
      animate={{ 
        y: [0, -10, 0],
        rotate: [0, 2, -2, 0]
      }}
      transition={{ 
        duration: 4,
        repeat: Infinity,
        delay,
        ease: 'easeInOut'
      }}
    >
      {children}
    </motion.div>
  )
}

export const MagneticButton: React.FC<{
  children: React.ReactNode
  className?: string
  onClick?: () => void
}> = ({ children, className = '', onClick }) => {
  return (
    <motion.button
      className={className}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{ 
        boxShadow: [
          '0 0 0 0 rgba(59, 130, 246, 0)',
          '0 0 0 10px rgba(59, 130, 246, 0.1)',
          '0 0 0 0 rgba(59, 130, 246, 0)'
        ]
      }}
      transition={{ 
        boxShadow: { duration: 2, repeat: Infinity },
        scale: { duration: 0.2 }
      }}
    >
      {children}
    </motion.button>
  )
}
