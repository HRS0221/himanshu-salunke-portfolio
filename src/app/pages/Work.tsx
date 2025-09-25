import React, { useState, useMemo, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Tag } from '../../components/ui/Tag'
import { Button } from '../../components/ui/Button'
import { SearchAndFilter } from '../../components/ui/SearchAndFilter'
import { ImageWithShimmer } from '../../components/ui/ImageWithShimmer'
import { formatDate } from '../../utils/formatDate'
import { fetchAllProjects } from '../../utils/projectAPI'
import { type Project } from '../../utils/clientMdx'
import ProjectCategories from '../../components/work/ProjectCategories'
import ProjectTimeline from '../../components/work/ProjectTimeline'

const Work: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  // Load projects from MDX files
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectsData = await fetchAllProjects()
        console.log('🔍 Work page - Loaded projects:', projectsData)
        console.log('🔍 Work page - Projects count:', projectsData.length)
        console.log('🔍 Work page - First project:', projectsData[0])
        setProjects(projectsData)
      } catch (error) {
        console.error('❌ Work page - Error loading projects:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'featured' | 'readTime' | 'views' | 'likes'>('date')

  const categories = ['All', 'Computer Vision', 'Deep Learning', 'Data Analysis', 'Data Engineering']
  const statuses = ['All', 'Completed', 'In Progress', 'Planning']

  const sortOptions = [
    { value: 'date', label: 'Latest', icon: '🕒' },
    { value: 'title', label: 'Title', icon: '🔤' },
    { value: 'featured', label: 'Featured', icon: '⭐' },
    { value: 'readTime', label: 'Read Time', icon: '⏱️' },
    { value: 'views', label: 'Most Viewed', icon: '👁️' },
    { value: 'likes', label: 'Most Liked', icon: '❤️' }
  ]

  const filteredProjects = useMemo(() => {
    console.log('🔍 Work page state:', {
      loading,
      projectsCount: projects.length,
      searchTerm,
      selectedCategory,
      selectedStatus,
      sortBy
    })
    
    const filtered = projects.filter(project => {
      // Safety checks for undefined properties
      if (!project || !project.title || !project.summary || !project.techStack) {
        console.warn('❌ Project missing required properties:', project)
        return false
      }

      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.techStack.some(tech => tech && tech.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory
      const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus
      
      return matchesSearch && matchesCategory && matchesStatus
    })

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return (a.title || '').localeCompare(b.title || '')
        case 'featured':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        case 'readTime':
          // For projects, sort by tech stack length (complexity indicator)
          return (a.techStack?.length || 0) - (b.techStack?.length || 0)
        case 'views':
          // For projects, sort by number of metrics (engagement indicator)
          return (b.metrics?.length || 0) - (a.metrics?.length || 0)
        case 'likes':
          // For projects, sort by tech stack length (popularity indicator)
          return (b.techStack?.length || 0) - (a.techStack?.length || 0)
        case 'date':
        default:
          return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
      }
    })

    console.log('✅ Work page - Filtered projects:', filtered.length)
    return filtered
  }, [searchTerm, selectedCategory, selectedStatus, sortBy, projects])

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-400">Loading projects...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Work - Portfolio</title>
        <meta name="description" content="Explore my portfolio of web development projects, AI/ML applications, and case studies showcasing modern development practices." />
        <meta property="og:title" content="Work - Portfolio" />
        <meta property="og:description" content="Explore my portfolio of web development projects, AI/ML applications, and case studies." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                Project
              </span>{' '}
              Portfolio
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Explore my diverse portfolio of innovative projects, from AI/ML solutions to full-stack applications. 
              Each project tells a story of problem-solving, creativity, and technical excellence.
            </p>
          </motion.div>


          {/* Project Categories */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ProjectCategories projects={projects} />
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <SearchAndFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              statuses={statuses}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              sortBy={sortBy}
              onSortChange={(value) => setSortBy(value as 'date' | 'title' | 'featured' | 'readTime' | 'views' | 'likes')}
              sortOptions={sortOptions}
            />
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-neutral-200 dark:border-neutral-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <ImageWithShimmer
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-auto object-contain transition-transform duration-300 hover:scale-105"
                  />
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border border-white/20 backdrop-blur-sm">
                        ⭐ Featured
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <Tag variant="default" size="sm">
                      {project.category}
                    </Tag>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Tag 
                      variant={project.status === 'Completed' ? 'success' : project.status === 'In Progress' ? 'warning' : 'default'} 
                      size="sm"
                    >
                      {project.status}
                    </Tag>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2 font-bold">
                      {project.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="mb-4">
                    <div className="grid grid-cols-2 gap-2">
                      {project.metrics.slice(0, 2).map((metric, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-lg font-bold text-primary-600 dark:text-primary-500">
                            {metric.value}
                          </div>
                          <div className="text-xs text-neutral-500 dark:text-neutral-400">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <Tag key={tech} variant="primary" size="sm">
                          {tech}
                        </Tag>
                      ))}
                      {project.techStack.length > 3 && (
                        <Tag variant="default" size="sm">
                          +{project.techStack.length - 3} more
                        </Tag>
                      )}
                    </div>
                  </div>

                  {/* Date and Actions */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                      {formatDate(project.date)}
                    </span>
                    <div className="flex gap-2">
                      <Link to={`/projects/${project.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                No projects found
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Try adjusting your search criteria or filters.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                  setSelectedStatus('All')
                }}
              >
                Clear Filters
              </Button>
            </motion.div>
          )}

          {/* Project Timeline */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <ProjectTimeline projects={projects} />
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Work
