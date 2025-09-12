import React from 'react'
import { motion } from 'framer-motion'

interface Category {
  name: string
  description: string
  icon: string
  color: string
  projectCount: number
  technologies: string[]
  featured: boolean
}

interface ProjectCategoriesProps {
  projects: any[]
}

const ProjectCategories: React.FC<ProjectCategoriesProps> = ({ projects }) => {
  const categories: Category[] = [
    {
      name: 'AI/ML & Data Science',
      description: 'Machine learning models, data analysis, and AI-powered solutions',
      icon: '🤖',
      color: 'from-purple-500 to-purple-600',
      projectCount: projects.filter(p => p.category === 'AI/ML' || p.category === 'Data Science').length,
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy'],
      featured: true
    },
    {
      name: 'Computer Vision',
      description: 'Image processing, object detection, and visual recognition systems',
      icon: '👁️',
      color: 'from-blue-500 to-blue-600',
      projectCount: projects.filter(p => p.category === 'Computer Vision').length,
      technologies: ['OpenCV', 'MediaPipe', 'YOLO', 'Image Processing'],
      featured: true
    },
    {
      name: 'Data Engineering',
      description: 'Data pipelines, ETL processes, and scalable data infrastructure',
      icon: '⚙️',
      color: 'from-green-500 to-green-600',
      projectCount: projects.filter(p => p.category === 'Data Engineering').length,
      technologies: ['Apache Airflow', 'AWS Glue', 'Python', 'SQL', 'Docker'],
      featured: false
    },
    {
      name: 'Web Development',
      description: 'Full-stack web applications with modern frameworks and technologies',
      icon: '🌐',
      color: 'from-orange-500 to-orange-600',
      projectCount: projects.filter(p => p.category === 'Web Development').length,
      technologies: ['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind CSS'],
      featured: false
    },
    {
      name: 'Mobile Development',
      description: 'Cross-platform mobile applications and responsive web solutions',
      icon: '📱',
      color: 'from-indigo-500 to-indigo-600',
      projectCount: projects.filter(p => p.category === 'Mobile').length,
      technologies: ['React Native', 'Flutter', 'PWA', 'Responsive Design'],
      featured: false
    },
    {
      name: 'DevOps & Cloud',
      description: 'Cloud infrastructure, CI/CD pipelines, and deployment automation',
      icon: '☁️',
      color: 'from-red-500 to-red-600',
      projectCount: projects.filter(p => p.category === 'DevOps').length,
      technologies: ['AWS', 'Docker', 'Kubernetes', 'GitHub Actions', 'Vercel'],
      featured: false
    }
  ]

  return (
    <motion.div
      className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg border border-neutral-200 dark:border-neutral-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
          🎯 Project Categories
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Explore my expertise across different domains and technologies
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            className={`group relative rounded-xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer ${
              category.featured 
                ? 'bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-2 border-primary-200 dark:border-primary-800' 
                : 'bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-800 border border-neutral-200 dark:border-neutral-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            {/* Featured Badge */}
            {category.featured && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                ⭐ Featured
              </div>
            )}

            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl`} />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">{category.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    {category.name}
                  </h3>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    {category.projectCount} projects
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                {category.description}
              </p>

              {/* Technologies */}
              <div className="mb-4">
                <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-2 uppercase tracking-wide">
                  Key Technologies
                </div>
                <div className="flex flex-wrap gap-1">
                  {category.technologies.slice(0, 4).map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      className="px-2 py-1 bg-neutral-200 dark:bg-neutral-600 text-neutral-700 dark:text-neutral-300 text-xs rounded-full"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.1 + techIndex * 0.05 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {category.technologies.length > 4 && (
                    <span className="px-2 py-1 bg-neutral-200 dark:bg-neutral-600 text-neutral-700 dark:text-neutral-300 text-xs rounded-full">
                      +{category.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Project Count */}
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {category.projectCount}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  {category.projectCount === 1 ? 'project' : 'projects'}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <motion.div
        className="mt-8 p-6 bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-800 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="text-2xl">💡</div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
            Diverse Expertise
          </h3>
        </div>
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
          My projects span across multiple domains, from cutting-edge AI/ML solutions to robust web applications. 
          This diversity allows me to bring unique perspectives and cross-domain insights to every project I work on.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default ProjectCategories
