import { MDXRemote } from 'next-mdx-remote/rsc'
import { MDXComponents } from '../components/mdx/ProjectMDXComponents'

// Client-side MDX content loader
export async function loadMDXContent(content: string) {
  try {
    // For now, we'll return the content as HTML
    // In a real implementation, you'd use MDXRemote or similar
    return content
  } catch (error) {
    console.error('Error loading MDX content:', error)
    return content
  }
}

// Parse MDX content to extract sections
export function parseMDXContent(content: string) {
  const sections = {
    about: '',
    features: '',
    caseStudy: '',
    challenges: '',
    results: ''
  }

  // Simple parsing logic - in a real app, you'd use a proper MDX parser
  const lines = content.split('\n')
  let currentSection = 'about'
  let currentContent: string[] = []

  for (const line of lines) {
    if (line.startsWith('## ')) {
      // Save previous section
      if (currentContent.length > 0) {
        sections[currentSection as keyof typeof sections] = currentContent.join('\n')
        currentContent = []
      }

      // Determine new section
      const heading = line.toLowerCase().replace('## ', '')
      if (heading.includes('feature') || heading.includes('key')) {
        currentSection = 'features'
      } else if (heading.includes('case study') || heading.includes('implementation')) {
        currentSection = 'caseStudy'
      } else if (heading.includes('challenge') || heading.includes('problem')) {
        currentSection = 'challenges'
      } else if (heading.includes('result') || heading.includes('impact') || heading.includes('performance')) {
        currentSection = 'results'
      } else {
        currentSection = 'about'
      }
    } else {
      currentContent.push(line)
    }
  }

  // Save last section
  if (currentContent.length > 0) {
    sections[currentSection as keyof typeof sections] = currentContent.join('\n')
  }

  return sections
}

// Extract code blocks from MDX content
export function extractCodeBlocks(content: string) {
  const codeBlocks: Array<{ language: string; code: string }> = []
  const codeRegex = /```(\w+)?\n([\s\S]*?)```/g
  let match

  while ((match = codeRegex.exec(content)) !== null) {
    codeBlocks.push({
      language: match[1] || 'text',
      code: match[2].trim()
    })
  }

  return codeBlocks
}

// Extract images from MDX content
export function extractImages(content: string) {
  const images: string[] = []
  const imageRegex = /!\[.*?\]\((.*?)\)/g
  let match

  while ((match = imageRegex.exec(content)) !== null) {
    images.push(match[1])
  }

  return images
}

// Generate table of contents from MDX content
export function generateTableOfContents(content: string) {
  const toc: Array<{ level: number; title: string; id: string }> = []
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const title = match[2].trim()
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    
    toc.push({ level, title, id })
  }

  return toc
}
