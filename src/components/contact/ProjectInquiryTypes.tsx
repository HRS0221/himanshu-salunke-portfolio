import React from 'react'
import { motion } from 'framer-motion'

const ProjectInquiryTypes: React.FC = () => {
  const inquiryTypes = [
    {
      title: 'AI/ML Development',
      description: 'Machine learning models, data analysis, and AI-powered solutions',
      icon: '🤖',
      color: 'from-purple-500 to-purple-600',
      duration: '2-6 months',
      budget: '₹4,00,000 - ₹20,00,000',
      complexity: 'High',
      requirements: [
        'Clear project objectives and data requirements',
        'Access to relevant datasets',
        'Defined success metrics and KPIs',
        'Timeline and milestone expectations'
      ],
      deliverables: [
        'Trained ML models',
        'Data preprocessing pipelines',
        'Model evaluation reports',
        'Deployment documentation'
      ],
      timeline: '2-4 weeks for initial consultation'
    },
    {
      title: 'Data Engineering',
      description: 'Data pipelines, ETL processes, and data infrastructure',
      icon: '📊',
      color: 'from-green-500 to-green-600',
      duration: '3-8 months',
      budget: '₹6,50,000 - ₹25,00,000',
      complexity: 'High',
      requirements: [
        'Data source specifications',
        'Processing requirements',
        'Scalability needs',
        'Security and compliance requirements'
      ],
      deliverables: [
        'Data pipeline architecture',
        'ETL/ELT processes',
        'Data quality monitoring',
        'Scalable infrastructure setup'
      ],
      timeline: '2-3 weeks for architecture design'
    },
    {
      title: 'Technical Consulting',
      description: 'Architecture review, code audits, and technical guidance',
      icon: '💡',
      color: 'from-orange-500 to-orange-600',
      duration: '1-12 months',
      budget: '₹8,000 - ₹15,000/hour',
      complexity: 'Variable',
      requirements: [
        'Current system documentation',
        'Specific challenges or goals',
        'Team size and technical level',
        'Budget and timeline constraints'
      ],
      deliverables: [
        'Technical assessment report',
        'Recommendations and roadmap',
        'Implementation guidance',
        'Ongoing support and mentoring'
      ],
      timeline: '1 week for initial assessment'
    },
    {
      title: 'Mobile App Development',
      description: 'Cross-platform mobile applications with React Native',
      icon: '📱',
      color: 'from-indigo-500 to-indigo-600',
      duration: '2-6 months',
      budget: '₹4,00,000 - ₹16,00,000',
      complexity: 'Medium-High',
      requirements: [
        'App concept and wireframes',
        'Platform requirements (iOS/Android)',
        'Backend integration needs',
        'App store submission requirements'
      ],
      deliverables: [
        'Cross-platform mobile app',
        'App store assets',
        'Backend integration',
        'Testing and deployment'
      ],
      timeline: '2-3 weeks for design and planning'
    },
    {
      title: 'Open Source Contribution',
      description: 'Contributing to existing projects or building new ones',
      icon: '🔧',
      color: 'from-pink-500 to-pink-600',
      duration: 'Ongoing',
      budget: 'Free/Donation-based',
      complexity: 'Variable',
      requirements: [
        'Project selection and scope',
        'Contribution guidelines',
        'Code review process',
        'Community engagement'
      ],
      deliverables: [
        'Code contributions',
        'Documentation improvements',
        'Bug fixes and features',
        'Community support'
      ],
      timeline: 'Immediate start available'
    }
  ]

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'High':
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30'
      case 'Medium-High':
        return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30'
      case 'Medium':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30'
      case 'Low':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
      default:
        return 'text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-700'
    }
  }

  const processSteps = [
    {
      step: 1,
      title: 'Initial Consultation',
      description: 'Free 30-minute call to discuss your project needs and requirements',
      duration: '30 minutes',
      icon: '📞'
    },
    {
      step: 2,
      title: 'Project Planning',
      description: 'Detailed project scope, timeline, and budget estimation',
      duration: '1-2 weeks',
      icon: '📋'
    },
    {
      step: 3,
      title: 'Proposal & Contract',
      description: 'Formal proposal with deliverables, timeline, and payment terms',
      duration: '3-5 days',
      icon: '📄'
    },
    {
      step: 4,
      title: 'Development',
      description: 'Regular updates, milestone reviews, and collaborative development',
      duration: 'Project duration',
      icon: '🚀'
    },
    {
      step: 5,
      title: 'Delivery & Support',
      description: 'Final delivery, testing, deployment, and post-project support',
      duration: 'Ongoing',
      icon: '✅'
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
          📋 Project Inquiry Types
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Detailed information about different types of projects I work on
        </p>
      </div>

      {/* Inquiry Types Grid */}
      <div className="grid gap-4 md:gap-6 mb-12 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {inquiryTypes.map((inquiry, index) => (
          <motion.div
            key={inquiry.title}
            className="group relative bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${inquiry.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl`} />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">{inquiry.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    {inquiry.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getComplexityColor(inquiry.complexity)}`}>
                      {inquiry.complexity}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                {inquiry.description}
              </p>

              {/* Details */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500 dark:text-neutral-400">Duration:</span>
                  <span className="font-medium text-neutral-900 dark:text-white">{inquiry.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500 dark:text-neutral-400">Budget:</span>
                  <span className="font-medium text-neutral-900 dark:text-white">{inquiry.budget}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500 dark:text-neutral-400">Timeline:</span>
                  <span className="font-medium text-neutral-900 dark:text-white">{inquiry.timeline}</span>
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-4">
                <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-2 uppercase tracking-wide">
                  Key Requirements
                </div>
                <ul className="space-y-1">
                  {inquiry.requirements.slice(0, 2).map((req, reqIndex) => (
                    <li key={reqIndex} className="text-xs text-neutral-600 dark:text-neutral-400 flex items-start gap-1">
                      <span className="text-primary-500 mt-0.5">•</span>
                      {req}
                    </li>
                  ))}
                  {inquiry.requirements.length > 2 && (
                    <li className="text-xs text-neutral-500 dark:text-neutral-400">
                      +{inquiry.requirements.length - 2} more requirements
                    </li>
                  )}
                </ul>
              </div>

              {/* Deliverables */}
              <div className="mb-4">
                <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-2 uppercase tracking-wide">
                  Deliverables
                </div>
                <ul className="space-y-1">
                  {inquiry.deliverables.slice(0, 2).map((deliverable, delIndex) => (
                    <li key={delIndex} className="text-xs text-neutral-600 dark:text-neutral-400 flex items-start gap-1">
                      <span className="text-green-500 mt-0.5">✓</span>
                      {deliverable}
                    </li>
                  ))}
                  {inquiry.deliverables.length > 2 && (
                    <li className="text-xs text-neutral-500 dark:text-neutral-400">
                      +{inquiry.deliverables.length - 2} more deliverables
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-primary-100/30 to-transparent dark:from-primary-800/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        ))}
      </div>

      {/* Process Steps */}
      <motion.div
        className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6 text-center">
          🚀 Project Process
        </h3>
        
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 1.0 + index * 0.1 }}
            >
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3">
                {step.step}
              </div>
              <div className="text-2xl mb-2">{step.icon}</div>
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-1 text-sm">
                {step.title}
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">
                {step.description}
              </p>
              <div className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                {step.duration}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <div className="bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-600">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
            Ready to Start Your Project?
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-2xl mx-auto">
            I'm committed to delivering high-quality solutions that exceed your expectations. 
            Let's discuss your project and create something amazing together.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
            <span>✓ Free consultation</span>
            <span>✓ Transparent pricing</span>
            <span>✓ Regular updates</span>
            <span>✓ Post-project support</span>
            <span>✓ 100% satisfaction guarantee</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ProjectInquiryTypes
