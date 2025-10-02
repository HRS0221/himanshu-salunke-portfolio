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
    // Current focus data
    const currentFocus = {
      primary: "Full-Stack Development",
      secondary: "AI/ML Integration",
      technologies: [
        "React & TypeScript",
        "Node.js & Express",
        "Python & FastAPI",
        "Machine Learning",
        "Computer Vision"
      ],
      projects: [
        "Real-Time Height Measurement System",
        "Portfolio Website Enhancement",
        "AI-Powered Analytics Dashboard"
      ],
      learning: [
        "Advanced React Patterns",
        "Microservices Architecture",
        "Cloud Computing (AWS/Azure)"
      ],
      goals: [
        "Build scalable web applications",
        "Integrate AI/ML into real-world projects",
        "Contribute to open-source projects"
      ],
      lastUpdated: new Date().toISOString()
    }

    res.status(200).json(currentFocus)
  } catch (error) {
    console.error('Current focus API error:', error)
    
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      primary: "Full-Stack Development",
      secondary: "AI/ML Integration",
      technologies: [],
      projects: [],
      learning: [],
      goals: [],
      lastUpdated: new Date().toISOString()
    })
  }
}

