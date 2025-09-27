import { VercelRequest, VercelResponse } from '@vercel/node'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatRequest {
  message: string
  conversationHistory: ChatMessage[]
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent'

// Function to get dynamic portfolio data
async function getPortfolioData() {
  try {
    // Get projects data
    const projectsDir = join(process.cwd(), 'src/data/projects')
    const projectFiles = readdirSync(projectsDir).filter(file => file.endsWith('.mdx'))
    const projects = projectFiles.map(file => {
      const filePath = join(projectsDir, file)
      const fileContent = readFileSync(filePath, 'utf8')
      const { data: frontmatter } = matter(fileContent)
      return {
        title: frontmatter.title,
        summary: frontmatter.summary,
        category: frontmatter.category,
        techStack: frontmatter.techStack || [],
        status: frontmatter.status,
        metrics: frontmatter.metrics || [],
        githubUrl: frontmatter.githubUrl,
        liveUrl: frontmatter.liveUrl,
        featured: frontmatter.featured
      }
    })

    // Get articles data
    const articlesDir = join(process.cwd(), 'src/data/articles')
    const articleFiles = readdirSync(articlesDir).filter(file => file.endsWith('.mdx'))
    const articles = articleFiles.map(file => {
      const filePath = join(articlesDir, file)
      const fileContent = readFileSync(filePath, 'utf8')
      const { data: frontmatter } = matter(fileContent)
      return {
        title: frontmatter.title,
        summary: frontmatter.summary,
        category: frontmatter.category,
        readTime: frontmatter.readTime,
        featured: frontmatter.featured
      }
    })

    // Skills data from TechStack component
    const skillsData = [
      // AI/ML & Data Science
      { name: 'Python', level: 95, category: 'ai-ml' },
      { name: 'TensorFlow', level: 85, category: 'ai-ml' },
      { name: 'PyTorch', level: 80, category: 'ai-ml' },
      { name: 'Scikit-learn', level: 90, category: 'ai-ml' },
      { name: 'Pandas', level: 95, category: 'ai-ml' },
      { name: 'NumPy', level: 90, category: 'ai-ml' },
      { name: 'OpenCV', level: 85, category: 'ai-ml' },
      { name: 'Matplotlib', level: 85, category: 'ai-ml' },
      { name: 'Seaborn', level: 80, category: 'ai-ml' },
      { name: 'Jupyter Notebooks', level: 90, category: 'ai-ml' },
      { name: 'LangChain', level: 75, category: 'ai-ml' },
      { name: 'OpenAI API', level: 80, category: 'ai-ml' },
      
      // Programming Languages
      { name: 'JavaScript', level: 90, category: 'backend' },
      { name: 'TypeScript', level: 85, category: 'backend' },
      { name: 'Java', level: 75, category: 'backend' },
      { name: 'SQL', level: 85, category: 'backend' },
      
      // Web Development
      { name: 'React', level: 90, category: 'frontend' },
      { name: 'Next.js', level: 85, category: 'frontend' },
      { name: 'Node.js', level: 80, category: 'backend' },
      { name: 'FastAPI', level: 80, category: 'backend' },
      { name: 'Flask', level: 75, category: 'backend' },
      { name: 'SASS/SCSS', level: 85, category: 'frontend' },
      
      // Cloud & Infrastructure
      { name: 'AWS Services', level: 80, category: 'tools' },
      { name: 'Google Cloud AI', level: 75, category: 'tools' },
      { name: 'Docker', level: 80, category: 'tools' },
      { name: 'Kubernetes', level: 70, category: 'tools' },
      { name: 'Vercel', level: 85, category: 'tools' },
      
      // Data Visualization
      { name: 'Plotly', level: 85, category: 'tools' },
      { name: 'Tableau', level: 75, category: 'tools' },
      { name: 'PowerBI', level: 70, category: 'tools' },
      
      // Databases
      { name: 'PostgreSQL', level: 85, category: 'databases' },
      { name: 'MongoDB', level: 80, category: 'databases' },
      { name: 'Redis', level: 75, category: 'databases' },
      
      // Tools & Others
      { name: 'Git', level: 90, category: 'tools' },
      { name: 'GitHub', level: 85, category: 'tools' },
      { name: 'Apache Airflow', level: 75, category: 'tools' },
      { name: 'AWS Glue', level: 70, category: 'tools' },
      { name: 'Amazon Athena', level: 75, category: 'tools' }
    ]

    return { projects, articles, skills: skillsData }
  } catch (error) {
    console.error('Error loading portfolio data:', error)
    return { projects: [], articles: [], skills: [] }
  }
}

// Generate dynamic portfolio context
async function generatePortfolioContext() {
  const { projects, articles, skills } = await getPortfolioData()
  
  const featuredProjects = projects.filter(p => p.featured)
  const allTechStack = [...new Set(projects.flatMap(p => p.techStack || []))]
  
  return `
You are an AI assistant for Himanshu Salunke's portfolio website. You help visitors learn about his work, skills, and experience.

ABOUT HIMANSHU:
- Full-stack developer and data scientist specializing in AI/ML and web development
- Passionate about creating innovative solutions using modern technologies
- Experienced in building end-to-end applications from data analysis to production deployment

CURRENT PROJECTS (${projects.length} total):
${projects.map(p => `- "${p.title}" (${p.category}): ${p.summary} - Tech: ${(p.techStack || []).join(', ')} - Status: ${p.status}${p.githubUrl ? ` - GitHub: ${p.githubUrl}` : ''}`).join('\n')}

FEATURED PROJECTS:
${featuredProjects.map(p => `- "${p.title}": ${p.summary} - Technologies: ${(p.techStack || []).join(', ')}`).join('\n')}

TECHNICAL SKILLS (${skills.length} total):
${skills.map(skill => `- ${skill.name} (${skill.level}% proficiency) - ${skill.category}`).join('\n')}

TECHNOLOGIES USED IN PROJECTS:
${allTechStack.join(', ')}

ARTICLES & WRITING (${articles.length} total):
${articles.map(a => `- "${a.title}" (${a.category}): ${a.summary} - ${a.readTime} min read`).join('\n')}

PERSONALITY:
- Professional but friendly and approachable
- Enthusiastic about technology and problem-solving
- Helpful in explaining technical concepts in simple terms
- Encourages visitors to explore the portfolio and contact Himanshu

RESPONSE GUIDELINES:
- Keep responses concise but informative (2-3 sentences max)
- Always be helpful and encouraging
- Use specific project names and details when relevant
- For technical questions, provide clear explanations with specific technologies
- If asked about specific projects, mention the exact project name and key details
- Always maintain a professional yet friendly tone
- Reference actual project metrics and achievements when relevant
`
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle chatbot requests
  if (req.method === 'POST' && (req.url?.includes('chatbot') || req.query.chatbot === 'true')) {
    try {
      // Check if API key is configured
      if (!GEMINI_API_KEY) {
        console.error('GEMINI_API_KEY environment variable is not set')
        return res.status(500).json({ 
          error: 'AI service configuration error',
          fallback: "I'm having trouble connecting to the AI service right now. Please try again later or explore the portfolio directly!"
        })
      }

      const { message, conversationHistory }: ChatRequest = req.body

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' })
      }

      // Generate dynamic portfolio context
      const portfolioContext = await generatePortfolioContext()

      // Prepare the conversation context
      const systemMessage = {
        role: 'system',
        content: portfolioContext
      }

      // Build the conversation with context
      const conversation = [
        systemMessage,
        ...conversationHistory.slice(-10), // Keep last 10 messages for context
        {
          role: 'user',
          content: message
        }
      ]

      // Prepare the request for Gemini API
      const geminiRequest = {
        contents: [{
          parts: [{
            text: conversation.map(msg => 
              msg.role === 'system' 
                ? `System: ${msg.content}` 
                : `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
            ).join('\n\n')
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(geminiRequest)
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Gemini API error:', errorData)
        return res.status(500).json({ 
          error: 'AI service temporarily unavailable',
          fallback: "I'm having trouble connecting to the AI service right now. Please try again in a moment or feel free to explore the portfolio directly!"
        })
      }

      const data = await response.json()
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        console.error('Unexpected Gemini response:', data)
        return res.status(500).json({ 
          error: 'AI service returned unexpected response',
          fallback: "I'm having trouble processing your request right now. Please try again or explore the portfolio sections for more information!"
        })
      }

      const aiResponse = data.candidates[0].content.parts[0].text

      return res.status(200).json({ 
        response: aiResponse,
        timestamp: new Date().toISOString()
      })

    } catch (error) {
      console.error('Chatbot API error:', error)
      return res.status(500).json({ 
        error: 'Internal server error',
        fallback: "I'm experiencing some technical difficulties. Please try again later or explore the portfolio directly!"
      })
    }
  }

  // Original projects API functionality
  try {
    const { featured, slug } = req.query
    
    const projectsDir = join(process.cwd(), 'src/data/projects')
    const files = readdirSync(projectsDir).filter(file => file.endsWith('.mdx'))
    
    const projects = files.map(file => {
      const filePath = join(projectsDir, file)
      const fileContent = readFileSync(filePath, 'utf8')
      const { data: frontmatter, content } = matter(fileContent)
      
      return {
        ...frontmatter,
        slug: frontmatter.id,
        content,
        readingTime: Math.ceil(content.split(' ').length / 200)
      }
    })
    
    // Handle specific project by slug
    if (slug && typeof slug === 'string') {
      const project = projects.find(p => p.slug === slug)
      if (!project) {
        return res.status(404).json({ error: 'Project not found' })
      }
      res.setHeader('Cache-Control', 'public, max-age=3600')
      return res.status(200).json(project)
    }
    
    // Handle featured projects filter
    if (featured === 'true') {
      const featuredProjects = projects
        .filter((project: any) => project.featured === true)
        .sort((a: any, b: any) => {
          const dateA = new Date(a.date || '2024-01-01')
          const dateB = new Date(b.date || '2024-01-01')
          return dateB.getTime() - dateA.getTime()
        })
      
      res.setHeader('Cache-Control', 'public, max-age=3600')
      return res.status(200).json(featuredProjects)
    }
    
    // Return all projects sorted by date
    const sortedProjects = projects.sort((a: any, b: any) => {
      const dateA = new Date(a.date || '2024-01-01')
      const dateB = new Date(b.date || '2024-01-01')
      return dateB.getTime() - dateA.getTime()
    })
    
    res.setHeader('Cache-Control', 'public, max-age=3600')
    res.status(200).json(sortedProjects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    res.status(500).json({ error: 'Failed to fetch projects' })
  }
}
