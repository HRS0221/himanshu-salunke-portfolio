import React from 'react'
import { motion } from 'framer-motion'
import { StatsCounter } from '../ui/StatsCounter'
import { useUnifiedStats } from '../../hooks/useUnifiedStats'

interface Stat {
  value: number
  suffix: string
  label: string
  description: string
  icon: string
}

// Unique impact metrics for homepage only
const getStats = (unifiedStats: any): Stat[] => [
  {
    value: unifiedStats.isLoading ? 0 : unifiedStats.projectsCompleted,
    suffix: '+',
    label: 'Successful Deployments',
    description: 'Projects completed and deployed successfully',
    icon: '✨'
  },
  {
    value: 26,
    suffix: '+',
    label: 'Freelancing Projects',
    description: 'AI/ML solutions delivered for diverse clients',
    icon: '💼'
  },
  {
    value: 90,
    suffix: '%',
    label: 'Client Satisfaction',
    description: 'Dedicated to exceeding expectations every time',
    icon: '⭐'
  }
]

export const StatsSection: React.FC = () => {
  const unifiedStats = useUnifiedStats()
  const stats = getStats(unifiedStats)

  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
          Making an Impact
        </h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Here's how I'm building the future, one innovative solution at a time.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="group relative bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg border border-neutral-200 dark:border-neutral-700 hover:shadow-2xl transition-all duration-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            
            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Icon */}
              <div className="text-4xl mb-4">
                {stat.icon}
              </div>
              
              {/* Counter */}
              <StatsCounter
                value={stat.value}
                suffix={stat.suffix}
                className="mb-3 text-3xl font-bold text-primary-600 dark:text-primary-400"
              />
              
              {/* Label */}
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                {stat.label}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {stat.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
