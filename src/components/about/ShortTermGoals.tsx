import React from 'react'
import { motion } from 'framer-motion'

export const ShortTermGoals: React.FC = () => {
  const goals = [
    {
      goal: "Complete React 19 migration for all projects",
      progress: 75,
      deadline: "End of month"
    },
    {
      goal: "Launch AI-powered portfolio features",
      progress: 40,
      deadline: "Next 2 weeks"
    },
    {
      goal: "Write 3 technical articles",
      progress: 60,
      deadline: "This quarter"
    },
    {
      goal: "Contribute to 5 open source projects",
      progress: 20,
      deadline: "Ongoing"
    }
  ]

  return (
    <motion.section
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
        Short-term Goals
      </h2>
      <div className="space-y-4">
        {goals.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-neutral-800 rounded-lg p-4 shadow border border-neutral-200 dark:border-neutral-700"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-neutral-900 dark:text-white">
                {item.goal}
              </h3>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                {item.deadline}
              </span>
            </div>
            <div className="w-full bg-neutral-200 dark:bg-neutral-600 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${item.progress}%` }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
              />
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
              {item.progress}% complete
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
