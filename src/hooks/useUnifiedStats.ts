import { useState, useEffect } from 'react'
import { useProfileStats } from './useProfileStats'
import { useSocialStats } from './useSocialStats'
import { useArticleStatistics } from './useArticleStatistics'
import { articles } from '../data/articles'

interface UnifiedStats {
  // Profile Stats
  projectsCompleted: number
  yearsExperience: number
  technologiesMastered: number
  
  // Social Stats
  githubStars: number
  githubRepositories: number
  githubFollowers: number
  linkedinFollowers: number
  leetcodeSolved: number
  
  // Article Stats
  totalArticles: number
  totalViews: number
  totalLikes: number
  
  // Loading States
  isLoading: boolean
  error: string | null
}

export const useUnifiedStats = (): UnifiedStats => {
  const [stats, setStats] = useState<UnifiedStats>({
    projectsCompleted: 0,
    yearsExperience: 0,
    technologiesMastered: 40, // Static count from your tech stack
    githubStars: 0,
    githubRepositories: 0,
    githubFollowers: 0,
    linkedinFollowers: 0,
    leetcodeSolved: 0,
    totalArticles: 0,
    totalViews: 0,
    totalLikes: 0,
    isLoading: true,
    error: null
  })

  const profileStats = useProfileStats()
  const socialStats = useSocialStats()
  const { totalViews, totalLikes } = useArticleStatistics(articles)

  useEffect(() => {
    setStats({
      // Profile Stats
      projectsCompleted: profileStats.projectsCompleted,
      yearsExperience: profileStats.yearsExperience,
      technologiesMastered: 40, // From your tech stack count
      
      // Social Stats
      githubStars: socialStats.github.stars || 0,
      githubRepositories: socialStats.github.repositories || 0,
      githubFollowers: socialStats.github.followers || 0,
      linkedinFollowers: socialStats.linkedin.followers || 0,
      leetcodeSolved: socialStats.leetcode.totalSolved || 0,
      
      // Article Stats
      totalArticles: articles.length,
      totalViews,
      totalLikes,
      
      // Loading States
      isLoading: profileStats.isLoading || socialStats.github.isLoading,
      error: socialStats.github.error
    })
  }, [profileStats, socialStats, totalViews, totalLikes])

  return stats
}
