import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/Button'

export const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('Please enter your email address')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)

    try {
      // Make API call to newsletter endpoint
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (!response.ok) {
        throw new Error('Failed to subscribe to newsletter')
      }

      setIsSubmitted(true)
      setEmail('')
    } catch (err) {
      console.error('Newsletter signup error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-xl p-8">
          <div className="w-16 h-16 bg-success-100 dark:bg-success-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-success-600 dark:text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-success-900 dark:text-success-100 mb-2">
            Thanks for subscribing!
          </h3>
          <p className="text-success-700 dark:text-success-300">
            You'll receive updates about new projects, articles, and insights.
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
            Get notified about new projects, articles, and insights. No spam, just quality content delivered to your inbox.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
                disabled={isSubmitting}
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isSubmitting}
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </div>
          
          {error && (
            <motion.p
              className="mt-3 text-sm text-error-600 dark:text-error-400"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.p>
          )}
        </motion.form>

        <motion.p
          className="text-sm text-neutral-500 dark:text-neutral-400 mt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Join 500+ developers who receive our weekly newsletter
        </motion.p>
      </div>
    </motion.div>
  )
}
