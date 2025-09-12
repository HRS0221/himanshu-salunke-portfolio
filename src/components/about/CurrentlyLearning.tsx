import React from 'react'
import { motion } from 'framer-motion'

export const CurrentlyLearning: React.FC = () => {
  const learningItems = [
    {
      title: "🎓 Advanced React Patterns",
      description: "Exploring compound components, render props, and custom hooks for better component architecture."
    },
    {
      title: "🤖 Machine Learning Ops",
      description: "Learning MLOps practices, model deployment, and monitoring for production ML systems."
    },
    {
      title: "☁️ Cloud Architecture",
      description: "Deepening knowledge of AWS services, serverless architecture, and scalable system design."
    },
    {
      title: "🎨 Design Systems",
      description: "Studying design tokens, component libraries, and creating consistent user experiences."
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
        Currently Learning
      </h2>
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700">
        <div className="grid gap-4 md:grid-cols-2">
          {learningItems.map((item, index) => (
            <motion.div
              key={index}
              className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-700/50 border border-neutral-200 dark:border-neutral-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
