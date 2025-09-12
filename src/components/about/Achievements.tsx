import React from 'react'
import { motion } from 'framer-motion'

interface Achievement {
  id: string
  title: string
  event: string
  year: string
  description: string
  achievement: string
  teamSize?: number
  participants?: number
  level: 'national' | 'international' | 'institutional'
  category: 'hackathon' | 'competition' | 'leadership' | 'academic'
  icon: string
  color: string
}

const achievementsData: Achievement[] = [
  {
    id: 'sih-2023-lead',
    title: 'Internal Hackathon Lead',
    event: 'Smart India Hackathon 2023',
    year: '2023',
    description: 'Led and coordinated an Internal Hackathon for Smart India Hackathon 2023, overseeing 85 teams and fostering innovation and collaboration.',
    achievement: 'Leadership Role',
    teamSize: 85,
    level: 'institutional',
    category: 'leadership',
    icon: '👑',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'sunhacks-2022-finalist',
    title: 'Grand Finalist',
    event: 'SUNHACKS 2022 - International Level',
    year: '2022',
    description: 'Spearheaded a cross-functional effort at SUNHACKS 2022, an International Level Hackathon, securing Grand Finalist recognition among 15 elite teams.',
    achievement: 'Grand Finalist',
    participants: 15,
    level: 'international',
    category: 'hackathon',
    icon: '🏆',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'sih-2022-finalist',
    title: 'Grand Finalist',
    event: 'Smart India Hackathon 2022',
    year: '2022',
    description: 'Achieved Grand Finalist status at the National level in the Smart India Hackathon 2022, competing against 50 teams.',
    achievement: 'Grand Finalist',
    participants: 50,
    level: 'national',
    category: 'hackathon',
    icon: '🥇',
    color: 'from-blue-500 to-blue-600'
  }
]

const levelColors = {
  international: 'bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-700',
  national: 'bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700',
  institutional: 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-700'
}

const categoryIcons = {
  hackathon: '💻',
  competition: '🏅',
  leadership: '👑',
  academic: '🎓'
}

export const Achievements: React.FC = () => {
  return (
    <motion.section
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8 flex items-center gap-3">
        <span className="text-4xl">🏆</span>
        Achievements & Competitions
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievementsData.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            className="group relative bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-neutral-200 dark:border-neutral-700 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            
            {/* Header */}
            <div className="relative z-10 mb-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{achievement.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-primary-600 dark:text-primary-500 font-medium">
                      {achievement.event}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400">
                  {achievement.year}
                </span>
              </div>
              
              {/* Achievement Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-3 py-1 text-xs font-bold rounded-full border ${levelColors[achievement.level]}`}>
                  {achievement.level.toUpperCase()}
                </span>
                <span className="px-2 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full">
                  {categoryIcons[achievement.category]} {achievement.category}
                </span>
              </div>
            </div>
            
            {/* Description */}
            <div className="relative z-10 mb-4">
              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {achievement.description}
              </p>
            </div>
            
            {/* Stats */}
            <div className="relative z-10 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center gap-4">
                {achievement.teamSize && (
                  <div className="flex items-center gap-1">
                    <span>👥</span>
                    <span>{achievement.teamSize} teams</span>
                  </div>
                )}
                {achievement.participants && (
                  <div className="flex items-center gap-1">
                    <span>🏃</span>
                    <span>{achievement.participants} participants</span>
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="font-semibold text-primary-600 dark:text-primary-500">
                  {achievement.achievement}
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-primary-100/30 to-transparent dark:from-primary-800/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        ))}
      </div>
      
      {/* Summary Stats */}
      <motion.div
        className="mt-8 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-6 border border-primary-200 dark:border-primary-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-500 mb-1">
              {achievementsData.filter(a => a.category === 'hackathon').length}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Hackathon Achievements
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-500 mb-1">
              {achievementsData.filter(a => a.level === 'national' || a.level === 'international').length}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              National/International Level
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-500 mb-1">
              {achievementsData.filter(a => a.achievement.includes('Finalist')).length}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Finalist Positions
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}
