/**
 * Format a date string or Date object into a human-readable format
 */

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid date provided')
  }
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  
  const formatOptions = { ...defaultOptions, ...options }
  
  return new Intl.DateTimeFormat('en-US', formatOptions).format(dateObj)
}

/**
 * Format a date for relative time (e.g., "2 days ago", "1 month ago")
 */
export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid date provided')
  }
  
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)
  
  if (diffInSeconds < 60) {
    return 'just now'
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`
  }
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`
  }
  
  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths === 1 ? '' : 's'} ago`
  }
  
  const diffInYears = Math.floor(diffInMonths / 12)
  return `${diffInYears} year${diffInYears === 1 ? '' : 's'} ago`
}

/**
 * Format a date for ISO string (useful for structured data)
 */
export function formatISODate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid date provided')
  }
  
  return dateObj.toISOString()
}

/**
 * Format a date for display in a compact format (e.g., "Jan 15, 2025")
 */
export function formatCompactDate(date: string | Date): string {
  return formatDate(date, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Format a date for display in a long format (e.g., "January 15, 2025")
 */
export function formatLongDate(date: string | Date): string {
  return formatDate(date, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Format a date for display with time (e.g., "January 15, 2025 at 2:30 PM")
 */
export function formatDateTime(date: string | Date): string {
  return formatDate(date, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

/**
 * Get the current year (useful for copyright notices)
 */
export function getCurrentYear(): number {
  return new Date().getFullYear()
}

/**
 * Check if a date is today
 */
export function isToday(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const today = new Date()
  
  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  )
}

/**
 * Check if a date is within the last N days
 */
export function isWithinDays(date: string | Date, days: number): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInDays = Math.floor((now.getTime() - dateObj.getTime()) / (1000 * 60 * 60 * 24))
  
  return diffInDays <= days
}
