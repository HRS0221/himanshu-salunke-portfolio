import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Tag } from '../ui/Tag'
import { ImageWithShimmer } from '../ui/ImageWithShimmer'
import { formatDate } from '../../utils/formatDate'

// Recent projects from portfolio - Updated with all featured projects
const recentProjects = [
  {
    id: 'moving-vehicle-number-plate-detection',
    title: 'Moving Vehicle Number Plate Detection',
    summary: 'Achieved 94.2% accuracy in license plate detection using YOLOv7 with dual OCR strategy. Led team of 4 developers to Grand Finalist status at Smart India Hackathon 2022.',
    category: 'Computer Vision',
    coverImage: '/images/projects/cover-03.jpg',
    date: '2024-01-15',
    techStack: ['YOLOv7', 'OpenCV', 'EasyOCR', 'Flask', 'Python', 'Deep Learning'],
    featured: true
  },
  {
    id: 'sentiment-analysis-with-bert',
    title: 'Sentiment Analysis with BERT',
    summary: 'Delivered 92.7% accuracy in emotion classification by fine-tuning BERT model on SMILE dataset. Engineered complete ML pipeline processing 500+ predictions per minute.',
    category: 'Deep Learning',
    coverImage: '/images/projects/cover-02.jpg',
    date: '2024-01-10',
    techStack: ['BERT', 'PyTorch', 'Transformers', 'scikit-learn', 'Python', 'FastAPI'],
    featured: true
  },
  {
    id: 'real-time-height-measurement-system',
    title: 'Real-Time Height Measurement System',
    summary: 'Achieved ±2cm precision accuracy using MediaPipe and Kalman filtering. Delivered 30 FPS real-time processing with <100ms latency using FastAPI backend.',
    category: 'Computer Vision',
    coverImage: '/images/projects/HeightMeasurement.jpg',
    date: '2025-09-07',
    techStack: ['Python', 'FastAPI', 'MediaPipe', 'OpenCV', 'React', 'TypeScript'],
    featured: true
  }
]

const ProjectCard: React.FC<{ project: any; index: number }> = ({ project, index }) => {

  return (
    <motion.div
      key={project.id}
      className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700 group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
            {/* Project Image */}
            <div className="relative overflow-hidden">
              <ImageWithShimmer
                src={project.coverImage}
                alt={project.title}
                className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-110"
              />
              {project.featured && (
                <div className="absolute top-4 left-4">
                  <Tag variant="primary" size="sm">
                    Featured
                  </Tag>
                </div>
              )}
              <div className="absolute top-4 right-4">
                <Tag variant="default" size="sm">
                  {project.category}
                </Tag>
              </div>
            </div>

            {/* Project Content */}
            <div className="p-6">
              <div className="mb-3">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2 font-bold">
                  {project.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                  {project.summary}
                </p>
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

              {/* Stats and Date */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                </div>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                  {formatDate(project.date)}
                </span>
              </div>

              {/* CTA */}
              <div className="flex items-center justify-end">
                <Link
                  to={`/work/${project.id}`}
                  onClick={incrementView}
                  className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 dark:text-white dark:hover:text-blue-300 font-semibold text-sm transition-all duration-200 hover:gap-2 group"
                >
                  <span>View Project</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </Link>
              </div>
            </div>
          </motion.div>
  )
}

export const RecentProjects: React.FC = memo(() => {
  return (
    <div id="recent-projects">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recentProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* View All Projects CTA */}
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <Link
          to="/work"
          className="inline-flex items-center px-6 py-3 border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white font-medium rounded-lg transition-all duration-200"
        >
          View All Projects
        </Link>
      </motion.div>
    </div>
  )
})
