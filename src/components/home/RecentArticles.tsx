import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Tag } from '../ui/Tag'
import { ImageWithShimmer } from '../ui/ImageWithShimmer'
import { useArticleViews } from '../../hooks/useArticleViews'
import { useArticleLikes } from '../../hooks/useArticleLikes'
import { LikeButton } from '../ui/LikeButton'
import { formatRelativeTime } from '../../utils/formatDate'
import { getRecentArticles } from '../../data/articles'

// Get recent articles from shared data
const recentArticles = getRecentArticles()

const ArticleCard: React.FC<{ article: any; index: number }> = ({ article, index }) => {
  const { views, incrementView } = useArticleViews(article.id, 0)
  const { likes, isLiked, isAnimating, toggleLike } = useArticleLikes(article.id, article.likes || 0)

  return (
    <motion.article
      key={article.id}
      className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700 group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
          {/* Article Image */}
          <div className="relative overflow-hidden">
            <ImageWithShimmer
              src={article.coverImage}
              alt={article.title}
              className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Article Content */}
          <div className="p-6">
            {/* Tags */}
            <div className="mb-3">
              <div className="flex flex-wrap gap-2">
                {article.tags.slice(0, 2).map((tag) => (
                  <Tag key={tag} variant="primary" size="sm">
                    {tag}
                  </Tag>
                ))}
                {article.tags.length > 2 && (
                  <Tag variant="default" size="sm">
                    +{article.tags.length - 2}
                  </Tag>
                )}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3 line-clamp-2 font-bold">
              {article.title}
            </h3>

            {/* Excerpt */}
            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-3">
              {article.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              <div className="flex items-center space-x-4">
                <span>{article.author}</span>
                <span>•</span>
                <span>{article.readTime} min read</span>
              </div>
              <span>{formatRelativeTime(article.date)}</span>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm mb-4">
              <div className="flex items-center space-x-6">
                {/* Views */}
                <span className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-900/30 group">
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span className="font-medium">{views.toLocaleString()}</span>
                </span>
                
                {/* Interactive Like Button */}
                <div className="relative">
                  <LikeButton
                    likes={likes}
                    isLiked={isLiked}
                    isAnimating={isAnimating}
                    onToggle={toggleLike}
                  />
                </div>
              </div>
            </div>

            {/* Read More Link */}
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={incrementView}
              className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 dark:text-white dark:hover:text-blue-300 font-semibold text-sm transition-all duration-200 hover:gap-2 group"
            >
              <span>Read Article</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </a>
          </div>
        </motion.article>
  )
}

export const RecentArticles: React.FC = memo(() => {
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {recentArticles.map((article, index) => (
        <ArticleCard key={article.id} article={article} index={index} />
      ))}
    </div>

    {/* View All Articles CTA */}
    <motion.div
      className="text-center mt-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      viewport={{ once: true }}
    >
      <Link
        to="/articles"
        className="inline-flex items-center px-6 py-3 border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white font-medium rounded-lg transition-all duration-200"
      >
        View All Articles
      </Link>
    </motion.div>
    </>
  )
})
