import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useUnifiedStats } from '../../hooks/useUnifiedStats'

export const ViewAllProjectsCard: React.FC = () => {
  const unifiedStats = useUnifiedStats()

  return (
    <motion.div
      className="group relative bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg border border-neutral-200 dark:border-neutral-700 hover:shadow-2xl transition-all duration-500 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">
          My Projects
        </h3>

        {/* Description */}
        <p className="text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
          Explore my portfolio of AI/ML applications, computer vision projects, and web development work.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-500">
              {unifiedStats.isLoading ? '...' : `${unifiedStats.projectsCompleted}+`}
            </div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              Projects
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-500">
              3
            </div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              Featured
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['AI/ML', 'Computer Vision', 'Deep Learning', 'Web Dev'].map((category) => (
            <span
              key={category}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full"
            >
              {category}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <Link to="/work">
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Explore Projects</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.div>
        </Link>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-100/30 to-transparent dark:from-blue-800/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  )
}
