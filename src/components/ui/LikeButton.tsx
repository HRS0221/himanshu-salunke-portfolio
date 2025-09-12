import React from 'react'
import { motion } from 'framer-motion'

interface LikeButtonProps {
  likes: number
  isLiked: boolean
  isAnimating: boolean
  onToggle: () => void
  className?: string
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  likes,
  isLiked,
  isAnimating,
  onToggle,
  className = ''
}) => {
  return (
    <motion.button
      onClick={onToggle}
      disabled={isAnimating}
      className={`flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all duration-200 group cursor-pointer select-none ${
        isLiked 
          ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/40' 
          : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30'
      } ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Heart Icon with Animation */}
      <motion.div
        animate={{
          scale: isAnimating ? [1, 1.3, 1] : 1,
          rotate: isAnimating ? [0, -10, 10, 0] : 0
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut"
        }}
      >
        <svg 
          className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" 
          fill={isLiked ? "currentColor" : "none"} 
          viewBox="0 0 24 24"
          stroke={isLiked ? "none" : "currentColor"}
          strokeWidth={isLiked ? 0 : 2}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </motion.div>

      {/* Like Count with Animation */}
      <motion.span 
        className="font-medium"
        animate={{
          scale: isAnimating ? [1, 1.1, 1] : 1,
          color: isAnimating ? ["currentColor", "#ef4444", "currentColor"] : "currentColor"
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut"
        }}
      >
        {likes.toLocaleString()}
      </motion.span>

      {/* Floating Hearts Animation */}
      {isAnimating && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none"
              initial={{ 
                opacity: 1, 
                scale: 0.5,
                x: 0,
                y: 0
              }}
              animate={{ 
                opacity: 0, 
                scale: 1,
                x: (Math.random() - 0.5) * 100,
                y: -50 - Math.random() * 30
              }}
              transition={{
                duration: 1,
                delay: i * 0.1,
                ease: "easeOut"
              }}
            >
              <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </motion.div>
          ))}
        </>
      )}
    </motion.button>
  )
}
