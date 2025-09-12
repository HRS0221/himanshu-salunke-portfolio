import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

export interface ProjectFrontmatter {
  title: string
  slug: string
  date: string
  featured: boolean
  category: string
  status: string
  coverImage: string
  summary: string
  bullets: string[]
  techStack: string[]
  metrics: Array<{
    label: string
    value: string
  }>
  githubUrl?: string
  liveUrl?: string
  // Additional fields for enhanced project pages
  description?: string
  tagline?: string
  images?: string[]
  repoLink?: string
  outputLink?: string
  publishedAt?: string
  completionDate?: string
  order?: number
  tag?: string
}

export interface ArticleFrontmatter {
  title: string
  slug: string
  date: string
  coverImage: string
  tags: string[]
  author: string
  readTime: number
  excerpt: string
}

export interface Project extends ProjectFrontmatter {
  content: string
  readingTime: number
}

export interface Article extends ArticleFrontmatter {
  content: string
}

// Calculate reading time based on content
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// Get all project files
export function getAllProjects(): Project[] {
  const projectsDir = join(process.cwd(), 'src/data/projects')
  const files = readdirSync(projectsDir).filter(file => file.endsWith('.mdx'))
  
  const projects = files.map(file => {
    const filePath = join(projectsDir, file)
    const fileContent = readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)
    
    return {
      ...data as ProjectFrontmatter,
      content,
      readingTime: calculateReadingTime(content)
    }
  })
  
  // Sort by date (newest first)
  return projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Get all article files
export function getAllArticles(): Article[] {
  const articlesDir = join(process.cwd(), 'src/data/articles')
  const files = readdirSync(articlesDir).filter(file => file.endsWith('.mdx'))
  
  const articles = files.map(file => {
    const filePath = join(articlesDir, file)
    const fileContent = readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)
    
    return {
      ...data as ArticleFrontmatter,
      content
    }
  })
  
  // Sort by date (newest first)
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Get project by slug
export function getProjectBySlug(slug: string): Project | null {
  const projects = getAllProjects()
  return projects.find(project => project.slug === slug) || null
}

// Get article by slug
export function getArticleBySlug(slug: string): Article | null {
  const articles = getAllArticles()
  return articles.find(article => article.slug === slug) || null
}

// Get featured projects
export function getFeaturedProjects(): Project[] {
  const projects = getAllProjects()
  return projects.filter(project => project.featured)
}

// Get recent projects (limit)
export function getRecentProjects(limit: number = 3): Project[] {
  const projects = getAllProjects()
  return projects.slice(0, limit)
}

// Get recent articles (limit)
export function getRecentArticles(limit: number = 3): Article[] {
  const articles = getAllArticles()
  return articles.slice(0, limit)
}

// Get projects by category
export function getProjectsByCategory(category: string): Project[] {
  const projects = getAllProjects()
  return projects.filter(project => 
    project.category.toLowerCase() === category.toLowerCase()
  )
}

// Get articles by tag
export function getArticlesByTag(tag: string): Article[] {
  const articles = getAllArticles()
  return articles.filter(article => 
    article.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

// Get all unique categories
export function getAllCategories(): string[] {
  const projects = getAllProjects()
  const categories = new Set(projects.map(project => project.category))
  return Array.from(categories).sort()
}

// Get all unique tags
export function getAllTags(): string[] {
  const articles = getAllArticles()
  const tags = new Set(articles.flatMap(article => article.tags))
  return Array.from(tags).sort()
}

// Search projects
export function searchProjects(query: string): Project[] {
  const projects = getAllProjects()
  const lowercaseQuery = query.toLowerCase()
  
  return projects.filter(project => 
    project.title.toLowerCase().includes(lowercaseQuery) ||
    project.summary.toLowerCase().includes(lowercaseQuery) ||
    project.category.toLowerCase().includes(lowercaseQuery) ||
    project.techStack.some(tech => tech.toLowerCase().includes(lowercaseQuery))
  )
}

// Search articles
export function searchArticles(query: string): Article[] {
  const articles = getAllArticles()
  const lowercaseQuery = query.toLowerCase()
  
  return articles.filter(article => 
    article.title.toLowerCase().includes(lowercaseQuery) ||
    article.excerpt.toLowerCase().includes(lowercaseQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

// Client-side utility functions for dynamic loading
export async function loadProjectBySlug(slug: string): Promise<Project | null> {
  try {
    // In a real implementation, this would fetch from an API or use dynamic imports
    // For now, we'll use the existing server-side function
    if (typeof window === 'undefined') {
      return getProjectBySlug(slug)
    }
    
    // Client-side: fetch from API endpoint or use dynamic import
    const response = await fetch(`/api/projects/${slug}`)
    if (!response.ok) {
      return null
    }
    return await response.json()
  } catch (error) {
    console.error('Error loading project:', error)
    return null
  }
}

// Get project navigation (previous/next)
export function getProjectNavigation(currentSlug: string): {
  previous: Project | null
  next: Project | null
} {
  const projects = getAllProjects()
  const currentIndex = projects.findIndex(p => p.slug === currentSlug)
  
  if (currentIndex === -1) {
    return { previous: null, next: null }
  }
  
  return {
    previous: currentIndex > 0 ? projects[currentIndex - 1] : null,
    next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null
  }
}

// Get related projects based on category and tech stack
export function getRelatedProjects(currentSlug: string, limit: number = 3): Project[] {
  const projects = getAllProjects()
  const currentProject = projects.find(p => p.slug === currentSlug)
  
  if (!currentProject) {
    return []
  }
  
  const related = projects
    .filter(p => p.slug !== currentSlug)
    .filter(p => 
      p.category === currentProject.category ||
      p.techStack.some(tech => currentProject.techStack.includes(tech))
    )
    .slice(0, limit)
  
  return related
}
