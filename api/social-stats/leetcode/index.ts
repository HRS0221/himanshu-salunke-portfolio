import { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { username } = req.query

    if (!username || typeof username !== 'string') {
      return res.status(400).json({ error: 'Username is required' })
    }

    // LeetCode GraphQL query
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

    if (!response.ok) {
      throw new Error(`LeetCode API error: ${response.status}`)
    }

    const data = await response.json()
    
    // Check for GraphQL errors
    if (data.errors) {
      throw new Error(`GraphQL errors: ${data.errors.map((e: any) => e.message).join(', ')}`)
    }
    
    const user = data.data?.matchedUser
    const contestRanking = data.data?.userContestRanking

    if (!user) {
      throw new Error('User not found in LeetCode API')
    }

    const submissions = user.submitStats?.acSubmissionNum || []
    const totalSolved = submissions.find((s: any) => s.difficulty === 'All')?.count || 0
    const easySolved = submissions.find((s: any) => s.difficulty === 'Easy')?.count || 0
    const mediumSolved = submissions.find((s: any) => s.difficulty === 'Medium')?.count || 0
    const hardSolved = submissions.find((s: any) => s.difficulty === 'Hard')?.count || 0

    const result = {
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      ranking: user.profile?.ranking || 0,
      contestRating: contestRanking?.rating || 0,
      isLoading: false,
      error: null
    }

    res.status(200).json(result)
  } catch (error) {
    console.error('LeetCode API proxy error:', error)
    
    // Try alternative API as fallback
    try {
      const { username } = req.query
      const altResponse = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`)
      
      if (altResponse.ok) {
        const altData = await altResponse.json()
        
        const result = {
          totalSolved: altData.totalSolved || 0,
          easySolved: altData.easySolved || 0,
          mediumSolved: altData.mediumSolved || 0,
          hardSolved: altData.hardSolved || 0,
          ranking: altData.ranking || 0,
          contestRating: altData.contestRating || 0,
          isLoading: false,
          error: null
        }
        
        return res.status(200).json(result)
      }
    } catch (altError) {
      console.error('Alternative LeetCode API also failed:', altError)
    }
    
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      totalSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      ranking: 0,
      contestRating: 0,
      isLoading: false
    })
  }
}
