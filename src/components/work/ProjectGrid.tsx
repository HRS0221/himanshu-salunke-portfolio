import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { EnhancedProjectCard } from './EnhancedProjectCard'
import { SearchAndFilter } from '../ui/SearchAndFilter'
import { useRecruiterMode } from '../../context/RecruiterModeContext'
import { useDebounce } from '../../hooks/useDebounce'

interface Project {
  slug: string
  title: string
  summary: string
  coverImage: string
  category: string
  techStack: string[]
  date: string
  featured: boolean
  githubUrl?: string
  liveUrl?: string
  metrics?: Array<{ label: string; value: string }>
}

interface ProjectGridProps {
  projects: Project[]
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'name-asc' | 'name-desc'>('date-desc')
  const { isRecruiterMode } = useRecruiterMode()
  
  // Debounce search term
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(projects.map(p => p.category))]
    return cats
  }, [projects])

  // Sort options for ProjectGrid
  const sortOptions = [
    { value: 'date-desc', label: 'Latest', icon: '🕒' },
    { value: 'date-asc', label: 'Oldest', icon: '⏰' },
    { value: 'name-asc', label: 'A-Z', icon: '🔤' },
    { value: 'name-desc', label: 'Z-A', icon: '🔤' }
  ]

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects

    // Filter by search term (using debounced term)
    if (debouncedSearchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        project.summary.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        project.techStack.some(tech => tech.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
      )
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(project => project.category === selectedCategory)
    }

    // Filter by recruiter mode (show only featured projects)
    if (isRecruiterMode) {
      filtered = filtered.filter(project => project.featured)
    }

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case 'name-asc':
          return a.title.localeCompare(b.title)
        case 'name-desc':
          return b.title.localeCompare(a.title)
        default:
          return 0
      }
    })

    return filtered
  }, [projects, debouncedSearchTerm, selectedCategory, sortBy, isRecruiterMode])

  return (
    <div className="space-y-8">
      {/* Search and Filter Controls */}
      <SearchAndFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={(value) => setSortBy(value as 'date-desc' | 'date-asc' | 'name-asc' | 'name-desc')}
        sortOptions={sortOptions}
      />

      {/* Results Count */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-neutral-600 dark:text-neutral-400">
          Showing {filteredAndSortedProjects.length} of {projects.length} projects
          {isRecruiterMode && ' (Recruiter Mode: Featured Only)'}
        </p>
      </motion.div>

      {/* Projects Grid */}
      {filteredAndSortedProjects.length > 0 ? (
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          layout
        >
          {filteredAndSortedProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <EnhancedProjectCard
                project={project}
                index={index}
                isRecruiterMode={isRecruiterMode}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
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
          <p className="text-neutral-600 dark:text-neutral-400">
            Try adjusting your search terms or filters
          </p>
        </motion.div>
      )}
    </div>
  )
}
