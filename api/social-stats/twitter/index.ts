import { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
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

    // Remove @ symbol if present
    const cleanUsername = username.replace('@', '')
    
    // Try Twitter API v2 (requires Bearer Token)
    const bearerToken = process.env.TWITTER_BEARER_TOKEN
    
    if (!bearerToken) {
      throw new Error('Twitter API token not configured')
    }
    
    const response = await fetch(`https://api.twitter.com/2/users/by/username/${cleanUsername}?user.fields=public_metrics,verified`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Twitter API error: ${response.status}`)
    }

    const data = await response.json()

    if (!data.data) {
      throw new Error('Twitter user not found')
    }

    const metrics = data.data.public_metrics || {}

    const result = {
      followers: metrics.followers_count || 0,
      following: metrics.following_count || 0,
      tweets: metrics.tweet_count || 0,
      verified: data.data.verified || false,
      isLoading: false,
      error: null
    }

    res.status(200).json(result)
  } catch (error) {
    console.error('Twitter API proxy error:', error)
    
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      followers: 0,
      following: 0,
      tweets: 0,
      verified: false,
      isLoading: false
    })
  }
}
