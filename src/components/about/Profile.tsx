import React from 'react'
import { motion } from 'framer-motion'
import { ImageWithShimmer } from '../ui/ImageWithShimmer'
import { useUnifiedStats } from '../../hooks/useUnifiedStats'

export const Profile: React.FC = () => {
  const unifiedStats = useUnifiedStats()

  return (
    <motion.section
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Profile Image */}
        <div className="order-1 lg:order-1">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <ImageWithShimmer
              src="/images/avatar.jpg"
              alt="Himanshu - Aspiring Data Scientist & ML Engineer"
              className="w-full h-96 lg:h-full object-cover rounded-xl shadow-lg"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
          </motion.div>
        </div>

        {/* Profile Content */}
        <div className="order-2 lg:order-2 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
              Hi, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                Himanshu Kishor Salunke
              </span>
            </h1>
            
            <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
              I'm an Aspiring Data Scientist and ML Engineer passionate about building intelligent 
              solutions with Python, Machine Learning, and AI. Currently preparing for GATE - 2026 
              while building innovative AI projects and learning new technologies.
            </p>
            
            <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed">
              I have a strong foundation in computer science and data science, with hands-on experience 
              in machine learning, statistical analysis, and data visualization. My journey has been 
              marked by resilience and determination, overcoming significant challenges to achieve my 
              academic and professional goals.
            </p>

            {/* Personal Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <motion.div
                className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 p-4 rounded-lg border border-primary-200 dark:border-primary-800"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🎓</div>
                  <div>
                    <div className="text-lg font-bold text-neutral-900 dark:text-white">B.Tech in Data Science</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">7.39 CGPA</div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🏆</div>
                  <div>
                    <div className="text-lg font-bold text-neutral-900 dark:text-white">Hackathon Leader</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">85 teams coordinated</div>
                  </div>
                </div>
              </motion.div>
            </div>

          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
