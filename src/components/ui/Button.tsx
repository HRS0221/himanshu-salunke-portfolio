import React, { memo } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  loading?: boolean
  as?: 'button' | 'a'
  href?: string
  target?: string
  rel?: string
}

export const Button: React.FC<ButtonProps> = memo(({
  variant = 'primary',
  size = 'md',
  children,
  loading = false,
  className = '',
  disabled,
  as = 'button',
  href,
  target,
  rel,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantClasses = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-sm hover:shadow-md dark:bg-primary-500 dark:hover:bg-primary-400 dark:text-white font-semibold',
    secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500 shadow-sm hover:shadow-md dark:bg-secondary-600 dark:hover:bg-secondary-700 dark:text-white',
    outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white focus:ring-primary-500 dark:text-white dark:border-primary-300 dark:hover:bg-primary-500 dark:hover:text-white font-semibold drop-shadow-lg shadow-lg',
    ghost: 'text-primary-700 hover:bg-primary-100 dark:hover:bg-primary-900 focus:ring-primary-500 dark:text-primary-300',
  }
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  const motionProps = {
    className: classes,
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  }

  if (as === 'a') {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        {...motionProps}
        {...(props as any)}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      disabled={disabled || loading}
      {...motionProps}
      {...(props as any)}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </motion.button>
  )
})
