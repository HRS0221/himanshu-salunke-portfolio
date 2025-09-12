import { useState, useEffect } from 'react'

interface ArticleLike {
  articleId: string
  likes: number
  isLiked: boolean
}

const STORAGE_KEY = 'article-likes'

export const useArticleLikes = (articleId: string, initialLikes: number) => {
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Load likes from localStorage on mount
  useEffect(() => {
    const storedLikes = localStorage.getItem(STORAGE_KEY)
    if (storedLikes) {
      try {
        const parsedLikes: ArticleLike[] = JSON.parse(storedLikes)
        const articleLike = parsedLikes.find(like => like.articleId === articleId)
        if (articleLike) {
          setLikes(articleLike.likes)
          setIsLiked(articleLike.isLiked)
        }
      } catch (error) {
        console.error('Error parsing stored likes:', error)
      }
    }
  }, [articleId])

  // Save likes to localStorage whenever they change
  useEffect(() => {
    const storedLikes = localStorage.getItem(STORAGE_KEY)
    let parsedLikes: ArticleLike[] = []
    
    if (storedLikes) {
      try {
        parsedLikes = JSON.parse(storedLikes)
      } catch (error) {
        console.error('Error parsing stored likes:', error)
        parsedLikes = []
      }
    }

    const existingIndex = parsedLikes.findIndex(like => like.articleId === articleId)
    const articleLike: ArticleLike = { articleId, likes, isLiked }

    if (existingIndex >= 0) {
      parsedLikes[existingIndex] = articleLike
    } else {
      parsedLikes.push(articleLike)
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedLikes))
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('articleDataChanged'))
  }, [articleId, likes, isLiked])

  const toggleLike = () => {
    if (isAnimating) return // Prevent rapid clicking

    setIsAnimating(true)
    
    if (isLiked) {
      setLikes(prev => Math.max(0, prev - 1))
      setIsLiked(false)
    } else {
      setLikes(prev => prev + 1)
      setIsLiked(true)
    }

    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 600)
  }

  return {
    likes,
    isLiked,
    isAnimating,
    toggleLike
  }
}
