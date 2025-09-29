import React from 'react'
import { motion } from 'framer-motion'
import { articles } from '../../data/articles'

const ArticleCategories: React.FC = () => {
  const categories = [
    {
      name: 'Machine Learning',
      description: 'Fundamental ML concepts, algorithms, and practical applications',
      icon: '🤖',
      color: 'from-purple-500 to-purple-600',
      articleCount: articles.filter(a => a.category === 'Machine Learning').length,
      tags: ['Supervised Learning', 'Unsupervised Learning', 'Classification', 'Regression'],
      featured: true
    },
    {
      name: 'Deep Learning',
      description: 'Advanced neural networks, architectures, and training techniques',
      icon: '🧠',
      color: 'from-blue-500 to-blue-600',
      articleCount: articles.filter(a => a.category === 'Deep Learning').length,
      tags: ['Neural Networks', 'CNN', 'RNN', 'Transformers'],
      featured: true
    },
    {
      name: 'Reinforcement Learning',
      description: 'RL algorithms, policies, and real-world applications',
      icon: '🎮',
      color: 'from-green-500 to-green-600',
      articleCount: articles.filter(a => a.category === 'Reinforcement Learning').length,
      tags: ['Q-Learning', 'Policy Gradient', 'Multi-Agent', 'Game Theory'],
      featured: true
    }
  ]

  const getEngagementLevel = (articleCount: number) => {
    if (articleCount > 15) return { level: 'High', color: 'text-green-600 dark:text-green-400' }
    if (articleCount > 10) return { level: 'Medium', color: 'text-yellow-600 dark:text-yellow-400' }
    return { level: 'Growing', color: 'text-blue-600 dark:text-blue-400' }
  }

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
          📚 Article Categories
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
          Explore content organized by topics and expertise areas
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {categories.map((category, index) => {
          const engagement = getEngagementLevel(category.articleCount) // Use article count as engagement indicator
          
          return (
            <motion.div
              key={category.name}
              className={`group relative rounded-xl p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all duration-300 cursor-pointer ${
                category.featured 
                  ? 'bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-2 border-primary-200 dark:border-primary-800' 
                  : 'bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-800 border border-neutral-200 dark:border-neutral-600'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              {/* Featured Badge */}
              {category.featured && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  ⭐ Featured
                </div>
              )}

              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="text-2xl sm:text-3xl">{category.icon}</div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                      {category.name}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                        {category.articleCount} articles
                      </span>
                      <span className={`text-xs font-medium ${engagement.color}`}>
                        {engagement.level} engagement
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-3 sm:mb-4 leading-relaxed">
                  {category.description}
                </p>

                {/* Tags */}
                <div className="mb-3 sm:mb-4">
                  <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-1 sm:mb-2 uppercase tracking-wide">
                    Key Topics
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {category.tags.slice(0, 3).map((tag, tagIndex) => (
                      <motion.span
                        key={tag}
                        className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-neutral-200 dark:bg-neutral-600 text-neutral-700 dark:text-neutral-300 text-xs rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 + tagIndex * 0.05 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                    {category.tags.length > 3 && (
                      <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-neutral-200 dark:bg-neutral-600 text-neutral-700 dark:text-neutral-300 text-xs rounded-full">
                        +{category.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between">
                  <div className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-white bg-primary-100 dark:bg-primary-900 px-2 sm:px-3 py-1 rounded-lg">
                    {category.articleCount}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    articles
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-primary-100/30 to-transparent dark:from-primary-800/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          )
        })}
      </div>

      {/* Summary */}
      <motion.div
        className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-800 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <div className="text-xl sm:text-2xl">💡</div>
          <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white">
            Content Strategy
          </h3>
        </div>
        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
          I focus on creating high-quality, practical content that bridges the gap between theory and practice. 
          Each article is designed to provide real value, whether you're a beginner learning the basics or 
          an experienced developer looking for advanced insights.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default ArticleCategories
