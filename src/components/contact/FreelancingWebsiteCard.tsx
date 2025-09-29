import React from 'react'
import { motion } from 'framer-motion'

const FreelancingWebsiteCard: React.FC = () => {
  return (
    <motion.div
      className="bg-white dark:bg-neutral-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-neutral-200 dark:border-neutral-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-2">
          💼 Last Minute Projects
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
          Complete software projects - any tech stack, on time. Student-friendly pricing under ₹6k
        </p>
      </div>

      {/* Card Content */}
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-4 sm:p-6 md:p-8 text-center">
        <div className="mb-4 sm:mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-2">
            Complete Software Projects
          </h3>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mb-4 sm:mb-6">
            From web apps to AI/ML, mobile to data analytics. We build it all with complete code and documentation.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="text-center">
            <div className="text-xl sm:text-2xl mb-2">🤖</div>
            <div className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white">AI/ML & LLM</div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400">Complete ML Pipelines</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl mb-2">💻</div>
            <div className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white">Web & Mobile</div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400">Full-Stack Applications</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl mb-2">⚡</div>
            <div className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white">Fast Delivery</div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400">1 Week Completion</div>
          </div>
        </div>

        {/* CTA Button */}
        <motion.a
          href="https://lastminuteproject.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Visit Last Minute Projects</span>
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </motion.a>

        {/* Additional Info */}
        <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 space-y-1">
          <p>✓ Complete code & documentation</p>
          <p>✓ Student-friendly pricing under ₹6k</p>
          <p>✓ 1 week delivery with daily updates</p>
        </div>
      </div>
    </motion.div>
  )
}

export default FreelancingWebsiteCard
