import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/Button'

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* 404 Illustration */}
            <motion.div
              className="mb-8"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-8xl font-bold text-primary-500 mb-4">404</div>
              <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
            </motion.div>

            {/* Error Message */}
            <motion.h1
              className="text-3xl font-bold text-neutral-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Page Not Found
            </motion.h1>
            
            <motion.p
              className="text-lg text-neutral-600 dark:text-neutral-400 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              The page you're looking for doesn't exist or has been moved.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link to="/">
                <Button variant="primary" size="lg">
                  Go Home
                </Button>
              </Link>
              <Link to="/work">
                <Button variant="outline" size="lg">
                  View Projects
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default NotFound
