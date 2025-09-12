import React from 'react'
import { motion } from 'framer-motion'

interface TechUsageBarProps {
  tech: string
  percentage: number
  index: number
  color?: string
}

const techColors: { [key: string]: string } = {
  'React': 'from-blue-500 to-blue-600',
  'TypeScript': 'from-blue-600 to-blue-700',
  'Python': 'from-yellow-500 to-yellow-600',
  'Node.js': 'from-green-500 to-green-600',
  'AWS': 'from-orange-500 to-orange-600',
  'Docker': 'from-blue-400 to-blue-500',
  'TensorFlow': 'from-orange-600 to-orange-700',
  'PostgreSQL': 'from-blue-700 to-blue-800',
  'MongoDB': 'from-green-600 to-green-700',
  'Redis': 'from-red-500 to-red-600',
  'JavaScript': 'from-yellow-400 to-yellow-500',
  'HTML': 'from-orange-500 to-orange-600',
  'CSS': 'from-blue-500 to-blue-600',
  'Git': 'from-red-600 to-red-700',
  'Linux': 'from-yellow-600 to-yellow-700'
}

export const TechUsageBar: React.FC<TechUsageBarProps> = ({ 
  tech, 
  percentage, 
  index, 
  color 
}) => {
  const gradientClass = color || techColors[tech] || 'from-neutral-500 to-neutral-600'

  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {tech}
        </span>
        <span className="text-sm text-neutral-500 dark:text-neutral-400">
          {percentage}%
        </span>
      </div>
      
      <div className="w-full bg-neutral-200 dark:bg-neutral-600 rounded-full h-2 overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${gradientClass} rounded-full relative`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

interface TechUsageChartProps {
  className?: string
}

export const TechUsageChart: React.FC<TechUsageChartProps> = ({ className = '' }) => {
  const techData = [
    { tech: 'React', percentage: 35 },
    { tech: 'TypeScript', percentage: 30 },
    { tech: 'Python', percentage: 20 },
    { tech: 'Node.js', percentage: 15 },
    { tech: 'AWS', percentage: 10 },
    { tech: 'Docker', percentage: 8 },
    { tech: 'TensorFlow', percentage: 12 },
    { tech: 'PostgreSQL', percentage: 6 },
    { tech: 'MongoDB', percentage: 4 },
    { tech: 'Redis', percentage: 3 }
  ]

  return (
    <div className={`bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700 ${className}`}>
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
        Technology Usage
      </h3>
      
      <div className="space-y-4">
        {techData.map((item, index) => (
          <TechUsageBar
            key={item.tech}
            tech={item.tech}
            percentage={item.percentage}
            index={index}
          />
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700">
        <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
          Based on project contributions and time spent
        </p>
      </div>
    </div>
  )
}
