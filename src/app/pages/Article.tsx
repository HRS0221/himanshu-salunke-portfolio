import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
// Simple client-side OG image generator
const generateOGImageForArticle = (article: any) => {
  if (!article) return '/images/og/home.jpg'
  return `/images/og/${article.title.toLowerCase().replace(/\s+/g, '-')}.jpg`
}

const Article: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  
  // Load article data based on slug
  const [article, setArticle] = useState<{
    title: string
    excerpt: string
    date: string
    tags: string[]
    content?: string
    author: string
    readTime: number
    coverImage: string
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadArticle = async () => {
      try {
        // In a real app, this would load from MDX files
        // For now, we'll use mock data based on slug
        const mockArticles: Record<string, {
          title: string
          excerpt: string
          date: string
          tags: string[]
          author: string
          readTime: number
          coverImage: string
          content: string
        }> = {
          'react-19-features': {
            title: 'React 19: New Features and Improvements',
            excerpt: 'Explore the exciting new features in React 19, including the new compiler, improved hydration, and enhanced developer experience.',
            date: '2025-01-12',
            tags: ['React', 'JavaScript', 'Frontend', 'Web Development'],
            author: 'Himanshu Salunke',
            readTime: 12,
            coverImage: '/images/articles/react-19.jpg',
            content: `
              <h2>Introduction</h2>
              <p>React 19 brings exciting new features and improvements that enhance both developer experience and application performance. In this comprehensive guide, we'll explore the key changes and how they impact your development workflow.</p>
              
              <h2>New Compiler</h2>
              <p>The React Compiler is one of the most significant additions to React 19. It automatically optimizes your components by:</p>
              <ul>
                <li>Memoizing components and values automatically</li>
                <li>Reducing unnecessary re-renders</li>
                <li>Optimizing hook dependencies</li>
              </ul>
              
              <h2>Improved Hydration</h2>
              <p>React 19 introduces better hydration with enhanced error handling and performance improvements.</p>
              
              <h2>Conclusion</h2>
              <p>React 19 represents a significant step forward in the React ecosystem, providing developers with powerful new tools while maintaining backward compatibility.</p>
            `
          },
          'typescript-best-practices': {
            title: 'TypeScript Best Practices for Modern Development',
            excerpt: 'Learn essential TypeScript best practices that will make your code more maintainable, type-safe, and developer-friendly.',
            date: '2025-01-08',
            tags: ['TypeScript', 'JavaScript', 'Development'],
            author: 'Himanshu Salunke',
            readTime: 10,
            coverImage: '/images/articles/typescript.jpg',
            content: `
              <h2>Introduction</h2>
              <p>TypeScript has become an essential tool for modern web development. Here are the best practices that will help you write better, more maintainable code.</p>
              
              <h2>Type Definitions</h2>
              <p>Always define explicit types for your functions, variables, and interfaces. This improves code readability and catches errors at compile time.</p>
              
              <h2>Interface vs Type</h2>
              <p>Use interfaces for object shapes and types for unions, primitives, and computed types.</p>
              
              <h2>Conclusion</h2>
              <p>Following these TypeScript best practices will make your code more robust and maintainable.</p>
            `
          },
          'web-performance-optimization': {
            title: 'Web Performance Optimization: A Complete Guide',
            excerpt: 'Learn essential web performance optimization techniques to create fast, responsive web applications.',
            date: '2025-01-03',
            tags: ['Performance', 'Web Development', 'Optimization'],
            author: 'Himanshu Salunke',
            readTime: 15,
            coverImage: '/images/articles/performance.jpg',
            content: `
              <h2>Introduction</h2>
              <p>Web performance is crucial for user experience and SEO. This guide covers essential optimization techniques.</p>
              
              <h2>Core Web Vitals</h2>
              <p>Focus on the three main metrics: Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS).</p>
              
              <h2>Optimization Techniques</h2>
              <ul>
                <li>Image optimization and lazy loading</li>
                <li>Code splitting and tree shaking</li>
                <li>Caching strategies</li>
                <li>CDN implementation</li>
              </ul>
              
              <h2>Conclusion</h2>
              <p>Implementing these techniques will significantly improve your website's performance and user experience.</p>
            `
          }
        }

        const articleData = mockArticles[slug || ''] || mockArticles['react-19-features']
        setArticle(articleData)
      } catch (error) {
        console.error('Error loading article:', error)
      } finally {
        setLoading(false)
      }
    }

    loadArticle()
  }, [slug])
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            Article Not Found
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            The article you're looking for doesn't exist.
          </p>
        </div>
      </div>
    )
  }

  const ogImageUrl = generateOGImageForArticle(article)

  return (
    <>
      <Helmet>
        <title>{article.title} - Portfolio</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={`${article.title} - Portfolio`} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${article.title} - Portfolio`} />
        <meta name="twitter:description" content={article.excerpt} />
        <meta name="twitter:image" content={ogImageUrl} />
      </Helmet>

      <div className="min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-8">
              {article.title}
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              {article.excerpt}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-secondary-100 dark:bg-secondary-900 text-secondary-800 dark:text-secondary-200 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400 mb-8">
              <div className="flex items-center space-x-4">
                <span>{article.author}</span>
                <span>•</span>
                <span>{article.readTime} min read</span>
                <span>•</span>
                <span>Published: {new Date(article.date).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Article Cover Image */}
            <div className="mb-8">
              <img 
                src={article.coverImage} 
                alt={article.title}
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Article
