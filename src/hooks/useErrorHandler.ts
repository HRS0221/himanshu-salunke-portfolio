import { useCallback } from 'react'

interface ErrorHandlerOptions {
  showUserMessage?: boolean
  logError?: boolean
  fallbackMessage?: string
}

export const useErrorHandler = () => {
  const handleError = useCallback((
    error: unknown, 
    context: string,
    options: ErrorHandlerOptions = {}
  ) => {
    const {
      showUserMessage = true,
      logError = true,
      fallbackMessage = 'An unexpected error occurred'
    } = options

    // Log error for debugging
    if (logError) {
      console.error(`Error in ${context}:`, error)
    }

    // Return user-friendly error message
    if (showUserMessage) {
      if (error instanceof Error) {
        return error.message
      }
      if (typeof error === 'string') {
        return error
      }
      return fallbackMessage
    }

    return null
  }, [])

  const handleAsyncError = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    context: string,
    options: ErrorHandlerOptions = {}
  ): Promise<T | null> => {
    try {
      return await asyncFn()
    } catch (error) {
      const errorMessage = handleError(error, context, options)
      if (errorMessage) {
        throw new Error(errorMessage)
      }
      return null
    }
  }, [handleError])

  return { handleError, handleAsyncError }
}
