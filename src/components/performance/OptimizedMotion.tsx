import React, { memo } from 'react'
import { motion, MotionProps, Variants } from 'framer-motion'

// Optimized motion variants to reduce bundle size
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 }
}

export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
}

export const slideInRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
}

// Optimized motion components
interface OptimizedMotionProps extends Omit<MotionProps, 'variants'> {
  children: React.ReactNode
  variant?: 'fadeInUp' | 'fadeIn' | 'scaleIn' | 'slideInLeft' | 'slideInRight'
  delay?: number
  duration?: number
  className?: string
}

export const OptimizedMotion: React.FC<OptimizedMotionProps> = memo(({
  children,
  variant = 'fadeInUp',
  delay = 0,
  duration = 0.6,
  className = '',
  ...props
}) => {
  const variants = {
    fadeInUp,
    fadeIn,
    scaleIn,
    slideInLeft,
    slideInRight
  }[variant]

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for better performance
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
})

// Optimized stagger container
interface StaggerContainerProps {
  children: React.ReactNode
  staggerDelay?: number
  className?: string
}

export const StaggerContainer: React.FC<StaggerContainerProps> = memo(({
  children,
  staggerDelay = 0.1,
  className = ''
}) => {
  const containerVariants: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: staggerDelay
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className={className}
    >
      {children}
    </motion.div>
  )
})

// Optimized hover animations
interface HoverMotionProps {
  children: React.ReactNode
  hoverScale?: number
  hoverY?: number
  className?: string
}

export const HoverMotion: React.FC<HoverMotionProps> = memo(({
  children,
  hoverScale = 1.05,
  hoverY = -5,
  className = ''
}) => {
  return (
    <motion.div
      whileHover={{
        scale: hoverScale,
        y: hoverY,
        transition: { duration: 0.2, ease: 'easeOut' }
      }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.div>
  )
})

// Optimized page transition
interface PageTransitionProps {
  children: React.ReactNode
  className?: string
}

export const OptimizedPageTransition: React.FC<PageTransitionProps> = memo(({
  children,
  className = ''
}) => {
  const pageVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  }

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className={className}
    >
      {children}
    </motion.div>
  )
})

// Optimized loading animation
export const LoadingSpinner: React.FC<{ size?: number; className?: string }> = memo(({
  size = 24,
  className = ''
}) => {
  return (
    <motion.div
      className={`inline-block ${className}`}
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12a9 9 0 11-6.219-8.56" />
      </svg>
    </motion.div>
  )
})

// Optimized progress bar
interface ProgressBarProps {
  progress: number
  className?: string
  color?: string
}

export const OptimizedProgressBar: React.FC<ProgressBarProps> = memo(({
  progress,
  className = '',
  color = '#3b82f6'
}) => {
  return (
    <div className={`w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden ${className}`}>
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  )
})

// Optimized counter animation
interface AnimatedCounterProps {
  value: number
  duration?: number
  className?: string
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = memo(({
  value,
  duration = 2,
  className = ''
}) => {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {value.toLocaleString()}
      </motion.span>
    </motion.span>
  )
})

// Optimized image reveal
interface ImageRevealProps {
  children: React.ReactNode
  className?: string
}

export const ImageReveal: React.FC<ImageRevealProps> = memo(({
  children,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
})

// Optimized text reveal
interface TextRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export const TextReveal: React.FC<TextRevealProps> = memo(({
  children,
  className = '',
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
})
