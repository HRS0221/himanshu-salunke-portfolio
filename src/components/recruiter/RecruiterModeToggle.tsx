import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRecruiterMode } from '../../context/RecruiterModeContext'
import { throttle } from '../../hooks/useScrollOptimization'

// Progress tracker component for the banner
const ProgressTrackerInBanner: React.FC = () => {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

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

  if (!isVisible) return null

  return (
    <motion.div
      className="absolute top-0 left-0 right-0 h-1 bg-white/20"
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 origin-left"
        style={{ scaleX: progress / 100 }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      />
    </motion.div>
  )
}

export const RecruiterModeToggle: React.FC = () => {
  const { isRecruiterMode, toggleRecruiterMode } = useRecruiterMode()

  return (
    <motion.button
      onClick={toggleRecruiterMode}
      className={`group relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isRecruiterMode 
          ? 'bg-gradient-to-r from-blue-500 to-purple-500 focus:ring-blue-400' 
          : 'bg-neutral-200 dark:bg-neutral-600 focus:ring-neutral-400'
      }`}
      aria-label={`${isRecruiterMode ? 'Disable' : 'Enable'} recruiter mode`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-all duration-300 ${
          isRecruiterMode ? 'translate-x-6' : 'translate-x-1'
        }`}
        animate={{ x: isRecruiterMode ? 24 : 4 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {/* Icon inside toggle */}
        <div className="flex items-center justify-center h-full w-full">
          {isRecruiterMode ? (
            <motion.svg 
              className="w-3 h-3 text-blue-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
            </motion.svg>
          ) : (
            <motion.svg 
              className="w-3 h-3 text-neutral-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              initial={{ opacity: 0, rotate: 180 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </motion.svg>
          )}
        </div>
      </motion.span>
      
      {/* Enhanced tooltip */}
      <motion.div 
        className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none"
        initial={{ opacity: 0, y: 5 }}
        whileHover={{ opacity: 1, y: 0 }}
      >
        <div className="bg-neutral-900 dark:bg-neutral-700 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-lg border border-neutral-700">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isRecruiterMode ? 'bg-green-400' : 'bg-neutral-400'}`} />
            <span className="font-medium">
              {isRecruiterMode ? 'Recruiter Mode Active' : 'Enable Recruiter Mode'}
            </span>
          </div>
          <div className="text-neutral-300 text-xs mt-1">
            {isRecruiterMode ? 'Viewing recruiter-optimized content' : 'Show recruiter-relevant information'}
          </div>
        </div>
        {/* Tooltip arrow */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-900 dark:border-t-neutral-700"></div>
      </motion.div>
    </motion.button>
  )
}

export const RecruiterModeBanner: React.FC = () => {
  const { isRecruiterMode, toggleRecruiterMode } = useRecruiterMode()

  if (!isRecruiterMode) return null

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white shadow-lg"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-white/5" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}></div>
        </div>
      </div>
      
      <div className="relative px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Left side - Status indicator */}
          <div className="flex items-center gap-3">
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative">
                <motion.div
                  className="w-3 h-3 bg-green-400 rounded-full"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-20"></div>
              </div>
              <span className="text-sm font-semibold">Recruiter Mode</span>
            </motion.div>
            
          </div>

           {/* Center - Main message */}
           <motion.div
             className="flex-1 text-center px-4"
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.4 }}
           >
             <div className="flex items-center justify-center gap-2 -ml-24">
               <motion.svg 
                 className="w-5 h-5" 
                 fill="none" 
                 viewBox="0 0 24 24" 
                 stroke="currentColor"
                 animate={{ rotate: [0, 10, -10, 0] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
               >
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
               </motion.svg>
               <span className="font-medium text-sm sm:text-base">
                 Viewing recruiter-optimized content
               </span>
             </div>
           </motion.div>

        </div>
      </div>
      
      {/* Progress tracker integration */}
      <ProgressTrackerInBanner />
    </motion.div>
  )
}
