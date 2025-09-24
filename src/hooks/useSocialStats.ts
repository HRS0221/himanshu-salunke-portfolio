import { useState, useEffect } from 'react'

interface GitHubStats {
  stars: number
  forks: number
  watchers: number
  repositories: number
  followers: number
  following: number
  isLoading: boolean
  error: string | null
}

interface LeetCodeStats {
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  ranking: number
  contestRating: number
  isLoading: boolean
  error: string | null
}

interface CodeChefStats {
  rating: number
  stars: number
  problemsSolved: number
  globalRank: number
  countryRank: number
  isLoading: boolean
  error: string | null
}

interface LinkedInStats {
  connections: number
  articles: number
  followers: number
  isLoading: boolean
  error: string | null
}

interface SocialStats {
  github: GitHubStats
  leetcode: LeetCodeStats
  codechef: CodeChefStats
  linkedin: LinkedInStats
}

// GitHub API - No authentication needed for public data
const fetchGitHubStats = async (username: string): Promise<GitHubStats> => {
  try {
    const [userResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
    ])

    if (!userResponse.ok || !reposResponse.ok) {
      throw new Error('Failed to fetch GitHub data')
    }

    const userData = await userResponse.json()
    const reposData = await reposResponse.json()

    const totalStars = reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0)
    const totalForks = reposData.reduce((acc: number, repo: any) => acc + repo.forks_count, 0)
    const totalWatchers = reposData.reduce((acc: number, repo: any) => acc + repo.watchers_count, 0)

    return {
      stars: totalStars,
      forks: totalForks,
      watchers: totalWatchers,
      repositories: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      isLoading: false,
      error: null
    }
  } catch (error) {
    return {
      stars: 0,
      forks: 0,
      watchers: 0,
      repositories: 0,
      followers: 0,
      following: 0,
      isLoading: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// LeetCode API - Using multiple approaches
const fetchLeetCodeStats = async (username: string): Promise<LeetCodeStats> => {
  try {
    console.log('🔍 Fetching LeetCode stats for:', username)
    
    // Try approach 1: Direct GraphQL with proper headers
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
          }
          profile {
            ranking
          }
        }
        userContestRanking(username: $username) {
          rating
        }
      }
    `

    const response = await fetch('https://leetcode.com/graphql/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://leetcode.com/',
        'Origin': 'https://leetcode.com'
      },
      body: JSON.stringify({
        query,
        variables: { username }
      })
    })

    console.log('LeetCode API response status:', response.status)

    if (!response.ok) {
      console.error('LeetCode API error:', response.status, response.statusText)
      throw new Error(`Failed to fetch LeetCode data: ${response.status}`)
    }

    const data = await response.json()
    console.log('LeetCode API response data:', data)
    
    // Check for GraphQL errors
    if (data.errors) {
      console.error('LeetCode GraphQL errors:', data.errors)
      throw new Error(`GraphQL errors: ${data.errors.map((e: any) => e.message).join(', ')}`)
    }
    
    const user = data.data?.matchedUser
    const contestRanking = data.data?.userContestRanking

    if (!user) {
      console.log('LeetCode user not found in GraphQL response')
      throw new Error('User not found in LeetCode API')
    }

    const submissions = user.submitStats?.acSubmissionNum || []
    const totalSolved = submissions.find((s: any) => s.difficulty === 'All')?.count || 0
    const easySolved = submissions.find((s: any) => s.difficulty === 'Easy')?.count || 0
    const mediumSolved = submissions.find((s: any) => s.difficulty === 'Medium')?.count || 0
    const hardSolved = submissions.find((s: any) => s.difficulty === 'Hard')?.count || 0

    console.log('LeetCode stats parsed:', { totalSolved, easySolved, mediumSolved, hardSolved })

    return {
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      ranking: user.profile?.ranking || 0,
      contestRating: contestRanking?.rating || 0,
      isLoading: false,
      error: null
    }
  } catch (error) {
    console.error('LeetCode fetch error:', error)
    
    // Try approach 2: Alternative API endpoint
    try {
      console.log('🔄 Trying alternative LeetCode API...')
      
      const altResponse = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`)
      
      if (altResponse.ok) {
        const altData = await altResponse.json()
        console.log('Alternative API data:', altData)
        
        return {
          totalSolved: altData.totalSolved || 0,
          easySolved: altData.easySolved || 0,
          mediumSolved: altData.mediumSolved || 0,
          hardSolved: altData.hardSolved || 0,
          ranking: altData.ranking || 0,
          contestRating: altData.contestRating || 0,
          isLoading: false,
          error: null
        }
      }
    } catch (altError) {
      console.error('Alternative API also failed:', altError)
    }
    
    // If all approaches fail, return error state
    return {
      totalSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      ranking: 0,
      contestRating: 0,
      isLoading: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// CodeChef - Using web scraping approach (since no public API)
const fetchCodeChefStats = async (username: string): Promise<CodeChefStats> => {
  try {
    // Note: This would require a backend service due to CORS restrictions
    // For now, returning mock data - in production, you'd need a backend API
    return {
      rating: 0,
      stars: 0,
      problemsSolved: 0,
      globalRank: 0,
      countryRank: 0,
      isLoading: false,
      error: 'CodeChef API requires backend service'
    }
  } catch (error) {
    return {
      rating: 0,
      stars: 0,
      problemsSolved: 0,
      globalRank: 0,
      countryRank: 0,
      isLoading: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// LinkedIn - Limited API access, using your actual data
const fetchLinkedInStats = async (username: string): Promise<LinkedInStats> => {
  try {
    // LinkedIn API requires special permissions and is very restrictive
    // Using your actual LinkedIn data
    return {
      connections: 500, // Estimated connections
      articles: 40, // Based on your content
      followers: 22000, // Your actual 22k+ followers
      isLoading: false,
      error: null
    }
  } catch (error) {
    return {
      connections: 0,
      articles: 0,
      followers: 0,
      isLoading: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export const useSocialStats = () => {
  const [stats, setStats] = useState<SocialStats>({
    github: {
      stars: 0,
      forks: 0,
      watchers: 0,
      repositories: 0,
      followers: 0,
      following: 0,
      isLoading: true,
      error: null
    },
    leetcode: {
      totalSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      ranking: 0,
      contestRating: 0,
      isLoading: true,
      error: null
    },
    codechef: {
      rating: 0,
      stars: 0,
      problemsSolved: 0,
      globalRank: 0,
      countryRank: 0,
      isLoading: true,
      error: null
    },
    linkedin: {
      connections: 0,
      articles: 0,
      followers: 0,
      isLoading: true,
      error: null
    }
  })

  useEffect(() => {
    const fetchAllStats = async () => {
      // Fetch GitHub stats (works with public API)
      const githubStats = await fetchGitHubStats('HRS0221')
      
      // Fetch LeetCode stats (works with GraphQL API)
      const leetcodeStats = await fetchLeetCodeStats('himanshusalunke')
      
      // Fetch CodeChef stats (requires backend)
      const codechefStats = await fetchCodeChefStats('hr0221')
      
      // Fetch LinkedIn stats (limited API access)
      const linkedinStats = await fetchLinkedInStats('hr0221')

      setStats({
        github: githubStats,
        leetcode: leetcodeStats,
        codechef: codechefStats,
        linkedin: linkedinStats
      })
    }

    fetchAllStats()
  }, [])

  return stats
}

// Individual hooks for specific platforms
export const useGitHubStats = (username: string) => {
  const [stats, setStats] = useState<GitHubStats>({
    stars: 0,
    forks: 0,
    watchers: 0,
    repositories: 0,
    followers: 0,
    following: 0,
    isLoading: true,
    error: null
  })

  useEffect(() => {
    const fetchStats = async () => {
      const result = await fetchGitHubStats(username)
      setStats(result)
    }

    fetchStats()
  }, [username])

  return stats
}

export const useLeetCodeStats = (username: string) => {
  const [stats, setStats] = useState<LeetCodeStats>({
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    ranking: 0,
    contestRating: 0,
    isLoading: true,
    error: null
  })

  useEffect(() => {
    const fetchStats = async () => {
      const result = await fetchLeetCodeStats(username)
      setStats(result)
    }

    fetchStats()
  }, [username])

  return stats
}
