import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Calculate reading time
function calculateReadingTime(content) {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// Get all project files
function getAllProjectFiles() {
  const projectsDir = path.join(__dirname, 'src', 'data', 'projects')
  const files = fs.readdirSync(projectsDir)
  return files.filter(file => file.endsWith('.mdx'))
}

// Parse MDX file and extract frontmatter + content
function parseMDXFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data: frontmatter, content } = matter(fileContent)
    
    return {
      ...frontmatter,
      content,
      readingTime: calculateReadingTime(content),
      slug: frontmatter.id
    }
  } catch (error) {
    console.error(`Error parsing MDX file ${filePath}:`, error)
    return null
  }
}

// API Routes

// Get all projects (metadata only)
app.get('/api/projects', (req, res) => {
  try {
    const projectsDir = path.join(__dirname, 'src', 'data', 'projects')
    const files = getAllProjectFiles()
    
    const projects = files.map(file => {
      const filePath = path.join(projectsDir, file)
      const { data: frontmatter } = matter(fs.readFileSync(filePath, 'utf8'))
      
      return {
        ...frontmatter,
        slug: frontmatter.id,
        readingTime: calculateReadingTime(frontmatter.summary || '') // Estimate from summary
      }
    }).filter(project => project.id) // Filter out invalid projects
    
    // Sort by date
    projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    res.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    res.status(500).json({ error: 'Failed to fetch projects' })
  }
})

// Get project by slug with full content
app.get('/api/projects/:slug', (req, res) => {
  try {
    const { slug } = req.params
    const filePath = path.join(__dirname, 'src', 'data', 'projects', `${slug}.mdx`)
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Project not found' })
    }
    
    const project = parseMDXFile(filePath)
    if (!project) {
      return res.status(500).json({ error: 'Failed to parse project' })
    }
    
    res.json(project)
  } catch (error) {
    console.error(`Error fetching project ${req.params.slug}:`, error)
    res.status(500).json({ error: 'Failed to fetch project' })
  }
})

// Get featured projects
app.get('/api/projects/featured', (req, res) => {
  try {
    const projectsDir = path.join(__dirname, 'src', 'data', 'projects')
    const files = getAllProjectFiles()
    
    const featuredProjects = files.map(file => {
      const filePath = path.join(projectsDir, file)
      const { data: frontmatter } = matter(fs.readFileSync(filePath, 'utf8'))
      
      return {
        ...frontmatter,
        slug: frontmatter.id,
        readingTime: calculateReadingTime(frontmatter.summary || '')
      }
    }).filter(project => project.featured && project.id)
    
    res.json(featuredProjects)
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    res.status(500).json({ error: 'Failed to fetch featured projects' })
  }
})

// Get projects by category
app.get('/api/projects/category/:category', (req, res) => {
  try {
    const { category } = req.params
    const projectsDir = path.join(__dirname, 'src', 'data', 'projects')
    const files = getAllProjectFiles()
    
    const projects = files.map(file => {
      const filePath = path.join(projectsDir, file)
      const { data: frontmatter } = matter(fs.readFileSync(filePath, 'utf8'))
      
      return {
        ...frontmatter,
        slug: frontmatter.id,
        readingTime: calculateReadingTime(frontmatter.summary || '')
      }
    }).filter(project => 
      project.category && 
      project.category.toLowerCase() === category.toLowerCase() &&
      project.id
    )
    
    res.json(projects)
  } catch (error) {
    console.error(`Error fetching projects for category ${req.params.category}:`, error)
    res.status(500).json({ error: 'Failed to fetch projects by category' })
  }
})

// Get project navigation (previous/next)
app.get('/api/projects/:slug/navigation', (req, res) => {
  try {
    const { slug } = req.params
    const projectsDir = path.join(__dirname, 'src', 'data', 'projects')
    const files = getAllProjectFiles()
    
    const projects = files.map(file => {
      const filePath = path.join(projectsDir, file)
      const { data: frontmatter } = matter(fs.readFileSync(filePath, 'utf8'))
      
      return {
        ...frontmatter,
        slug: frontmatter.id
      }
    }).filter(project => project.id)
    
    // Sort by date
    projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    const currentIndex = projects.findIndex(project => project.slug === slug)
    
    if (currentIndex === -1) {
      return res.status(404).json({ error: 'Project not found' })
    }
    
    const navigation = {
      previous: currentIndex > 0 ? projects[currentIndex - 1] : null,
      next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null
    }
    
    res.json(navigation)
  } catch (error) {
    console.error(`Error fetching navigation for ${req.params.slug}:`, error)
    res.status(500).json({ error: 'Failed to fetch project navigation' })
  }
})

// Get related projects
app.get('/api/projects/:slug/related', (req, res) => {
  try {
    const { slug } = req.params
    const limit = parseInt(req.query.limit) || 3
    
    const projectsDir = path.join(__dirname, 'src', 'data', 'projects')
    const files = getAllProjectFiles()
    
    // Get current project
    const currentProjectPath = path.join(projectsDir, `${slug}.mdx`)
    if (!fs.existsSync(currentProjectPath)) {
      return res.status(404).json({ error: 'Project not found' })
    }
    
    const { data: currentProject } = matter(fs.readFileSync(currentProjectPath, 'utf8'))
    
    // Get all projects
    const projects = files.map(file => {
      const filePath = path.join(projectsDir, file)
      const { data: frontmatter } = matter(fs.readFileSync(filePath, 'utf8'))
      
      return {
        ...frontmatter,
        slug: frontmatter.id
      }
    }).filter(project => 
      project.id && 
      project.slug !== slug && 
      project.category === currentProject.category
    )
    
    res.json(projects.slice(0, limit))
  } catch (error) {
    console.error(`Error fetching related projects for ${req.params.slug}:`, error)
    res.status(500).json({ error: 'Failed to fetch related projects' })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'MDX API Server is running' })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 MDX API Server running on http://localhost:${PORT}`)
  console.log(`📁 Serving MDX files from: ${path.join(__dirname, 'src', 'data', 'projects')}`)
})
