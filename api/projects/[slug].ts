import { VercelRequest, VercelResponse } from '@vercel/node'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { slug } = req.query
    
    if (!slug || typeof slug !== 'string') {
      return res.status(400).json({ error: 'Project slug is required' })
    }
    
    const projectsDir = join(process.cwd(), 'src/data/projects')
    const files = readdirSync(projectsDir).filter(file => file.endsWith('.mdx'))
    
    const projectFile = files.find(file => {
      const filePath = join(projectsDir, file)
      const fileContent = readFileSync(filePath, 'utf8')
      const { data: frontmatter } = matter(fileContent)
      return frontmatter.id === slug
    })
    
    if (!projectFile) {
      return res.status(404).json({ error: 'Project not found' })
    }
    
    const filePath = join(projectsDir, projectFile)
    const fileContent = readFileSync(filePath, 'utf8')
    const { data: frontmatter, content } = matter(fileContent)
    
    const project = {
      ...frontmatter,
      slug: frontmatter.id,
      content,
      readingTime: Math.ceil(content.split(' ').length / 200)
    }
    
    res.setHeader('Cache-Control', 'public, max-age=3600')
    res.status(200).json(project)
  } catch (error) {
    console.error('Error fetching project:', error)
    res.status(500).json({ error: 'Failed to fetch project' })
  }
}
