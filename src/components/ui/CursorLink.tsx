import React from 'react'
import { Link as RouterLink, type LinkProps as RouterLinkProps } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCursorInteraction } from './CustomCursor'

interface CursorLinkProps extends Omit<RouterLinkProps, 'to'> {
  to: string
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'button' | 'underline'
}

export const CursorLink: React.FC<CursorLinkProps> = ({
  to,
  children,
  className = '',
  variant = 'default',
  ...props
}) => {
  const { onMouseEnter, onMouseLeave } = useCursorInteraction()

  const baseClasses = 'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
  
  const variantClasses = {
    default: 'text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300',
    button: 'inline-flex items-center justify-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 shadow-sm hover:shadow-md',
    underline: 'text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 border-b border-transparent hover:border-primary-500 transition-colors duration-200',
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

  return (
    <motion.div
      whileHover={{ scale: variant === 'button' ? 1.02 : 1 }}
      whileTap={{ scale: variant === 'button' ? 0.98 : 1 }}
    >
      <RouterLink
        to={to}
        className={classes}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...props}
      >
        {children}
      </RouterLink>
    </motion.div>
  )
}

// External link component
interface ExternalCursorLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'button' | 'underline'
}

export const ExternalCursorLink: React.FC<ExternalCursorLinkProps> = ({
  href,
  children,
  className = '',
  variant = 'default',
  ...props
}) => {
  const { onMouseEnter, onMouseLeave } = useCursorInteraction()

  const baseClasses = 'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
  
  const variantClasses = {
    default: 'text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300',
    button: 'inline-flex items-center justify-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 shadow-sm hover:shadow-md',
    underline: 'text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 border-b border-transparent hover:border-primary-500 transition-colors duration-200',
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

  return (
    <motion.div
      whileHover={{ scale: variant === 'button' ? 1.02 : 1 }}
      whileTap={{ scale: variant === 'button' ? 0.98 : 1 }}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...props}
      >
        {children}
      </a>
    </motion.div>
  )
}

export default CursorLink
