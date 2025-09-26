import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

interface SearchResult {
  id: string
  title: string
  type: 'project' | 'article' | 'page'
  url: string
  description?: string
  category?: string
}

export const GlobalSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const modalRef = useRef<HTMLDivElement>(null)

  // Standard search data
  const searchData: SearchResult[] = [
    {
      id: '1',
      title: 'AI/ML Dashboard',
      type: 'project',
      url: '/work/ai-ml-dashboard',
      description: 'Machine learning dashboard with real-time analytics',
      category: 'AI/ML'
    },
    {
      id: '2',
      title: 'React Performance Optimizer',
      type: 'project',
      url: '/work/react-performance-optimizer',
      description: 'Tool for optimizing React application performance',
      category: 'Web Development'
    },
    {
      id: '3',
      title: 'Modern React Dashboard',
      type: 'project',
      url: '/work/react-dashboard',
      description: 'A comprehensive dashboard built with React, TypeScript, and modern UI components',
      category: 'Web Development'
    },
    {
      id: '4',
      title: 'Mobile App',
      type: 'project',
      url: '/work/mobile-app',
      description: 'Cross-platform mobile application with React Native',
      category: 'Mobile Development'
    },
    {
      id: '5',
      title: 'Machine Learning Fundamentals',
      type: 'article',
      url: 'https://www.linkedin.com/pulse/what-machine-learning-himanshu-salunke-dwgef/',
      description: 'A comprehensive introduction to machine learning concepts',
      category: 'Machine Learning'
    },
    {
      id: '6',
      title: 'Linear Regression Guide',
      type: 'article',
      url: 'https://www.linkedin.com/pulse/what-regression-machine-learning-himanshu-salunke-m0zff/',
      description: 'Master linear regression from basics to advanced concepts',
      category: 'Machine Learning'
    },
    {
      id: '7',
      title: 'Gradient Descent',
      type: 'article',
      url: 'https://www.linkedin.com/pulse/what-gradient-descent-machine-learning-himanshu-salunke-ray0f/',
      description: 'Comprehensive guide to gradient descent optimization algorithm',
      category: 'Machine Learning'
    },
    {
      id: '8',
      title: 'About Me',
      type: 'page',
      url: '/about',
      description: 'Learn more about my background and experience',
      category: 'Profile'
    },
    {
      id: '9',
      title: 'Contact',
      type: 'page',
      url: '/contact',
      description: 'Get in touch with me',
      category: 'Contact'
    },
    {
      id: '10',
      title: 'Work',
      type: 'page',
      url: '/work',
      description: 'View my portfolio of projects and case studies',
      category: 'Portfolio'
    },
    {
      id: '11',
      title: 'Articles',
      type: 'page',
      url: '/articles',
      description: 'Read my latest articles and blog posts',
      category: 'Blog'
    },
    {
      id: '12',
      title: 'Now',
      type: 'page',
      url: '/now',
      description: 'What I\'m currently working on and learning',
      category: 'Current'
    }
  ]

  useEffect(() => {
    if (searchTerm.length > 0) {
      setIsLoading(true)
      // Standard search with immediate results
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setResults(filtered)
      setIsLoading(false)
    } else {
      setResults([])
    }
  }, [searchTerm])

  // Handle keyboard events and backdrop clicks
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
        setSearchTerm('')
        setResults([])
      }
    }

    const handleBackdropClick = (event: MouseEvent) => {
      // Check if click is outside the modal content
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchTerm('')
        setResults([])
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('mousedown', handleBackdropClick)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleBackdropClick)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleResultClick = (result: SearchResult) => {
    // Check if it's an external link (starts with http)
    if (result.url.startsWith('http')) {
      window.open(result.url, '_blank', 'noopener,noreferrer')
    } else {
      navigate(result.url)
    }
    setIsOpen(false)
    setSearchTerm('')
    setResults([])
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'project':
        return '🚀'
      case 'article':
        return '📝'
      case 'page':
        return '📄'
      default:
        return '🔍'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'project':
        return 'from-blue-500 to-purple-500'
      case 'article':
        return 'from-green-500 to-emerald-500'
      case 'page':
        return 'from-orange-500 to-red-500'
      default:
        return 'from-neutral-500 to-neutral-600'
    }
  }

  return (
    <div className="relative">
      {/* Search Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="group relative p-3 rounded-2xl bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-600 hover:from-primary-100 hover:to-secondary-100 dark:hover:from-primary-900/20 dark:hover:to-secondary-900/20 transition-all duration-300 shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg className="w-5 h-5 text-neutral-600 dark:text-neutral-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
      </motion.button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsOpen(false)
                setSearchTerm('')
                setResults([])
              }}
              style={{ 
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh'
              }}
            />

            {/* Search Modal */}
            <motion.div
              ref={modalRef}
              className="fixed top-20 sm:top-24 left-4 right-4 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 max-w-lg mx-auto z-[70]"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-neutral-200/20 dark:border-neutral-700/30 overflow-hidden">
                {/* Search Input */}
                <div className="p-3 sm:p-4 border-b border-neutral-200/30 dark:border-neutral-700/30">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <motion.svg
                        className="h-5 w-5 text-neutral-400 transition-colors duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        animate={{ scale: searchTerm ? 1.1 : 1, rotate: searchTerm ? 5 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </motion.svg>
                    </div>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search projects, articles, pages..."
                      className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-800 border-2 border-neutral-200/50 dark:border-neutral-600/50 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:focus:border-primary-400 transition-all duration-300 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 shadow-lg focus:shadow-xl"
                      autoFocus
                    />
                    {searchTerm && (
                      <motion.button
                        onClick={() => setSearchTerm('')}
                        className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <div className="p-1.5 rounded-lg bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 hover:from-red-200 hover:to-pink-200 dark:hover:from-red-800/40 dark:hover:to-pink-800/40 transition-all duration-200">
                          <svg className="w-3.5 h-3.5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      </motion.button>
                    )}
                  </div>
                </div>

                {/* Search Results */}
                <div className="max-h-48 sm:max-h-64 overflow-y-auto">
                  {isLoading ? (
                    <div className="p-6 text-center">
                      <motion.div
                        className="w-6 h-6 border-3 border-primary-500/20 border-t-primary-500 rounded-full mx-auto"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">Searching...</p>
                    </div>
                  ) : results.length > 0 ? (
                    <div className="p-1">
                      {results.map((result, index) => (
                        <motion.div
                          key={result.id}
                          className="p-3 rounded-xl hover:bg-neutral-100/50 dark:hover:bg-neutral-700/50 cursor-pointer transition-colors duration-200"
                          onClick={() => handleResultClick(result)}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.01 }}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${getTypeColor(result.type)} flex items-center justify-center text-white text-sm shadow-md`}>
                              {getTypeIcon(result.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
                                {result.title}
                              </h3>
                              <p className="text-xs text-neutral-600 dark:text-neutral-400 truncate">
                                {result.description}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs text-neutral-500 dark:text-neutral-500 capitalize">
                                  {result.type}
                                </span>
                                {result.category && (
                                  <>
                                    <span className="text-xs text-neutral-400">•</span>
                                    <span className="text-xs text-primary-600 dark:text-primary-400">
                                      {result.category}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                            <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : searchTerm.length > 0 ? (
                    <div className="p-6 text-center">
                      <div className="text-4xl mb-3">🔍</div>
                      <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-1">
                        No results found
                      </h3>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">
                        Try searching for something else
                      </p>
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <div className="text-4xl mb-3">✨</div>
                      <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-1">
                        Start typing to search
                      </h3>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">
                        Search for projects, articles, or pages
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-3 border-t border-neutral-200/30 dark:border-neutral-700/30 bg-neutral-50/50 dark:bg-neutral-800/50">
                  <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-700 rounded text-xs">⌘</kbd>
                        <kbd className="px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-700 rounded text-xs">K</kbd>
                        <span>to search</span>
                      </span>
                    </div>
                    <span>Press <kbd className="px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-700 rounded text-xs">ESC</kbd> to close</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default GlobalSearch
