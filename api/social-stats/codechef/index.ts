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

    // Try CodeChef's public API endpoint
    const response = await fetch(`https://competitive-coding-api.herokuapp.com/api/codechef/${username}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })

    if (!response.ok) {
      throw new Error(`CodeChef API error: ${response.status}`)
    }

    const data = await response.json()

    if (data.status === 'Failed' || data.status === 'ERROR') {
      throw new Error(data.details || 'User not found or API error')
    }

    const result = {
      rating: data.rating || 0,
      stars: data.stars || 0,
      problemsSolved: data.fully_solved || 0,
      globalRank: data.global_rank || 0,
      countryRank: data.country_rank || 0,
      isLoading: false,
      error: null
    }

    res.status(200).json(result)
  } catch (error) {
    console.error('CodeChef API proxy error:', error)
    
    // Try alternative approach
    try {
      const { username } = req.query
      const altResponse = await fetch(`https://codechef-api.vercel.app/${username}`)
      
      if (altResponse.ok) {
        const altData = await altResponse.json()
        
        const result = {
          rating: altData.rating || 0,
          stars: altData.stars || 0,
          problemsSolved: altData.problemsSolved || 0,
          globalRank: altData.globalRank || 0,
          countryRank: altData.countryRank || 0,
          isLoading: false,
          error: null
        }
        
        return res.status(200).json(result)
      }
    } catch (altError) {
      console.error('Alternative CodeChef API also failed:', altError)
    }
    
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      rating: 0,
      stars: 0,
      problemsSolved: 0,
      globalRank: 0,
      countryRank: 0,
      isLoading: false
    })
  }
}
