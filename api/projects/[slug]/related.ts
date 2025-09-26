import { VercelRequest, VercelResponse } from '@vercel/node'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { slug } = req.query
    const limit = parseInt(req.query.limit as string) || 3
    
    if (!slug || typeof slug !== 'string') {
      return res.status(400).json({ error: 'Project slug is required' })
    }
    
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
    
    // Find current project
    const currentProject = projects.find(project => project.slug === slug)
    if (!currentProject) {
      return res.status(404).json({ error: 'Project not found' })
    }
    
    // Find related projects based on tech stack overlap
    const relatedProjects = projects
      .filter((project: any) => 
        project.slug !== slug && 
        project.techStack && 
        currentProject.techStack &&
        project.techStack.some((tech: string) => currentProject.techStack.includes(tech))
      )
      .sort((a: any, b: any) => {
        // Sort by number of matching technologies
        const aMatches = a.techStack.filter((tech: string) => currentProject.techStack.includes(tech)).length
        const bMatches = b.techStack.filter((tech: string) => currentProject.techStack.includes(tech)).length
        return bMatches - aMatches
      })
      .slice(0, limit)
    
    res.setHeader('Cache-Control', 'public, max-age=3600')
    res.status(200).json(relatedProjects)
  } catch (error) {
    console.error('Error fetching related projects:', error)
    res.status(500).json({ error: 'Failed to fetch related projects' })
  }
}
