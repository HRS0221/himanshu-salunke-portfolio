import React from 'react'
import { motion } from 'framer-motion'
import { useGitHubStats } from '../../hooks/useGitHubStats'

interface MetricCardProps {
  title: string
  value: string | number
  description: string
  icon: string
  color: string
  trend?: 'up' | 'down' | 'stable'
  trendValue?: string
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  description,
  icon,
  color,
  trend,
  trendValue
}) => {
  const getTrendIcon = () => {
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

  const getTrendColor = () => {
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
      className="group relative bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700 hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -2, scale: 1.02 }}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl`} />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl">{icon}</div>
          {trend && trendValue && (
            <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor()}`}>
              <span>{getTrendIcon()}</span>
              <span>{trendValue}</span>
            </div>
          )}
        </div>

        {/* Value */}
        <div className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
          {value}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

const CodeQualityMetrics: React.FC = () => {
  const githubStats = useGitHubStats('HRS0221')

  // Calculate real metrics based on GitHub data
  const totalStars = githubStats.stars || 0
  const totalForks = githubStats.forks || 0
  const totalWatchers = githubStats.watchers || 0
  const languagesCount = Object.keys(githubStats.languages || {}).length
  
  // Calculate quality score based on real metrics
  const getQualityScore = () => {
    if (githubStats.isLoading) return '...'
    const score = Math.min(100, Math.max(60, 
      (totalStars * 2) + 
      (totalForks * 3) + 
      (totalWatchers * 1) + 
      (languagesCount * 5)
    ))
    return `${Math.round(score)}/100`
  }

  const getLanguageDiversity = () => {
    if (githubStats.isLoading) return '...'
    return `${languagesCount}+ languages`
  }

  const getLastActivity = () => {
    if (githubStats.isLoading || !githubStats.lastCommit) return '...'
    const lastCommit = new Date(githubStats.lastCommit)
    const daysAgo = Math.floor((Date.now() - lastCommit.getTime()) / (1000 * 60 * 60 * 24))
    return daysAgo === 0 ? 'Today' : `${daysAgo} days ago`
  }

  const metrics = [
    {
      title: 'GitHub Stars',
      value: githubStats.isLoading ? '...' : totalStars,
      description: 'Total stars received across all repositories, indicating code quality and community recognition',
      icon: '⭐',
      color: 'from-yellow-500 to-orange-500',
      trend: 'up' as const,
      trendValue: 'Live'
    },
    {
      title: 'Repository Forks',
      value: githubStats.isLoading ? '...' : totalForks,
      description: 'Number of times repositories have been forked, showing code reusability and adoption',
      icon: '🍴',
      color: 'from-green-500 to-emerald-500',
      trend: 'up' as const,
      trendValue: 'Live'
    },
    {
      title: 'Language Diversity',
      value: getLanguageDiversity(),
      description: 'Number of programming languages used across projects, showing versatility and adaptability',
      icon: '🌐',
      color: 'from-blue-500 to-cyan-500',
      trend: 'stable' as const,
      trendValue: 'Live'
    },
    {
      title: 'Last Activity',
      value: getLastActivity(),
      description: 'Time since last commit, indicating active development and consistent contribution',
      icon: '🕒',
      color: 'from-purple-500 to-pink-500',
      trend: 'stable' as const,
      trendValue: 'Live'
    },
    {
      title: 'Code Quality Score',
      value: getQualityScore(),
      description: 'Calculated based on stars, forks, watchers, and language diversity from GitHub data',
      icon: '🏆',
      color: 'from-red-500 to-orange-500',
      trend: 'up' as const,
      trendValue: 'Live'
    },
    {
      title: 'Repository Watchers',
      value: githubStats.isLoading ? '...' : totalWatchers,
      description: 'Number of users watching repositories for updates, indicating project interest and engagement',
      icon: '👀',
      color: 'from-indigo-500 to-purple-500',
      trend: 'stable' as const,
      trendValue: 'Live'
    }
  ]

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
          📊 Code Quality Metrics
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Measuring excellence in code quality, performance, and development practices
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <MetricCard {...metric} />
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <motion.div
        className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="text-2xl">🎯</div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
            Development Philosophy
          </h3>
        </div>
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
          I believe in writing clean, maintainable, and well-tested code. Every line of code 
          should serve a purpose, be readable by others, and contribute to the overall quality 
          of the project. Quality over quantity, always.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default CodeQualityMetrics
