import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { throttle } from '../../hooks/useScrollOptimization'
import { useRecruiterMode } from '../../context/RecruiterModeContext'

interface ProgressTrackerProps {
  className?: string
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ className = '' }) => {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const { isRecruiterMode } = useRecruiterMode()

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      
      setProgress(Math.min(scrollPercent, 100))
      setIsVisible(scrollTop > 100)
    }, 16) // ~60fps

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Don't show the main progress tracker when recruiter mode is active
  if (!isVisible || isRecruiterMode) return null

  // Calculate top position based on recruiter mode
  const topPosition = isRecruiterMode ? '48px' : '0px'

  return (
    <motion.div
      className={`fixed left-0 right-0 z-[60] h-1 bg-neutral-200 dark:bg-neutral-600 ${className}`}
      style={{ top: topPosition }}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 origin-left"
        style={{ scaleX: progress / 100 }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      />
      
    </motion.div>
  ) 
}

export const EasterEgg: React.FC = () => {
  const [isActivated, setIsActivated] = useState(false)

  useEffect(() => {
    const konamiSequence = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'KeyB', 'KeyA'
    ]

    let konamiCode: string[] = []

    const handleKeyDown = (event: KeyboardEvent) => {
      konamiCode = [...konamiCode, event.code]
      
      // Keep only the last 10 keys
      if (konamiCode.length > 10) {
        konamiCode.shift()
      }
      
      // Check if sequence matches
      if (konamiCode.length === 10 && 
          konamiCode.every((key, index) => key === konamiSequence[index])) {
        setIsActivated(true)
        setTimeout(() => setIsActivated(false), 5000)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!isActivated) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-xl text-center max-w-md mx-4"
        initial={{ scale: 0.5, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0.5, rotate: 180 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <motion.div
          className="text-6xl mb-4"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          🎉
        </motion.div>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
          Konami Code Activated!
        </h2>
        <p className="text-neutral-600 dark:text-neutral-300">
          You found the secret! Here's a special message: "Great job exploring the portfolio! 
          You've got the skills of a true developer. 🚀"
        </p>
        <motion.button
          className="mt-4 px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
          onClick={() => setIsActivated(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Awesome!
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
