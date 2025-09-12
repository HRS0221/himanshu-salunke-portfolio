import React from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ContactForm } from '../../components/contact/ContactForm'
import CollaborationOpportunities from '../../components/contact/CollaborationOpportunities'
import AvailabilityStatus from '../../components/contact/AvailabilityStatus'
import ProjectInquiryTypes from '../../components/contact/ProjectInquiryTypes'

const Contact: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Contact - Portfolio</title>
        <meta name="description" content="Get in touch with me for project inquiries or collaboration opportunities." />
        <meta property="og:title" content="Contact - Portfolio" />
        <meta property="og:description" content="Get in touch with me for project inquiries or collaboration opportunities." />
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
                Let's Collaborate
              </span>
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Ready to bring your ideas to life? I'm here to help with AI/ML projects, web development, 
              and technical consulting. Let's discuss how we can work together to achieve your goals.
            </p>
          </motion.div>

          {/* Collaboration Opportunities */}
          <motion.div className="mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <CollaborationOpportunities />
          </motion.div>

          {/* Availability Status */}
          <motion.div className="mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
            <AvailabilityStatus />
          </motion.div>

          {/* Project Inquiry Types */}
          <motion.div className="mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
            <ProjectInquiryTypes />
          </motion.div>

          {/* Contact Form */}
          <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Contact
