import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { articles } from '../../data/articles'

export const ViewAllArticlesCard: React.FC = () => {

  return (
    <motion.div
      className="group relative bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg border border-neutral-200 dark:border-neutral-700 hover:shadow-2xl transition-all duration-500 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">
          My Articles
        </h3>

        {/* Description */}
        <p className="text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
          Read my latest insights on machine learning, web development, and modern software engineering practices.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-500">
              {articles.length}+
            </div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              Articles
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['Machine Learning', 'Deep Learning', 'Reinforcement Learning'].map((category) => (
            <span
              key={category}
              className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium rounded-full"
            >
              {category}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <Link to="/articles">
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Read Articles</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.div>
        </Link>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-green-100/30 to-transparent dark:from-green-800/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  )
}
