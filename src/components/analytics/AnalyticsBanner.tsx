import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/Button'

interface AnalyticsBannerProps {
  onAccept: () => void
  onDecline: () => void
}

export const AnalyticsBanner: React.FC<AnalyticsBannerProps> = ({ onAccept, onDecline }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsent = localStorage.getItem('analytics-consent')
    if (!hasConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('analytics-consent', 'accepted')
    setIsVisible(false)
    onAccept()
  }

  const handleDecline = () => {
    localStorage.setItem('analytics-consent', 'declined')
    setIsVisible(false)
    onDecline()
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto"
        >
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 p-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-1">
                  Analytics & Privacy
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4">
                  We use Vercel Analytics to understand how you interact with our site. This helps us improve your experience. 
                  <a href="/privacy" className="text-primary-600 dark:text-primary-400 hover:underline ml-1">
                    Learn more
                  </a>
                </p>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleAccept}
                    className="flex-1"
                  >
                    Accept
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDecline}
                    className="flex-1"
                  >
                    Decline
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}