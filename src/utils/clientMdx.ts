// Type definitions for project data
// Note: All data is now fetched from the Node.js API backend

export interface ProjectFrontmatter {
  id: string
  title: string
  summary: string
  category: string
  coverImage: string
  date: string
  techStack: string[]
  featured: boolean
  status: string
  metrics: Array<{
    label: string
    value: string
  }>
  githubUrl: string
  liveUrl: string
  // Additional fields for enhanced project pages
  publishedAt?: string
  order?: number
  completionDate?: string
  images?: string[]
  link?: string
  outputLink?: string
  tag?: string
}

export interface Project extends ProjectFrontmatter {
  content: string
  readingTime: number
  slug: string
}