import React, { memo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useGitHubStats } from '../../hooks/useGitHubStats'
import { Tag } from '../ui/Tag'
import { ImageWithShimmer } from '../ui/ImageWithShimmer'

interface Project {
  slug: string
  title: string
  summary: string
  coverImage: string
  category: string
  techStack: string[]
  date: string
  featured: boolean
  githubUrl?: string
  liveUrl?: string
  metrics?: Array<{ label: string; value: string }>
}

interface EnhancedProjectCardProps {
  project: Project
  index: number
  isRecruiterMode?: boolean
}

export const EnhancedProjectCard: React.FC<EnhancedProjectCardProps> = memo(({ 
  project, 
  index, 
  isRecruiterMode = false 
}) => {
  const stats = useGitHubStats('himanshu', project.slug)
  const isLoading = stats.isLoading

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'AI/ML': 'bg-purple-100 text-purple-900 border border-purple-200 dark:bg-purple-600 dark:text-white dark:border-purple-500 font-semibold',
      'Web Development': 'bg-blue-100 text-blue-900 border border-blue-200 dark:bg-blue-600 dark:text-white dark:border-blue-500 font-semibold',
      'Mobile': 'bg-indigo-100 text-indigo-900 border border-indigo-200 dark:bg-indigo-600 dark:text-white dark:border-indigo-500 font-semibold',
      'Data Science': 'bg-orange-100 text-orange-900 border border-orange-200 dark:bg-orange-600 dark:text-white dark:border-orange-500 font-semibold',
      'DevOps': 'bg-red-100 text-red-900 border border-red-200 dark:bg-red-600 dark:text-white dark:border-red-500 font-semibold',
      'Open Source': 'bg-gray-100 text-gray-900 border border-gray-200 dark:bg-gray-600 dark:text-white dark:border-gray-500 font-semibold'
    }
    return colors[category] || 'bg-neutral-100 text-neutral-900 border border-neutral-200 dark:bg-neutral-600 dark:text-white dark:border-neutral-500 font-semibold'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    })
  }
  
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
    return `${Math.floor(diffInDays / 365)} years ago`
  }

  return (
    <motion.div
      className="group relative bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      {/* Featured Badge */}
      {project.featured && (
        <motion.div
          className="absolute top-4 left-4 z-10 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-2 py-1 rounded-full text-xs font-medium"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 + index * 0.1 }}
        >
          ⭐ Featured
        </motion.div>
      )}

      {/* Category Tag */}
      <div className="absolute top-4 right-4 z-10">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(project.category)}`}>
          {project.category}
        </span>
      </div>

      {/* Project Image */}
      <div className="relative overflow-hidden">
        <ImageWithShimmer
          src={project.coverImage}
          alt={project.title}
          className="w-full h-auto object-contain group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex gap-2">
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </motion.a>
              )}
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Title and Date */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {project.title}
          </h3>
          <span className="text-sm text-neutral-500 dark:text-neutral-400 ml-2">
            {formatDate(project.date)}
          </span>
        </div>

        {/* Summary */}
        <p className="text-neutral-600 dark:text-neutral-300 mb-4 line-clamp-2">
          {project.summary}
        </p>

        {/* GitHub Stats */}
        {project.githubUrl && !isLoading && (
          <motion.div
            className="flex items-center gap-4 mb-4 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <div className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>{stats.stars}</span>
            </div>
            <div className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              <span>{stats.forks}</span>
            </div>
            <div className="text-neutral-500 dark:text-neutral-400">
              Updated {getTimeAgo(stats.lastCommit)}
            </div>
          </motion.div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.slice(0, isRecruiterMode ? 6 : 4).map((tech, techIndex) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 + techIndex * 0.05 }}
            >
              <Tag variant="primary" size="sm">
                {tech}
              </Tag>
            </motion.div>
          ))}
          {project.techStack.length > (isRecruiterMode ? 6 : 4) && (
            <Tag variant="default" size="sm">
              +{project.techStack.length - (isRecruiterMode ? 6 : 4)} more
            </Tag>
          )}
        </div>

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {project.metrics.slice(0, 2).map((metric, metricIndex) => (
              <motion.div
                key={metric.label}
                className="bg-neutral-50 dark:bg-neutral-700 rounded-lg p-2 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 + metricIndex * 0.05 }}
              >
                <div className="text-lg font-bold text-primary-600 dark:text-primary-500">
                  {metric.value}
                </div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 + index * 0.1 }}
        >
          <Link
            to={`/work/${project.slug}`}
            onClick={incrementView}
            className="block w-full text-center bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 group-hover:shadow-lg"
          >
            View Project
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
})
