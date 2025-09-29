import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useUnifiedStats } from '../../hooks/useUnifiedStats'
import { articles } from '../../data/articles'

interface NavigationCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  gradient: string
  stats: {
    primary: { value: string; label: string }
    secondary: { value: string; label: string }
  }
  categories: string[]
  buttonText: string
  buttonIcon: React.ReactNode
}

const NavigationCard: React.FC<NavigationCardProps> = ({
  title,
  description,
  icon,
  href,
  gradient,
  stats,
  categories,
  buttonText,
  buttonIcon
}) => {
  return (
    <motion.div
      className="group relative bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg border border-neutral-200 dark:border-neutral-700 hover:shadow-2xl transition-all duration-500 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
          {icon}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {stats.primary.value}
            </div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              {stats.primary.label}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {stats.secondary.value}
            </div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              {stats.secondary.label}
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <span
              key={category}
              className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 text-sm font-medium rounded-full border border-neutral-200 dark:border-neutral-600"
            >
              {category}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <Link to={href}>
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{buttonText}</span>
            {buttonIcon}
          </motion.div>
        </Link>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-100/30 to-transparent dark:from-blue-800/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  )
}

export const NavigationCards: React.FC = () => {
  const unifiedStats = useUnifiedStats()
  
  // Calculate unique categories dynamically
  const uniqueCategories = [...new Set(articles.map(article => article.category))]
  const categoryCount = uniqueCategories.length

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Work Card */}
      <NavigationCard
        title="Explore My Work"
        description="Discover my portfolio of innovative AI/ML projects, data science solutions, and full-stack applications that solve real-world problems."
        icon={
          <svg className="w-8 h-8 text-blue-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        }
        href="/work"
        gradient="bg-gradient-to-br from-blue-500/5 to-purple-500/5"
        stats={{
          primary: { value: unifiedStats.isLoading ? "..." : unifiedStats.projectsCompleted.toString(), label: "Projects" },
          secondary: { value: "4", label: "Categories" }
        }}
        categories={['Computer Vision', 'Deep Learning', 'Data Analysis', 'Data Engineering']}
        buttonText="View Projects"
        buttonIcon={
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        }
      />

      {/* About Card */}
      <NavigationCard
        title="Get to Know Me"
        description="Learn about my journey, achievements, and the passion that drives me to create innovative solutions in the world of technology."
        icon={
          <svg className="w-8 h-8 text-blue-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        }
        href="/about"
        gradient="bg-gradient-to-br from-green-500/5 to-teal-500/5"
        stats={{
          primary: { value: "2+", label: "Years Learning" },
          secondary: { value: "5+", label: "Achievements" }
        }}
        categories={['Education', 'Timeline', 'Achievements', 'Goals']}
        buttonText="My Story"
        buttonIcon={
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        }
      />

      {/* Developer Card */}
      <NavigationCard
        title="Technical Expertise"
        description="Dive deep into my technical skills, GitHub activity, and the technologies I use to build cutting-edge solutions."
        icon={
          <svg className="w-8 h-8 text-blue-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        }
        href="/developer"
        gradient="bg-gradient-to-br from-orange-500/5 to-red-500/5"
        stats={{
          primary: { value: unifiedStats.isLoading ? "..." : unifiedStats.technologiesMastered.toString() + "+", label: "Technologies" },
          secondary: { value: unifiedStats.isLoading ? "..." : unifiedStats.githubStars.toString() + "+", label: "GitHub Stars" }
        }}
        categories={['Python', 'React', 'TypeScript', 'Machine Learning']}
        buttonText="View Skills"
        buttonIcon={
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        }
      />

      {/* Articles Card */}
      <NavigationCard
        title="Read My Articles"
        description="Explore my thoughts on technology, machine learning insights, and practical tutorials that help others grow in their tech journey."
        icon={
          <svg className="w-8 h-8 text-blue-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        }
        href="/articles"
        gradient="bg-gradient-to-br from-purple-500/5 to-pink-500/5"
        stats={{
          primary: { value: unifiedStats.isLoading ? "..." : unifiedStats.totalArticles.toString(), label: "Articles" },
          secondary: { value: unifiedStats.isLoading ? "..." : categoryCount.toString(), label: "Categories" }
        }}
        categories={['Machine Learning', 'Deep Learning', 'Reinforcement Learning', 'Tutorials']}
        buttonText="Read Articles"
        buttonIcon={
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        }
      />
    </div>
  )
}
