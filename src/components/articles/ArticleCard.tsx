import React from 'react'
import { motion } from 'framer-motion'
import { Tag } from '../ui/Tag'
import { ImageWithShimmer } from '../ui/ImageWithShimmer'
import { formatRelativeTime } from '../../utils/formatDate'

interface Article {
  id: string
  title: string
  excerpt: string
  coverImage: string
  date: string
  tags: string[]
  author: string
  readTime: number
  category: string
  featured: boolean
  link: string
}

interface ArticleCardProps {
  article: Article
  index: number
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, index }) => {

  return (
    <motion.article
      className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Article Image */}
      <div className="relative overflow-hidden">
        <ImageWithShimmer
          src={article.coverImage}
          alt={article.title}
          className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
        {article.featured && (
          <div className="absolute top-4 left-4">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border border-white/20 backdrop-blur-sm">
              ⭐ Featured
            </div>
          </div>
        )}
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


        {/* Read More Link */}
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {}}
          className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 dark:text-white dark:hover:text-blue-300 font-semibold text-sm transition-all duration-200 hover:gap-2 group"
        >
          <span>Read Article</span>
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </a>
      </div>
    </motion.article>
  )
}
