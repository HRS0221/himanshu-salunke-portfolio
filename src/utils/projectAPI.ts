// Client-side project API utilities
import { type Project } from './clientMdx'

// Import all project MDX files
import realTimeHeightMeasurementSystem from '../data/projects/real-time-height-measurement-system.mdx'
import movingVehicleNumberPlateDetection from '../data/projects/moving-vehicle-number-plate-detection.mdx'
import sentimentAnalysisWithBert from '../data/projects/sentiment-analysis-with-bert.mdx'
import youtubeDataEngineeringPipeline from '../data/projects/youtube-data-engineering-pipeline.mdx'
import exploratoryDataAnalysisIris from '../data/projects/exploratory-data-analysis-iris.mdx'
import worldLayoffDataAnalysis from '../data/projects/world-layoff-data-analysis.mdx'
import upliftingHappinessIndex from '../data/projects/uplifting-happiness-index.mdx'


// All projects data
const allProjects = [
  realTimeHeightMeasurementSystem,
  movingVehicleNumberPlateDetection,
  sentimentAnalysisWithBert,
  youtubeDataEngineeringPipeline,
  exploratoryDataAnalysisIris,
  worldLayoffDataAnalysis,
  upliftingHappinessIndex
]

// Fetch all projects from MDX files
export async function fetchAllProjects(): Promise<Project[]> {
  try {
    console.log('🔍 Loading projects from server API...')
    
    // Use the server.js API that's already running
    const response = await fetch('http://localhost:5000/api/projects')
    
    if (!response.ok) {
      throw new Error(`Server API error: ${response.status}`)
    }
    
    const projects = await response.json()
    console.log('✅ Loaded projects from server:', projects)
    console.log('📊 Projects count:', projects.length)
    
    return projects
  } catch (error) {
    console.error('❌ Error loading projects from server API:', error)
    console.log('🔄 Falling back to MDX imports...')
    
    try {
      // Fallback to MDX imports if server API fails
      console.log('🔍 Loading projects from MDX files...')
      console.log('📁 allProjects array:', allProjects)
      console.log('📊 allProjects length:', allProjects.length)
      
      // Process each project to add computed fields
      const projects = allProjects.map((project, index) => {
        console.log(`📄 Processing project ${index}:`, project)
        console.log(`📄 Project type:`, typeof project)
        console.log(`📄 Project keys:`, Object.keys(project || {}))
        console.log(`📄 Project constructor:`, project?.constructor?.name)
        console.log(`📄 Project meta:`, (project as any)?.meta)
        console.log(`📄 Project frontmatter:`, (project as any)?.frontmatter)
        console.log(`📄 Project props:`, (project as any)?.props)
        console.log(`📄 Project defaultProps:`, (project as any)?.defaultProps)
        
        // Check if project has meta property (MDX frontmatter)
        let frontmatter: any = {}
        if (project && typeof project === 'object') {
          // Try to access meta property from MDX component
          frontmatter = (project as any).meta || {}
          console.log(`📄 Meta for project ${index}:`, frontmatter)
          console.log(`📄 Meta keys:`, Object.keys(frontmatter))
          
          // If meta is empty, try other possible properties
          if (Object.keys(frontmatter).length === 0) {
            frontmatter = (project as any).frontmatter || {}
            console.log(`📄 Trying frontmatter for project ${index}:`, frontmatter)
          }
        }
        
        // Create a complete project object with all required fields
        const completeProject: Project = {
          id: frontmatter.id || `project-${index}`,
          title: frontmatter.title || `Project ${index + 1}`,
          summary: frontmatter.summary || 'No summary available',
          category: frontmatter.category || 'Uncategorized',
          coverImage: frontmatter.coverImage || '/images/projects/default.jpg',
          date: frontmatter.date || new Date().toISOString().split('T')[0],
          techStack: frontmatter.techStack || [],
          featured: frontmatter.featured || false,
          status: frontmatter.status || 'Unknown',
          metrics: frontmatter.metrics || [],
          githubUrl: frontmatter.githubUrl || '',
          liveUrl: frontmatter.liveUrl || '',
          publishedAt: frontmatter.publishedAt || frontmatter.date || new Date().toISOString().split('T')[0],
          order: frontmatter.order || index + 1,
          completionDate: frontmatter.completionDate || frontmatter.date || new Date().toISOString().split('T')[0],
          images: frontmatter.images || [],
          link: frontmatter.link || frontmatter.githubUrl || '',
          outputLink: frontmatter.outputLink || '',
          tag: frontmatter.tag || frontmatter.category || 'Uncategorized',
          content: frontmatter.content || '',
          readingTime: Math.ceil((frontmatter.content || '').split(' ').length / 200) || 1,
          slug: frontmatter.id || `project-${index}`
        }
        
        console.log(`✅ Complete project ${index}:`, completeProject)
        return completeProject
      })

      console.log('✅ Processed projects:', projects)

      // Sort by order field if available, otherwise by date
      const sortedProjects = projects.sort((a, b) => {
        if (a.order && b.order) {
          return a.order - b.order
        }
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })

      console.log('📈 Final sorted projects:', sortedProjects)
      return sortedProjects
    } catch (fallbackError) {
      console.error('❌ Error in fallback MDX processing:', fallbackError)
      return []
    }
  }
}

// Fetch project by slug
export async function fetchProject(slug: string): Promise<Project | null> {
  try {
    console.log('🔍 Fetching project by slug:', slug)
    
    // Try server API first
    const response = await fetch(`http://localhost:5000/api/projects/${slug}`)
    
    if (response.ok) {
      const project = await response.json()
      console.log('✅ Loaded project from server:', project)
      return project
    }
    
    // Fallback to client-side search
    const projects = await fetchAllProjects()
    const project = projects.find(p => p.slug === slug)
    
    if (!project) {
      console.error(`Project not found: ${slug}`)
      return null
    }
    
    return project
  } catch (error) {
    console.error(`Error fetching project ${slug}:`, error)
    return null
  }
}

// Fetch featured projects
export async function fetchFeaturedProjects(): Promise<Project[]> {
  try {
    const projects = await fetchAllProjects()
    return projects.filter(project => project.featured)
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }
}

// Fetch project navigation
export async function fetchProjectNavigation(slug: string): Promise<{ previous: Project | null; next: Project | null }> {
  try {
    const projects = await fetchAllProjects()
    const currentIndex = projects.findIndex(p => p.slug === slug)
    
    if (currentIndex === -1) {
      return { previous: null, next: null }
    }
    
    return {
      previous: currentIndex > 0 ? projects[currentIndex - 1] : null,
      next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null
    }
  } catch (error) {
    console.error(`Error fetching project navigation for ${slug}:`, error)
    return { previous: null, next: null }
  }
}

// Fetch related projects
export async function fetchRelatedProjects(slug: string, limit: number = 3): Promise<Project[]> {
  try {
    const projects = await fetchAllProjects()
    const currentProject = projects.find(p => p.slug === slug)
    
    if (!currentProject) {
      return []
    }
    
    // Find projects with similar category or tech stack
    const related = projects
      .filter(p => p.slug !== slug)
      .filter(p => 
        p.category === currentProject.category || 
        p.techStack.some(tech => currentProject.techStack.includes(tech))
      )
      .slice(0, limit)
    
    return related
  } catch (error) {
    console.error(`Error fetching related projects for ${slug}:`, error)
    return []
  }
}

// Generate project metadata for SEO
export function generateProjectMetadata(project: any) {
  return {
    title: `${project.title} - Portfolio`,
    description: project.summary,
    keywords: project.techStack.join(', '),
    openGraph: {
      title: `${project.title} - Portfolio`,
      description: project.summary,
      image: project.coverImage,
      type: 'article',
      publishedTime: project.date,
      authors: ['Himanshu'],
      tags: project.techStack
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} - Portfolio`,
      description: project.summary,
      image: project.coverImage
    }
  }
}
