import { useState, useEffect } from 'react'

interface ArticleView {
  articleId: string
  views: number
  lastViewed: number
}

const STORAGE_KEY = 'article-views'

export const useArticleViews = (articleId: string, initialViews: number) => {
  const [views, setViews] = useState(initialViews)

  // Load views from localStorage on mount
  useEffect(() => {
    const storedViews = localStorage.getItem(STORAGE_KEY)
    if (storedViews) {
      try {
        const parsedViews: ArticleView[] = JSON.parse(storedViews)
        const articleView = parsedViews.find(view => view.articleId === articleId)
        if (articleView) {
          setViews(articleView.views)
        }
      } catch (error) {
        console.error('Error parsing stored views:', error)
      }
    }
  }, [articleId])

  // Save views to localStorage whenever they change
  useEffect(() => {
    const storedViews = localStorage.getItem(STORAGE_KEY)
    let parsedViews: ArticleView[] = []
    
    if (storedViews) {
      try {
        parsedViews = JSON.parse(storedViews)
      } catch (error) {
        console.error('Error parsing stored views:', error)
        parsedViews = []
      }
    }

    const existingIndex = parsedViews.findIndex(view => view.articleId === articleId)
    const articleView: ArticleView = { 
      articleId, 
      views, 
      lastViewed: Date.now() 
    }

    if (existingIndex >= 0) {
      parsedViews[existingIndex] = articleView
    } else {
      parsedViews.push(articleView)
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedViews))
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('articleDataChanged'))
  }, [articleId, views])

  const incrementView = () => {
    setViews(prev => prev + 1)
  }

  return {
    views,
    incrementView
  }
}
