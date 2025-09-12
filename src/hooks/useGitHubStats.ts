import { useState, useEffect } from 'react'

interface GitHubStats {
  stars: number
  forks: number
  watchers: number
  lastCommit: string
  languages: { [key: string]: number }
  isLoading: boolean
  error: string | null
}

interface GitHubRepo {
  name: string
  stargazers_count: number
  forks_count: number
  watchers_count: number
  updated_at: string
  language: string
  languages_url: string
}

export const useGitHubStats = (username: string, repoName?: string) => {
  const [stats, setStats] = useState<GitHubStats>({
    stars: 0,
    forks: 0,
    watchers: 0,
    lastCommit: '',
    languages: {},
    isLoading: true,
    error: null
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStats(prev => ({ ...prev, isLoading: true, error: null }))

        if (repoName) {
          // Fetch specific repository stats
          const [repoResponse, languagesResponse] = await Promise.all([
            fetch(`https://api.github.com/repos/${username}/${repoName}`),
            fetch(`https://api.github.com/repos/${username}/${repoName}/languages`)
          ])

          if (!repoResponse.ok || !languagesResponse.ok) {
            throw new Error('Failed to fetch repository data')
          }

          const repoData: GitHubRepo = await repoResponse.json()
          const languagesData = await languagesResponse.json()

          setStats({
            stars: repoData.stargazers_count,
            forks: repoData.forks_count,
            watchers: repoData.watchers_count,
            lastCommit: repoData.updated_at,
            languages: languagesData,
            isLoading: false,
            error: null
          })
        } else {
          // Fetch user's total stats
          const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
          
          if (!response.ok) {
            throw new Error('Failed to fetch user repositories')
          }

          const repos: GitHubRepo[] = await response.json()
          
          const totalStats = repos.reduce((acc, repo) => ({
            stars: acc.stars + repo.stargazers_count,
            forks: acc.forks + repo.forks_count,
            watchers: acc.watchers + repo.watchers_count,
            languages: { ...acc.languages, [repo.language]: (acc.languages[repo.language] || 0) + 1 }
          }), {
            stars: 0,
            forks: 0,
            watchers: 0,
            languages: {} as { [key: string]: number }
          })

          const lastCommit = repos
            .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())[0]
            ?.updated_at || ''

          setStats({
            ...totalStats,
            lastCommit,
            isLoading: false,
            error: null
          })
        }
      } catch (error) {
        setStats(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        }))
      }
    }

    if (username) {
      fetchStats()
    }
  }, [username, repoName])

  return stats
}

export const useTechUsageStats = () => {
  const [techStats, setTechStats] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    // Mock tech usage data - in a real app, this could come from time tracking tools
    const mockTechStats = {
      'React': 35,
      'TypeScript': 30,
      'Python': 20,
      'Node.js': 15,
      'AWS': 10,
      'Docker': 8,
      'TensorFlow': 12,
      'PostgreSQL': 6,
      'MongoDB': 4,
      'Redis': 3
    }

    setTechStats(mockTechStats)
  }, [])

  return techStats
}
