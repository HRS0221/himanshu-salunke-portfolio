import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SortOption {
  value: string
  label: string
  icon: string
}

interface SearchAndFilterProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  categories: string[]
  selectedCategory: string
  onCategoryChange: (value: string) => void
  statuses?: string[]
  selectedStatus?: string
  onStatusChange?: (value: string) => void
  sortBy: string
  onSortChange: (value: string) => void
  sortOptions?: SortOption[]
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
  statuses,
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortChange,
  sortOptions: customSortOptions
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  // Clear all filters function
  const clearAllFilters = () => {
    onSearchChange('')
    onCategoryChange('All')
    if (onStatusChange) {
      onStatusChange('All')
    }
    onSortChange('date')
  }
  
  // Default sort options if none provided
  const defaultSortOptions = [
    { value: 'date', label: 'Latest', icon: '🕒' },
    { value: 'title', label: 'Title', icon: '🔤' },
    { value: 'featured', label: 'Featured', icon: '⭐' },
    { value: 'readTime', label: 'Read Time', icon: '⏱️' },
    { value: 'views', label: 'Most Viewed', icon: '👁️' },
    { value: 'likes', label: 'Most Liked', icon: '❤️' }
  ]
  
  const sortOptions = customSortOptions || defaultSortOptions

  return (
    <motion.div
      className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-neutral-200/20 dark:border-neutral-700/30 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Compact Header */}
      <div className="relative p-4 pb-3">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5"></div>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="p-2 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl shadow-md">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Search & Filter</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Find articles quickly</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Clear All Filters Button */}
            {(searchTerm || selectedCategory !== 'All' || (selectedStatus && selectedStatus !== 'All')) && (
              <motion.button
                onClick={clearAllFilters}
                className="group relative p-2 rounded-xl bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 hover:from-red-200 hover:to-pink-200 dark:hover:from-red-800/40 dark:hover:to-pink-800/40 transition-all duration-300 shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                title="Clear all filters"
              >
                <svg
                  className="w-4 h-4 text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            )}
            
            {/* Expand/Collapse Button */}
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="group relative p-2 rounded-xl bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-600 hover:from-primary-100 hover:to-secondary-100 dark:hover:from-primary-900/20 dark:hover:to-secondary-900/20 transition-all duration-300 shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.svg
                className="w-4 h-4 text-neutral-600 dark:text-neutral-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Compact Search Bar */}
      <div className="px-4 pb-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <motion.svg
              className="h-5 w-5 text-neutral-400 group-focus-within:text-primary-500 transition-colors duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ scale: searchTerm ? 1.1 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </motion.svg>
          </div>
          <motion.input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search articles, topics, or keywords..."
            className="w-full pl-10 pr-10 py-2.5 bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-800 border border-neutral-200/50 dark:border-neutral-600/50 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:focus:border-primary-400 transition-all duration-300 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 shadow-sm hover:shadow-md focus:shadow-lg text-sm"
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          />
          {searchTerm && (
            <motion.button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="p-1 rounded-lg bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 hover:from-red-200 hover:to-pink-200 dark:hover:from-red-800/40 dark:hover:to-pink-800/40 transition-all duration-200">
                <svg className="w-3.5 h-3.5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </motion.button>
          )}
        </div>
      </div>

      {/* Modern Expandable Filters */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              <div className="bg-gradient-to-br from-neutral-50/50 to-neutral-100/50 dark:from-neutral-800/50 dark:to-neutral-900/50 rounded-xl p-4 border border-neutral-200/30 dark:border-neutral-700/30">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Category Filter */}
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                      Category
                    </label>
                    <div className="relative group">
                      <select
                        value={selectedCategory}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        className="w-full px-3 py-2 bg-white/80 dark:bg-neutral-700/80 border border-neutral-200/50 dark:border-neutral-600/50 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:focus:border-primary-400 transition-all duration-300 text-neutral-900 dark:text-white appearance-none cursor-pointer shadow-sm hover:shadow-md focus:shadow-lg backdrop-blur-sm text-sm"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-neutral-400 group-focus-within:text-primary-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Status Filter (if provided) */}
                  {statuses && selectedStatus && onStatusChange && (
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                        Status
                      </label>
                      <div className="relative group">
                        <select
                          value={selectedStatus}
                          onChange={(e) => onStatusChange(e.target.value)}
                          className="w-full px-3 py-2 bg-white/80 dark:bg-neutral-700/80 border border-neutral-200/50 dark:border-neutral-600/50 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:focus:border-primary-400 transition-all duration-300 text-neutral-900 dark:text-white appearance-none cursor-pointer shadow-sm hover:shadow-md focus:shadow-lg backdrop-blur-sm text-sm"
                        >
                          {statuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg className="w-4 h-4 text-neutral-400 group-focus-within:text-primary-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sort By */}
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                      Sort By
                    </label>
                    <div className="relative group">
                      <select
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="w-full px-3 py-2 bg-white/80 dark:bg-neutral-700/80 border border-neutral-200/50 dark:border-neutral-600/50 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:focus:border-primary-400 transition-all duration-300 text-neutral-900 dark:text-white appearance-none cursor-pointer shadow-sm hover:shadow-md focus:shadow-lg backdrop-blur-sm text-sm"
                      >
                        {sortOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.icon} {option.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-neutral-400 group-focus-within:text-primary-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compact Active Filters Display */}
      {(searchTerm || selectedCategory !== 'All' || (selectedStatus && selectedStatus !== 'All')) && (
        <motion.div
          className="mt-4 pt-4 border-t border-neutral-200/50 dark:border-neutral-700/50"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></div>
              <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Active Filters</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <motion.span
                  className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-medium bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800 dark:from-primary-900/30 dark:to-primary-800/30 dark:text-white shadow-md border border-primary-200/50 dark:border-primary-700/50"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="w-3 h-3 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  "{searchTerm}"
                  <motion.button
                    onClick={() => onSearchChange('')}
                    className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-primary-300/50 dark:hover:bg-primary-700/50 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </motion.span>
              )}
              
              {selectedCategory !== 'All' && (
                <motion.span
                  className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-medium bg-gradient-to-r from-secondary-100 to-secondary-200 text-secondary-800 dark:from-secondary-900/30 dark:to-secondary-800/30 dark:text-white shadow-md border border-secondary-200/50 dark:border-secondary-700/50"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <svg className="w-3 h-3 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  {selectedCategory}
                  <motion.button
                    onClick={() => onCategoryChange('All')}
                    className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-secondary-300/50 dark:hover:bg-secondary-700/50 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </motion.span>
              )}
              
              {selectedStatus && selectedStatus !== 'All' && onStatusChange && (
                <motion.span
                  className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-medium bg-gradient-to-r from-neutral-100 to-neutral-200 text-neutral-800 dark:from-neutral-700/50 dark:to-neutral-600/50 dark:text-white shadow-md border border-neutral-200/50 dark:border-neutral-600/50"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <svg className="w-3 h-3 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {selectedStatus}
                  <motion.button
                    onClick={() => onStatusChange('All')}
                    className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-neutral-300/50 dark:hover:bg-neutral-600/50 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </motion.span>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default SearchAndFilter