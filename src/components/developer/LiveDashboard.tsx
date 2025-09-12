import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGitHubStats } from '../../hooks/useGitHubStats'
import { useSocialStats } from '../../hooks/useSocialStats'

interface ActivityItem {
  id: string
  type: 'commit' | 'pull_request' | 'issue' | 'star'
  title: string
  description: string
  time: string
  repo?: string
  language?: string
}

const LiveDashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isOnline, setIsOnline] = useState(true)
  const githubStats = useGitHubStats()
  const socialStats = useSocialStats()

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  // Mock recent activity data (in real app, this would come from GitHub API)
  const recentActivity: ActivityItem[] = [
    {
      id: '1',
      type: 'commit',
      title: 'Enhanced project filtering system',
      description: 'Added advanced filtering options for better user experience',
      time: '2 hours ago',
      repo: 'portfolio-website',
      language: 'TypeScript'
    },
    {
      id: '2',
      type: 'pull_request',
      title: 'Fix responsive design issues',
      description: 'Resolved mobile layout problems in project cards',
      time: '4 hours ago',
      repo: 'portfolio-website',
      language: 'CSS'
    },
    {
      id: '3',
      type: 'star',
      title: 'Starred awesome-ai-projects',
      description: 'Found an amazing collection of AI project ideas',
      time: '1 day ago',
      repo: 'awesome-ai-projects'
    },
    {
      id: '4',
      type: 'commit',
      title: 'Added real-time data visualization',
      description: 'Implemented live charts for dashboard analytics',
      time: '2 days ago',
      repo: 'data-viz-app',
      language: 'Python'
    }
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'commit':
        return '💻'
      case 'pull_request':
        return '🔀'
      case 'issue':
        return '🐛'
      case 'star':
        return '⭐'
      default:
        return '📝'
    }
  }

  const getLanguageColor = (language?: string) => {
    const colors: Record<string, string> = {
      'TypeScript': 'text-blue-600',
      'JavaScript': 'text-yellow-500',
      'Python': 'text-green-600',
      'CSS': 'text-pink-500',
      'HTML': 'text-orange-500'
    }
    return colors[language || ''] || 'text-gray-500'
  }

  return (
    <motion.div
      className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg border border-neutral-200 dark:border-neutral-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            🚀 Live Development Dashboard
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Real-time coding activity and development metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
            {githubStats.isLoading ? '...' : githubStats.totalCommits || 0}
          </div>
          <div className="text-sm text-blue-700 dark:text-blue-300">Total Commits</div>
        </motion.div>

        <motion.div
          className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
            {githubStats.isLoading ? '...' : githubStats.repositories || 0}
          </div>
          <div className="text-sm text-green-700 dark:text-green-300">Repositories</div>
        </motion.div>

        <motion.div
          className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
            {githubStats.isLoading ? '...' : githubStats.stars || 0}
          </div>
          <div className="text-sm text-purple-700 dark:text-purple-300">Stars Earned</div>
        </motion.div>

        <motion.div
          className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">
            {socialStats.leetcode.isLoading ? '...' : socialStats.leetcode.totalSolved || 0}
          </div>
          <div className="text-sm text-orange-700 dark:text-orange-300">Problems Solved</div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={activity.id}
              className="flex items-start gap-4 p-4 bg-neutral-50 dark:bg-neutral-700 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="text-2xl">{getActivityIcon(activity.type)}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-neutral-900 dark:text-white">
                    {activity.title}
                  </h4>
                  {activity.language && (
                    <span className={`text-xs px-2 py-1 rounded-full bg-neutral-200 dark:bg-neutral-600 ${getLanguageColor(activity.language)}`}>
                      {activity.language}
                    </span>
                  )}
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                  {activity.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
                  <span>{activity.time}</span>
                  {activity.repo && (
                    <span className="font-mono">@{activity.repo}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Current Status */}
      <motion.div
        className="mt-8 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Currently working on: Enhanced portfolio features
          </span>
        </div>
        <div className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
          Last updated: {currentTime.toLocaleTimeString()}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default LiveDashboard
