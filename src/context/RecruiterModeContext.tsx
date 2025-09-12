import React, { createContext, useContext, useState, useEffect } from 'react'

interface RecruiterModeContextType {
  isRecruiterMode: boolean
  toggleRecruiterMode: () => void
  setRecruiterMode: (mode: boolean) => void
}

const RecruiterModeContext = createContext<RecruiterModeContextType | undefined>(undefined)

export const useRecruiterMode = () => {
  const context = useContext(RecruiterModeContext)
  if (context === undefined) {
    throw new Error('useRecruiterMode must be used within a RecruiterModeProvider')
  }
  return context
}

interface RecruiterModeProviderProps {
  children: React.ReactNode
}

export const RecruiterModeProvider: React.FC<RecruiterModeProviderProps> = ({ children }) => {
  const [isRecruiterMode, setIsRecruiterMode] = useState<boolean>(() => {
    // Check localStorage first
    const savedMode = localStorage.getItem('recruiterMode')
    if (savedMode) {
      return JSON.parse(savedMode)
    }
    return false
  })

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('recruiterMode', JSON.stringify(isRecruiterMode))
  }, [isRecruiterMode])

  const toggleRecruiterMode = () => {
    setIsRecruiterMode(prev => !prev)
  }

  const setRecruiterMode = (mode: boolean) => {
    setIsRecruiterMode(mode)
  }

  const value: RecruiterModeContextType = {
    isRecruiterMode,
    toggleRecruiterMode,
    setRecruiterMode,
  }

  return (
    <RecruiterModeContext.Provider value={value}>
      {children}
    </RecruiterModeContext.Provider>
  )
}
