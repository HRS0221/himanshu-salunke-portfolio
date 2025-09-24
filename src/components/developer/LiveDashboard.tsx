import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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
  const [recentCommits, setRecentCommits] = useState<any[]>([])
  const [isLoadingCommits, setIsLoadingCommits] = useState(true)
  const socialStats = useSocialStats()

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  // Fetch recent GitHub activity
  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        setIsLoadingCommits(true)
        
        // First, let's check if the user exists and get their repos
        console.log('Fetching GitHub user info...')
        const userResponse = await fetch('https://api.github.com/users/HRS0221')
        if (!userResponse.ok) {
          throw new Error(`User not found: ${userResponse.status}`)
        }
        const userData = await userResponse.json()
        console.log('GitHub user data:', userData)
        
        // Get user's repositories to find recent activity
        console.log('Fetching user repositories...')
        const reposResponse = await fetch('https://api.github.com/users/HRS0221/repos?sort=updated&per_page=20')
        if (!reposResponse.ok) {
          throw new Error(`Repos not found: ${reposResponse.status}`)
        }
        const repos = await reposResponse.json()
        console.log('User repositories:', repos)
        
        // Get recent commits from the most recently updated repos
        const recentCommits: any[] = []
        
        // Try different time ranges if no recent commits found
        const timeRanges = [
          { days: 7, label: 'last 7 days' },
          { days: 30, label: 'last 30 days' },
          { days: 90, label: 'last 90 days' },
          { days: 365, label: 'last year' }
        ]
        
        for (const timeRange of timeRanges) {
          const daysAgo = new Date(Date.now() - timeRange.days * 24 * 60 * 60 * 1000)
          console.log(`Trying to fetch commits from ${timeRange.label}...`)
          
          for (const repo of repos.slice(0, 5)) {
            try {
              console.log(`Fetching commits from ${repo.name} (${timeRange.label})...`)
              const commitsResponse = await fetch(`https://api.github.com/repos/HRS0221/${repo.name}/commits?per_page=10&since=${daysAgo.toISOString()}`)
              if (commitsResponse.ok) {
                const commits = await commitsResponse.json()
                console.log(`Commits from ${repo.name} (${timeRange.label}):`, commits)
                
                commits.forEach((commit: any) => {
                  const commitDate = new Date(commit.commit.author.date)
                  // Only include commits from the current time range
                  if (commitDate >= daysAgo) {
                    recentCommits.push({
                      id: commit.sha,
                      type: 'commit',
                      title: commit.commit.message.split('\n')[0], // First line of commit message
                      description: `Pushed to ${repo.name}`,
                      time: getTimeAgo(commitDate),
                      repo: repo.name,
                      language: repo.language || 'Unknown',
                      commit: commit
                    })
                  }
                })
              }
            } catch (err) {
              console.log(`Failed to get commits from ${repo.name}:`, err)
            }
          }
          
          // If we found commits, break out of the time range loop
          if (recentCommits.length > 0) {
            console.log(`Found ${recentCommits.length} commits from ${timeRange.label}`)
            break
          }
        }
        
        // Sort by date and take the most recent 5
        recentCommits.sort((a, b) => new Date(b.commit.commit.author.date).getTime() - new Date(a.commit.commit.author.date).getTime())
        const topCommits = recentCommits.slice(0, 5)
        
        console.log(`Final result: Found ${recentCommits.length} total commits, showing top 5`)
        
        console.log('Final recent commits:', topCommits)
        setRecentCommits(topCommits)
        
      } catch (error) {
        console.error('Failed to fetch GitHub activity:', error)
        setRecentCommits([])
      } finally {
        setIsLoadingCommits(false)
      }
    }

    fetchRecentActivity()
    
    // Refresh every 5 minutes to get latest commits
    const interval = setInterval(fetchRecentActivity, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // Helper function to get time ago
  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) return 'Just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
    return date.toLocaleDateString()
  }

  // Helper function to determine language from repo name
  const getLanguageFromRepo = (repoName: string) => {
    if (repoName.includes('portfolio') || repoName.includes('website')) return 'TypeScript'
    if (repoName.includes('ml') || repoName.includes('ai') || repoName.includes('data')) return 'Python'
    if (repoName.includes('react') || repoName.includes('frontend')) return 'JavaScript'
    if (repoName.includes('api') || repoName.includes('backend')) return 'Python'
    return 'TypeScript' // Default
  }

  // Use real GitHub activity data
  const recentActivity: ActivityItem[] = isLoadingCommits 
    ? [
        {
          id: 'loading',
          type: 'commit',
          title: 'Loading recent activity...',
          description: 'Fetching your latest GitHub commits',
          time: 'Just now',
          repo: 'github.com',
          language: 'Loading'
        }
      ]
    : recentCommits.length > 0 
      ? recentCommits
      : [
          {
            id: 'no-activity',
            type: 'commit',
            title: 'No recent activity',
            description: 'No recent commits found in your GitHub profile',
            time: 'N/A',
            repo: 'github.com',
            language: 'N/A'
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
      case 'WatchEvent':
        return '⭐'
      case 'create':
      case 'CreateEvent':
        return '🆕'
      case 'fork':
      case 'ForkEvent':
        return '🍴'
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
            {socialStats.github.isLoading ? '...' : socialStats.github.stars || 0}
          </div>
          <div className="text-sm text-blue-700 dark:text-blue-300">GitHub Stars</div>
        </motion.div>

        <motion.div
          className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
            {socialStats.github.isLoading ? '...' : socialStats.github.repositories || 0}
          </div>
          <div className="text-sm text-green-700 dark:text-green-300">Repositories</div>
        </motion.div>

        <motion.div
          className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
            {socialStats.github.isLoading ? '...' : socialStats.github.followers || 0}
          </div>
          <div className="text-sm text-purple-700 dark:text-purple-300">GitHub Followers</div>
        </motion.div>

        <motion.div
          className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">
            {socialStats.leetcode.isLoading ? '...' : socialStats.leetcode.totalSolved || 0}
          </div>
          <div className="text-sm text-orange-700 dark:text-orange-300">LeetCode Solved</div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
            Recent Activity
          </h3>
          <button
            onClick={async () => {
              setIsLoadingCommits(true)
              
              try {
                console.log('Manual refresh - Fetching GitHub user info...')
                const userResponse = await fetch('https://api.github.com/users/HRS0221')
                if (!userResponse.ok) {
                  throw new Error(`User not found: ${userResponse.status}`)
                }
                const userData = await userResponse.json()
                console.log('Manual refresh - User data:', userData)
                
                console.log('Manual refresh - Fetching repositories...')
                const reposResponse = await fetch('https://api.github.com/users/HRS0221/repos?sort=updated&per_page=20')
                if (!reposResponse.ok) {
                  throw new Error(`Repos not found: ${reposResponse.status}`)
                }
                const repos = await reposResponse.json()
                console.log('Manual refresh - Repositories:', repos)
                
                const recentCommits: any[] = []
                
                // Try different time ranges if no recent commits found
                const timeRanges = [
                  { days: 7, label: 'last 7 days' },
                  { days: 30, label: 'last 30 days' },
                  { days: 90, label: 'last 90 days' },
                  { days: 365, label: 'last year' }
                ]
                
                for (const timeRange of timeRanges) {
                  const daysAgo = new Date(Date.now() - timeRange.days * 24 * 60 * 60 * 1000)
                  console.log(`Manual refresh - Trying ${timeRange.label}...`)
                  
                  for (const repo of repos.slice(0, 5)) {
                    try {
                      console.log(`Manual refresh - Fetching commits from ${repo.name} (${timeRange.label})...`)
                      const commitsResponse = await fetch(`https://api.github.com/repos/HRS0221/${repo.name}/commits?per_page=10&since=${daysAgo.toISOString()}`)
                      if (commitsResponse.ok) {
                        const commits = await commitsResponse.json()
                        console.log(`Manual refresh - Commits from ${repo.name} (${timeRange.label}):`, commits)
                        
                        commits.forEach((commit: any) => {
                          const commitDate = new Date(commit.commit.author.date)
                          // Only include commits from the current time range
                          if (commitDate >= daysAgo) {
                            recentCommits.push({
                              id: commit.sha,
                              type: 'commit',
                              title: commit.commit.message.split('\n')[0],
                              description: `Pushed to ${repo.name}`,
                              time: getTimeAgo(commitDate),
                              repo: repo.name,
                              language: repo.language || 'Unknown',
                              commit: commit
                            })
                          }
                        })
                      }
                    } catch (err) {
                      console.log(`Manual refresh - Failed to get commits from ${repo.name}:`, err)
                    }
                  }
                  
                  // If we found commits, break out of the time range loop
                  if (recentCommits.length > 0) {
                    console.log(`Manual refresh - Found ${recentCommits.length} commits from ${timeRange.label}`)
                    break
                  }
                }
                
                recentCommits.sort((a, b) => new Date(b.commit.commit.author.date).getTime() - new Date(a.commit.commit.author.date).getTime())
                const topCommits = recentCommits.slice(0, 5)
                
                console.log(`Manual refresh - Final result: Found ${recentCommits.length} total commits, showing top 5`)
                
                console.log('Manual refresh - Final commits:', topCommits)
                setRecentCommits(topCommits)
                
              } catch (error) {
                console.error('Manual refresh failed:', error)
                setRecentCommits([])
              } finally {
                setIsLoadingCommits(false)
              }
            }}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
            disabled={isLoadingCommits}
          >
            <svg className={`w-4 h-4 ${isLoadingCommits ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {isLoadingCommits ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
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
            Currently working on: Portfolio website enhancements
          </span>
        </div>
        <div className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
          Live data • Last updated: {currentTime.toLocaleTimeString()}
        </div>
        <div className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
          GitHub: {socialStats.github.isLoading ? 'Loading...' : `${socialStats.github.repositories} repos`} • 
          LeetCode: {socialStats.leetcode.isLoading ? 'Loading...' : `${socialStats.leetcode.totalSolved} problems solved`}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default LiveDashboard
