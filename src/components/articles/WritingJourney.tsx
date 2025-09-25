import React from 'react'
import { motion } from 'framer-motion'
import { articles } from '../../data/articles'

const WritingJourney: React.FC = () => {
  const milestones = [
    {
      date: '2024-01',
      title: 'First Article Published',
      description: 'Started my writing journey with a beginner-friendly tutorial on React hooks',
      icon: '🌱',
      color: 'from-green-500 to-green-600',
      articles: 1,
      achievement: 'First Steps'
    },
    {
      date: '2024-03',
      title: 'First Article Series',
      description: 'Published my first comprehensive article series on machine learning fundamentals',
      icon: '📈',
      color: 'from-blue-500 to-blue-600',
      articles: 3,
      achievement: 'Content Creation'
    },
    {
      date: '2024-06',
      title: 'Featured on Dev.to',
      description: 'One of my articles was featured on the Dev.to homepage',
      icon: '⭐',
      color: 'from-yellow-500 to-orange-500',
      articles: 5,
      achievement: 'Recognition'
    },
    {
      date: '2024-09',
      title: 'Deep Learning Series',
      description: 'Completed comprehensive deep learning article series covering neural networks',
      icon: '🎯',
      color: 'from-purple-500 to-purple-600',
      articles: 8,
      achievement: 'Expertise'
    },
    {
      date: '2024-12',
      title: 'Community Recognition',
      description: 'Received positive feedback from the developer community and established thought leadership',
      icon: '🏆',
      color: 'from-red-500 to-pink-500',
      articles: 12,
      achievement: 'Thought Leader'
    },
    {
      date: '2025-01',
      title: 'Current Status',
      description: 'Continuing to write and share knowledge while preparing for GATE 2026',
      icon: '🚀',
      color: 'from-indigo-500 to-indigo-600',
      articles: articles.length,
      achievement: 'Ongoing Journey'
    }
  ]

  const writingStats = {
    totalArticles: articles.length,
    totalWords: articles.reduce((sum, article) => sum + (article.readTime * 200), 0), // Approximate words
    avgReadTime: Math.round(articles.reduce((sum, article) => sum + article.readTime, 0) / articles.length),
    publicationFrequency: 'Weekly',
    favoriteTopics: ['Machine Learning', 'React', 'TypeScript'],
    writingGoals: [
      'Publish 2 articles per month',
      'Complete comprehensive ML tutorial series',
      'Write advanced deep learning content',
      'Contribute to open source documentation'
    ]
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + '-01')
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
  }

  return (
    <motion.div
      className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg border border-neutral-200 dark:border-neutral-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
          ✍️ Writing Journey
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          My evolution as a technical writer and content creator
        </p>
      </div>

      {/* Timeline */}
      <div className="relative mb-12">
        {/* Timeline Line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-secondary-500 to-primary-500"></div>
        
        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              className="relative flex items-start gap-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Timeline Dot */}
              <div className="relative z-10 flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary-500 border-4 border-white dark:border-neutral-900 shadow-lg"></div>
                <div className="absolute inset-0 w-8 h-8 rounded-full bg-primary-500 animate-ping opacity-20"></div>
              </div>

              {/* Content */}
              <motion.div
                className="flex-1 bg-white dark:bg-neutral-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-neutral-200 dark:border-neutral-700 shadow-sm"
                whileHover={{ y: -2, scale: 1.01 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">{milestone.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                      {milestone.title}
                    </h3>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                      {formatDate(milestone.date)}
                    </div>
                  </div>
                </div>
                
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-3">
                  {milestone.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                    <span>📝 {milestone.articles} articles</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${milestone.color} text-white`}>
                    {milestone.achievement}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Writing Statistics */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
            {writingStats.totalArticles}
          </div>
          <div className="text-sm text-blue-700 dark:text-blue-300">Articles Published</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
            {writingStats.totalWords.toLocaleString()}
          </div>
          <div className="text-sm text-green-700 dark:text-green-300">Words Written</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
            {writingStats.avgReadTime} min
          </div>
          <div className="text-sm text-purple-700 dark:text-purple-300">Avg. Read Time</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl">
          <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">
            {writingStats.publicationFrequency}
          </div>
          <div className="text-sm text-orange-700 dark:text-orange-300">Publishing</div>
        </div>
      </motion.div>

      {/* Writing Goals */}
      <motion.div
        className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="text-2xl">🎯</div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
            Current Writing Goals
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {writingStats.writingGoals.map((goal, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 p-3 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
            >
              <div className="text-primary-600 dark:text-primary-400 text-lg">✓</div>
              <span className="text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                {goal}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Personal Quote */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <div className="bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-600">
          <blockquote className="text-lg italic text-neutral-700 dark:text-neutral-300 mb-4">
            "Writing is not just about sharing knowledge; it's about learning, growing, and connecting with 
            a community of passionate developers. Every article I write teaches me something new."
          </blockquote>
          <footer className="text-sm text-neutral-500 dark:text-neutral-400">
            — My philosophy on technical writing
          </footer>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default WritingJourney
