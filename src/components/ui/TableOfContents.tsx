import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TOCItem {
  id: string
  title: string
  level: number
  estimatedTime?: number // in minutes
  isCompleted?: boolean
  progress?: number // 0-100
}

interface TableOfContentsProps {
  content: string
  className?: string
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ content, className = '' }) => {
  const [toc, setToc] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [overallProgress, setOverallProgress] = useState(0)
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set())

  // Calculate estimated reading time based on content length
  const calculateReadingTime = (title: string, level: number) => {
    // Base time estimates for different section types
    const baseTimes: { [key: string]: number } = {
      'key achievements': 2,
      'performance optimizations': 3,
      'technical implementation': 4,
      'results & performance metrics': 2,
      'technical challenges overcome': 3,
      'what i learned': 2
    }
    
    const lowerTitle = title.toLowerCase()
    const baseTime = baseTimes[lowerTitle] || (level === 2 ? 3 : 1)
    
    // Add some variation based on title length
    const titleLength = title.length
    const timeVariation = Math.min(titleLength / 50, 1) // Max 1 minute variation
    
    return Math.max(1, Math.round(baseTime + timeVariation))
  }

  useEffect(() => {
    // Generate TOC from content
    const headings = content.match(/^(#{1,6})\s+(.+)$/gm)
    if (headings) {
      const tocItems: TOCItem[] = headings.map((heading) => {
        const level = heading.match(/^#+/)?.[0].length || 1
        const title = heading.replace(/^#+\s+/, '').trim()
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
        const estimatedTime = calculateReadingTime(title, level)
        
        return { 
          id, 
          title, 
          level, 
          estimatedTime,
          isCompleted: false,
          progress: 0
        }
      })
      setToc(tocItems)
    }
  }, [content])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const windowHeight = window.innerHeight
      
      // Find active heading and calculate progress
      const headings = toc.map(item => {
        const element = document.getElementById(item.id)
        return {
          ...item,
          element,
          offsetTop: element?.offsetTop || 0
        }
      }).filter(item => item.element)

      const activeHeading = headings.find((heading, index) => {
        const nextHeading = headings[index + 1]
        const isLast = index === headings.length - 1
        
        if (isLast) {
          return currentScrollY >= heading.offsetTop - 100
        } else if (nextHeading) {
          return currentScrollY >= heading.offsetTop - 100 && currentScrollY < nextHeading.offsetTop - 100
        }
        return false
      })

      setActiveId(activeHeading?.id || '')

      // Calculate section completion and progress
      const newCompletedSections = new Set<string>()
      let totalProgress = 0

      headings.forEach((heading) => {
        const element = heading.element
        if (!element) return

        const rect = element.getBoundingClientRect()
        const elementTop = rect.top
        const elementBottom = rect.bottom
        const viewportTop = 0
        const viewportBottom = windowHeight

        // Calculate how much of the section is visible
        const visibleTop = Math.max(elementTop, viewportTop)
        const visibleBottom = Math.min(elementBottom, viewportBottom)
        const visibleHeight = Math.max(0, visibleBottom - visibleTop)
        const sectionHeight = elementBottom - elementTop
        const visibilityRatio = sectionHeight > 0 ? visibleHeight / sectionHeight : 0

        // Mark as completed if more than 80% has been scrolled past
        if (elementTop < viewportTop - 100) {
          newCompletedSections.add(heading.id)
          totalProgress += 100
        } else if (visibilityRatio > 0) {
          // Calculate partial progress
          const progress = Math.min(100, Math.max(0, (viewportTop - elementTop + 100) / sectionHeight * 100))
          totalProgress += progress
        }
      })

      setCompletedSections(newCompletedSections)
      
      // Calculate overall progress
      const overallProgressPercent = headings.length > 0 ? totalProgress / headings.length : 0
      setOverallProgress(overallProgressPercent)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [toc])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offsetTop = element.offsetTop - 100 // Account for sticky header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  if (toc.length === 0) return null

  return (
    <div
      className={`hidden md:block fixed right-6 z-50 ${className}`}
      style={{ 
        top: '50%',
        transform: 'translateY(-50%)',
        position: 'fixed'
      }}
    >
          <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md rounded-xl shadow-xl border border-neutral-200/30 dark:border-neutral-700/30 p-4 w-72 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
                  Contents
                </h3>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-full">
                  {toc.length}
                </span>
              </div>
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label={isCollapsed ? "Expand table of contents" : "Collapse table of contents"}
              >
                <motion.svg
                  className="w-4 h-4 text-neutral-500 dark:text-neutral-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: isCollapsed ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  Reading Progress
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  {Math.round(overallProgress)}%
                </span>
              </div>
              <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${overallProgress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  {completedSections.size} of {toc.length} completed
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  {toc.reduce((total, item) => total + (item.estimatedTime || 0), 0)} min read
                </span>
              </div>
            </div>
            
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <nav className="space-y-1">
                    {toc.map((item, index) => {
                      const isCompleted = completedSections.has(item.id)
                      const isActive = activeId === item.id
                      
                      return (
                        <motion.button
                          key={item.id}
                          onClick={() => scrollToHeading(item.id)}
                          className={`block w-full text-left text-sm transition-all duration-200 rounded-lg px-3 py-2.5 group relative ${
                            isActive
                              ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/20 border border-primary-200 dark:border-primary-800'
                              : isCompleted
                              ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/10 border border-green-200 dark:border-green-800'
                              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
                          }`}
                          style={{ paddingLeft: `${(item.level - 1) * 12 + 12}px` }}
                          whileHover={{ x: 4 }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.03 }}
                        >
                          <div className="flex items-center gap-3">
                            {/* Status Icon */}
                            <div className="flex-shrink-0">
                              {isCompleted ? (
                                <motion.div
                                  className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                >
                                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                </motion.div>
                              ) : isActive ? (
                                <motion.div
                                  className="w-4 h-4 bg-primary-500 rounded-full"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                              ) : (
                                <div className="w-4 h-4 border-2 border-neutral-300 dark:border-neutral-600 rounded-full" />
                              )}
                            </div>

                            {/* Section Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-neutral-400 dark:text-neutral-500 font-mono">
                                  {String(index + 1).padStart(2, '0')}
                                </span>
                                <span className="truncate font-medium">{item.title}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                  {item.estimatedTime} min
                                </span>
                                {isCompleted && (
                                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                                    ✓ Completed
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      )
                    })}
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
    </div>
  )
}

// Mobile TOC component
export const MobileTableOfContents: React.FC<TableOfContentsProps> = ({ content, className = '' }) => {
  const [toc, setToc] = useState<TOCItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const headings = content.match(/^(#{1,6})\s+(.+)$/gm)
    if (headings) {
      const tocItems: TOCItem[] = headings.map((heading) => {
        const level = heading.match(/^#+/)?.[0].length || 1
        const title = heading.replace(/^#+\s+/, '').trim()
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
        
        return { id, title, level }
      })
      setToc(tocItems)
    }
  }, [content])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offsetTop = element.offsetTop - 100
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
      setIsOpen(false)
    }
  }

  if (toc.length === 0) return null

  return (
    <div className={`md:hidden ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 bg-primary-500 text-white p-3 rounded-full shadow-lg hover:bg-primary-600 transition-colors"
        aria-label="Toggle table of contents"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed bottom-20 right-6 left-6 z-50 bg-white dark:bg-neutral-900 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700 max-h-96 overflow-y-auto"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                      Table of Contents
                    </h3>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-full">
                      {toc.length}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    aria-label="Close table of contents"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <nav className="space-y-1">
                  {toc.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToHeading(item.id)}
                      className="block w-full text-left text-sm transition-all duration-200 rounded-lg px-3 py-2 group"
                      style={{ paddingLeft: `${(item.level - 1) * 12 + 12}px` }}
                      whileHover={{ x: 4 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-neutral-400 dark:text-neutral-500 font-mono">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors flex-1">
                          {item.title}
                        </span>
                        <motion.div
                          className="w-2 h-2 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100"
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </div>
                    </motion.button>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
