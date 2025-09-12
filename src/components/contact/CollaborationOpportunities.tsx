import React from 'react'
import { motion } from 'framer-motion'

const CollaborationOpportunities: React.FC = () => {
  const opportunities = [
    {
      title: 'AI/ML Projects',
      description: 'Machine learning model development, data analysis, and AI integration solutions',
      icon: '🤖',
      color: 'from-purple-500 to-purple-600',
      duration: '2-6 months',
      budget: '$$$',
      availability: 'Available',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy'],
      examples: [
        'Computer vision applications',
        'Natural language processing',
        'Predictive analytics',
        'Recommendation systems'
      ]
    },
    {
      title: 'Web Development',
      description: 'Full-stack web applications with modern frameworks and best practices',
      icon: '🌐',
      color: 'from-blue-500 to-blue-600',
      duration: '1-4 months',
      budget: '$$',
      availability: 'Available',
      skills: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
      examples: [
        'E-commerce platforms',
        'SaaS applications',
        'Portfolio websites',
        'API development'
      ]
    },
    {
      title: 'Data Engineering',
      description: 'Data pipelines, ETL processes, and scalable data infrastructure',
      icon: '📊',
      color: 'from-green-500 to-green-600',
      duration: '3-8 months',
      budget: '$$$',
      availability: 'Available',
      skills: ['Apache Airflow', 'Docker', 'Kubernetes', 'AWS', 'GCP', 'Apache Kafka'],
      examples: [
        'Real-time data processing',
        'Data warehouse design',
        'ETL pipeline development',
        'Cloud data solutions'
      ]
    },
    {
      title: 'Technical Writing',
      description: 'Technical documentation, tutorials, and educational content creation',
      icon: '📝',
      color: 'from-orange-500 to-orange-600',
      duration: '1-3 months',
      budget: '$',
      availability: 'Available',
      skills: ['Technical Writing', 'Documentation', 'Tutorial Creation', 'API Docs'],
      examples: [
        'API documentation',
        'Technical tutorials',
        'Code documentation',
        'Educational content'
      ]
    },
    {
      title: 'Consulting',
      description: 'Technical consulting, code reviews, and architecture guidance',
      icon: '💡',
      color: 'from-indigo-500 to-indigo-600',
      duration: '1-12 months',
      budget: '$$',
      availability: 'Available',
      skills: ['System Design', 'Code Review', 'Architecture', 'Best Practices'],
      examples: [
        'System architecture review',
        'Code quality assessment',
        'Performance optimization',
        'Technology stack selection'
      ]
    },
    {
      title: 'Open Source',
      description: 'Contributing to open source projects and building community tools',
      icon: '🔧',
      color: 'from-pink-500 to-pink-600',
      duration: 'Ongoing',
      budget: 'Free',
      availability: 'Available',
      skills: ['Git', 'GitHub', 'Community Management', 'Project Maintenance'],
      examples: [
        'Bug fixes and features',
        'Documentation improvements',
        'Community support',
        'Project maintenance'
      ]
    }
  ]

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
      case 'Limited':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30'
      case 'Unavailable':
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30'
      default:
        return 'text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-700'
    }
  }

  const getBudgetColor = (budget: string) => {
    switch (budget) {
      case '$$$':
        return 'text-green-600 dark:text-green-400'
      case '$$':
        return 'text-yellow-600 dark:text-yellow-400'
      case '$':
        return 'text-blue-600 dark:text-blue-400'
      case 'Free':
        return 'text-purple-600 dark:text-purple-400'
      default:
        return 'text-neutral-600 dark:text-neutral-400'
    }
  }

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
          🤝 Collaboration Opportunities
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Explore the types of projects and collaborations I'm excited to work on
        </p>
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities.map((opportunity, index) => (
          <motion.div
            key={opportunity.title}
            className="group relative bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${opportunity.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl`} />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">{opportunity.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    {opportunity.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getAvailabilityColor(opportunity.availability)}`}>
                      {opportunity.availability}
                    </span>
                    <span className={`text-sm font-semibold ${getBudgetColor(opportunity.budget)}`}>
                      {opportunity.budget}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                {opportunity.description}
              </p>

              {/* Duration */}
              <div className="mb-4">
                <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-1 uppercase tracking-wide">
                  Duration
                </div>
                <div className="text-sm text-neutral-700 dark:text-neutral-300">
                  {opportunity.duration}
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-2 uppercase tracking-wide">
                  Key Skills
                </div>
                <div className="flex flex-wrap gap-1">
                  {opportunity.skills.slice(0, 4).map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      className="px-2 py-1 bg-neutral-200 dark:bg-neutral-600 text-neutral-700 dark:text-neutral-300 text-xs rounded-full"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.1 + skillIndex * 0.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                  {opportunity.skills.length > 4 && (
                    <span className="px-2 py-1 bg-neutral-200 dark:bg-neutral-600 text-neutral-700 dark:text-neutral-300 text-xs rounded-full">
                      +{opportunity.skills.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Examples */}
              <div className="mb-4">
                <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-2 uppercase tracking-wide">
                  Examples
                </div>
                <ul className="space-y-1">
                  {opportunity.examples.slice(0, 2).map((example, exampleIndex) => (
                    <li key={example} className="text-xs text-neutral-600 dark:text-neutral-400 flex items-start gap-1">
                      <span className="text-primary-500 mt-0.5">•</span>
                      {example}
                    </li>
                  ))}
                  {opportunity.examples.length > 2 && (
                    <li className="text-xs text-neutral-500 dark:text-neutral-400">
                      +{opportunity.examples.length - 2} more examples
                    </li>
                  )}
                </ul>
              </div>

              {/* CTA */}
              <div className="text-center">
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  Interested? Let's discuss!
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-primary-100/30 to-transparent dark:from-primary-800/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
            Ready to Collaborate?
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            I'm always excited to work on new projects and help bring ideas to life. 
            Let's discuss how we can work together to achieve your goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
            <span>✓ Free initial consultation</span>
            <span>✓ Transparent pricing</span>
            <span>✓ Regular progress updates</span>
            <span>✓ Post-project support</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CollaborationOpportunities
