import React, { memo } from 'react'
import { motion } from 'framer-motion'

interface TagProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md'
  className?: string
}

export const Tag: React.FC<TagProps> = memo(({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full transition-colors duration-200'
  
  const variantClasses = {
    default: 'bg-neutral-100 text-neutral-900 border border-neutral-200 dark:bg-neutral-600 dark:text-white dark:border-neutral-500 font-semibold',
    primary: 'bg-primary-100 text-primary-900 border border-primary-200 dark:bg-primary-600 dark:text-white dark:border-primary-500 font-semibold',
    secondary: 'bg-secondary-100 text-secondary-900 border border-secondary-200 dark:bg-secondary-600 dark:text-white dark:border-secondary-500 font-semibold',
    success: 'bg-green-100 text-green-900 border border-green-200 dark:bg-green-600 dark:text-white dark:border-green-500 font-semibold',
    warning: 'bg-yellow-100 text-yellow-900 border border-yellow-200 dark:bg-yellow-600 dark:text-white dark:border-yellow-500 font-semibold',
    error: 'bg-red-100 text-red-900 border border-red-200 dark:bg-red-600 dark:text-white dark:border-red-500 font-semibold',
  }
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  }
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  return (
    <motion.span
      className={classes}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.span>
  )
})
