import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { useRecruiterMode } from '../../context/RecruiterModeContext'
import { RecruiterModeToggle } from '../recruiter/RecruiterModeToggle'
import { GlobalSearch } from '../ui/GlobalSearch'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Work', href: '/work' },
  { name: 'Developer', href: '/developer' },
  { name: 'Articles', href: '/articles' },
  { name: 'Contact', href: '/contact' },
]

const getPageDescription = (pageName: string): string => {
  const descriptions: Record<string, string> = {
    'Home': 'Impact & Navigation Hub',
    'About': 'Personal Story & Mission',
    'Work': 'Project Portfolio & Case Studies',
    'Developer': 'Technical Excellence Showcase',
    'Articles': 'Knowledge Hub & Thought Leadership',
    'Contact': 'Collaboration & Connection'
  }
  return descriptions[pageName] || pageName
}

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { isRecruiterMode } = useRecruiterMode()
  const location = useLocation()
  
  // Use recruiter mode for conditional rendering
  // const shouldShowRecruiterFeatures = isRecruiterMode // TODO: Implement recruiter-specific features

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false)
  }, [location])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <motion.header
      className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
        isRecruiterMode ? 'top-12' : 'top-0'
      } ${
        isScrolled
          ? 'bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md shadow-sm border-b border-neutral-200/20 dark:border-neutral-800/20'
          : 'bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm md:bg-transparent md:dark:bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav id="navigation" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl font-bold text-neutral-900 dark:text-white"
            aria-label="Home"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="h-8 w-8 text-primary-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </motion.div>
            <div className="hidden sm:block">
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent text-xl font-bold drop-shadow-sm">
                Himanshu
              </span>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 -mt-1 drop-shadow-sm">
                Aspiring Data Scientist
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 relative group ${
                  location.pathname === item.href
                    ? 'text-primary-500'
                    : 'text-neutral-600 hover:text-primary-500 dark:text-neutral-300 dark:hover:text-primary-400'
                }`}
                title={`${item.name} - ${getPageDescription(item.name)}`}
              >
                {item.name}
                {location.pathname === item.href && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-500 rounded-full"
                    layoutId="activeIndicator"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Availability Status */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-700 dark:text-green-300 font-medium">Available for projects</span>
            </div>

            {/* Resume Download */}
            <motion.a
              href="/Himanshu_Salunke_Resume.pdf"
              download="Himanshu_Salunke_Resume.pdf"
              className="hidden sm:flex items-center gap-2 px-3 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Download Resume"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Resume
            </motion.a>

            {/* Global Search */}
            <GlobalSearch />

            {/* Recruiter Mode Toggle (Desktop) */}
            <div className="hidden md:flex items-center gap-2">
              <span className="text-xs text-neutral-500 dark:text-neutral-400">Recruiter</span>
              <RecruiterModeToggle />
            </div>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === 'light' ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMenu}
              className="rounded-lg p-2 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-white md:hidden bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md border-t border-neutral-200/20 dark:border-neutral-800/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-1 pb-3 pt-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block rounded-lg px-3 py-2 text-base font-medium transition-colors duration-200 ${
                      location.pathname === item.href
                        ? 'bg-primary-100 text-primary-500 dark:bg-primary-900 dark:text-primary-400'
                        : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{item.name}</span>
                      <span className="text-xs text-neutral-400 dark:text-neutral-500">
                        {getPageDescription(item.name)}
                      </span>
                    </div>
                  </Link>
                ))}
                
                {/* Mobile Resume Download */}
                <motion.a
                  href="/Himanshu_Salunke_Resume.pdf"
                  download="Himanshu_Salunke_Resume.pdf"
                  className="flex items-center gap-2 px-3 py-2 mt-4 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download Resume
                </motion.a>

                {/* Mobile Recruiter Mode Toggle */}
                <div className="flex items-center justify-between px-3 py-2 mt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <span className="text-sm text-neutral-600 dark:text-neutral-300">Recruiter Mode</span>
                  <RecruiterModeToggle />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
