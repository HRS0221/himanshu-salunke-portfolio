import React from 'react'
import { motion } from 'framer-motion'
import { useArticleStatistics } from '../../hooks/useArticleStatistics'
import { articles } from '../../data/articles'

const ArticleEngagementMetrics: React.FC = () => {
  const { totalViews, totalLikes, getArticleViews, getArticleLikes } = useArticleStatistics(articles)

  const metrics = [
    {
      title: 'Total Articles',
      value: articles.length,
      description: 'Published articles across all categories',
      icon: '📝',
      color: 'from-blue-500 to-blue-600',
      trend: 'up',
      trendValue: '+2 this month'
    },
    {
      title: 'Total Views',
      value: totalViews.toLocaleString(),
      description: 'Cumulative views across all articles',
      icon: '👁️',
      color: 'from-green-500 to-green-600',
      trend: 'up',
      trendValue: '+15% this week'
    },
    {
      title: 'Total Likes',
      value: totalLikes.toLocaleString(),
      description: 'Reader engagement and appreciation',
      icon: '❤️',
      color: 'from-red-500 to-pink-500',
      trend: 'up',
      trendValue: '+8% this week'
    },
    {
      title: 'Avg. Read Time',
      value: '8.5 min',
      description: 'Average time readers spend on articles',
      icon: '⏱️',
      color: 'from-purple-500 to-purple-600',
      trend: 'stable',
      trendValue: 'Consistent'
    },
    {
      title: 'Engagement Rate',
      value: '12.5%',
      description: 'Likes per view ratio',
      icon: '📊',
      color: 'from-orange-500 to-orange-600',
      trend: 'up',
      trendValue: '+2.1%'
    },
    {
      title: 'Featured Articles',
      value: articles.filter(a => a.featured).length,
      description: 'Highlighted and recommended content',
      icon: '⭐',
      color: 'from-yellow-500 to-yellow-600',
      trend: 'stable',
      trendValue: 'Quality content'
    }
  ]

  const topArticles = articles
    .map(article => ({
      ...article,
      views: getArticleViews(article.id),
      likes: getArticleLikes(article.id)
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 3)

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return '📈'
      case 'down':
        return '📉'
      case 'stable':
        return '➡️'
      default:
        return ''
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600 dark:text-green-400'
      case 'down':
        return 'text-red-600 dark:text-red-400'
      case 'stable':
        return 'text-blue-600 dark:text-blue-400'
      default:
        return 'text-neutral-600 dark:text-neutral-400'
    }
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
          📊 Article Engagement Metrics
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Track the performance and impact of my content
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            className="group relative bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -2, scale: 1.02 }}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl`} />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">{metric.icon}</div>
                {metric.trend && metric.trendValue && (
                  <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor(metric.trend)}`}>
                    <span>{getTrendIcon(metric.trend)}</span>
                    <span>{metric.trendValue}</span>
                  </div>
                )}
              </div>

              {/* Value */}
              <div className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                {metric.value}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                {metric.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {metric.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Top Performing Articles */}
      <motion.div
        className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
            🏆 Top Performing Articles
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Most viewed and engaged content
          </p>
        </div>

        <div className="space-y-4">
          {topArticles.map((article, index) => (
            <motion.div
              key={article.id}
              className="flex items-center justify-between p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 1.0 + index * 0.1 }}
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  #{index + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 dark:text-white">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                    <span>👁️ {article.views.toLocaleString()} views</span>
                    <span>❤️ {article.likes} likes</span>
                    <span>⏱️ {article.readTime} min read</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                  {article.category}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  {new Date(article.date).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ArticleEngagementMetrics
