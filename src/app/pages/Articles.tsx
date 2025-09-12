import React, { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/Button'
import { SearchAndFilter } from '../../components/ui/SearchAndFilter'
import { ArticleCard } from '../../components/articles/ArticleCard'
import { useArticleStatistics } from '../../hooks/useArticleStatistics'
import { useUnifiedStats } from '../../hooks/useUnifiedStats'
import { articles } from '../../data/articles'
import ArticleEngagementMetrics from '../../components/articles/ArticleEngagementMetrics'
import ArticleCategories from '../../components/articles/ArticleCategories'
import WritingJourney from '../../components/articles/WritingJourney'


const categories = ['All', 'Machine Learning', 'Deep Learning', 'Reinforcement Learning']
const statuses = ['All', 'Featured', 'Regular']

const sortOptions = [
  { value: 'date', label: 'Latest', icon: '🕒' },
  { value: 'title', label: 'Title', icon: '🔤' },
  { value: 'readTime', label: 'Read Time', icon: '⏱️' },
  { value: 'views', label: 'Most Viewed', icon: '👁️' },
  { value: 'likes', label: 'Most Liked', icon: '❤️' }
]

const Articles: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'readTime' | 'views' | 'likes'>('date')
  
  // Get dynamic statistics from localStorage
  const { totalLikes, totalViews, getArticleLikes, getArticleViews } = useArticleStatistics(articles)
  const unifiedStats = useUnifiedStats()

  const filteredArticles = useMemo(() => {
    const filtered = articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory
      const matchesStatus = selectedStatus === 'All' || 
                           (selectedStatus === 'Featured' && article.featured) ||
                           (selectedStatus === 'Regular' && !article.featured)
      
      return matchesSearch && matchesCategory && matchesStatus
    })

    // Sort articles using dynamic data from localStorage
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'readTime':
          return a.readTime - b.readTime
        case 'views':
          return getArticleViews(b.id) - getArticleViews(a.id)
        case 'likes':
          return getArticleLikes(b.id) - getArticleLikes(a.id)
        case 'date':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, selectedStatus, sortBy, getArticleLikes, getArticleViews])

  return (
    <>
      <Helmet>
        <title>Articles - Portfolio</title>
        <meta name="description" content="Read my latest articles on web development, AI/ML, performance optimization, and modern software engineering practices." />
        <meta property="og:title" content="Articles - Portfolio" />
        <meta property="og:description" content="Read my latest articles on web development, AI/ML, performance optimization, and modern software engineering practices." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                Knowledge Hub
              </span>
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Deep insights, practical tutorials, and thought leadership on AI/ML, web development, 
              and cutting-edge technologies. Learn from real-world experience and industry best practices.
            </p>
          </motion.div>

          {/* Article Engagement Metrics */}
          <motion.div className="mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <ArticleEngagementMetrics />
          </motion.div>

          {/* Article Categories */}
          <motion.div className="mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
            <ArticleCategories />
          </motion.div>

          {/* Modern Search and Filter */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SearchAndFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              statuses={statuses}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              sortBy={sortBy}
              onSortChange={(value) => setSortBy(value as 'date' | 'title' | 'readTime' | 'views' | 'likes')}
              sortOptions={sortOptions}
            />
          </motion.div>

          {/* Articles Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {filteredArticles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </motion.div>

          {/* No Results */}
          {filteredArticles.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                  No articles found
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('All')
                    setSelectedStatus('All')
                    setSortBy('date')
                  }}
                  variant="primary"
                  size="sm"
                >
                  Clear all filters
                </Button>
              </div>
            </motion.div>
          )}


          {/* Writing Journey */}
          <motion.div className="mt-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}>
            <WritingJourney />
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Articles
