import React from 'react'
import { motion } from 'framer-motion'
import { useUnifiedStats } from '../../hooks/useUnifiedStats'

interface ImpactMetric {
  title: string
  value: string | number
  description: string
  icon: string
  color: string
  trend?: 'up' | 'down' | 'stable'
  trendValue?: string
}

const ProjectImpactMetrics: React.FC = () => {
  const unifiedStats = useUnifiedStats()

  const impactMetrics: ImpactMetric[] = [
    {
      title: 'Total Projects',
      value: unifiedStats.isLoading ? '...' : unifiedStats.projectsCompleted,
      description: 'Personal projects built to learn and explore new technologies',
      icon: '🚀',
      color: 'from-blue-500 to-blue-600',
      trend: 'up',
      trendValue: 'Always growing'
    },
    {
      title: 'Technologies Explored',
      value: '25+',
      description: 'Different technologies and frameworks I\'ve worked with',
      icon: '🛠️',
      color: 'from-purple-500 to-purple-600',
      trend: 'up',
      trendValue: 'Learning more'
    },
    {
      title: 'Learning Focus',
      value: 'AI/ML',
      description: 'Primary focus on artificial intelligence and machine learning',
      icon: '🤖',
      color: 'from-green-500 to-green-600',
      trend: 'stable',
      trendValue: 'Passionate'
    },
    {
      title: 'Project Types',
      value: 'Diverse',
      description: 'From web apps to data analysis and computer vision',
      icon: '🎯',
      color: 'from-yellow-500 to-orange-500',
      trend: 'up',
      trendValue: 'Exploring'
    },
    {
      title: 'GitHub Activity',
      value: 'Active',
      description: 'Regular commits and open source contributions',
      icon: '📈',
      color: 'from-pink-500 to-rose-500',
      trend: 'up',
      trendValue: 'Consistent'
    },
    {
      title: 'Innovation Drive',
      value: 'High',
      description: 'Always experimenting with cutting-edge technologies',
      icon: '💡',
      color: 'from-indigo-500 to-indigo-600',
      trend: 'up',
      trendValue: 'Curious'
    }
  ]

  const getTrendIcon = (trend?: string) => {
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

  const getTrendColor = (trend?: string) => {
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
          📊 Project Overview
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          A snapshot of my personal projects and learning journey
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {impactMetrics.map((metric, index) => (
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
            Learning Philosophy
          </h3>
        </div>
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Each project represents a step in my learning journey, exploring new technologies, 
          solving interesting problems, and building practical solutions. I believe in 
          hands-on learning through building real projects that challenge my skills and 
          expand my knowledge in AI/ML and software development.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default ProjectImpactMetrics
