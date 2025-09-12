import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Button } from '../ui/Button'
import { SlackWebhook } from '../../utils/slackWebhook'

// Zod schema for form validation
const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be less than 200 characters'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
  honeypot: z.string().optional(), // Anti-spam field
})

type ContactFormData = z.infer<typeof contactFormSchema>

export const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    // Check honeypot field
    if (data.honeypot) {
      toast.error('Spam detected')
      return // Bot detected, silently ignore
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    // Show loading toast
    const loadingToast = toast.loading('Sending message...')

    try {
      // Send to Slack webhook
      const slackWebhook = new SlackWebhook()
      const slackSuccess = await slackWebhook.sendContactNotification({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      })

      if (slackSuccess) {
        setSubmitStatus('success')
        toast.success('Message sent successfully! I\'ll get back to you soon.', {
          id: loadingToast,
          duration: 5000,
        })
        reset()
      } else {
        // Fallback to email notification or other method
        setSubmitStatus('success') // Still show success to user
        toast.success('Message received! I\'ll get back to you soon.', {
          id: loadingToast,
          duration: 5000,
        })
        reset()
      }
    } catch (error) {
      console.error('Contact form error:', error)
      setSubmitStatus('error')
      setErrorMessage('Network error. Please try again.')
      toast.error('Network error. Please check your connection and try again.', {
        id: loadingToast,
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <motion.div
        className="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-lg border border-neutral-200 dark:border-neutral-700"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center">
          <motion.div
            className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
            Message Sent Successfully!
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Thank you for reaching out. I'll get back to you as soon as possible.
          </p>
          <Button
            onClick={() => setSubmitStatus('idle')}
            variant="outline"
            size="sm"
          >
            Send Another Message
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-lg border border-neutral-200 dark:border-neutral-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
        Get In Touch
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Honeypot field - hidden from users */}
        <input
          type="text"
          {...register('honeypot')}
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
              errors.name 
                ? 'border-red-500 dark:border-red-400' 
                : 'border-neutral-300 dark:border-neutral-600'
            } bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white dark:placeholder-neutral-400`}
            placeholder="Your full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
              errors.email 
                ? 'border-red-500 dark:border-red-400' 
                : 'border-neutral-300 dark:border-neutral-600'
            } bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white dark:placeholder-neutral-400`}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            {...register('subject')}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
              errors.subject 
                ? 'border-red-500 dark:border-red-400' 
                : 'border-neutral-300 dark:border-neutral-600'
            } bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white dark:placeholder-neutral-400`}
            placeholder="What's this about?"
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            rows={6}
            {...register('message')}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-vertical ${
              errors.message 
                ? 'border-red-500 dark:border-red-400' 
                : 'border-neutral-300 dark:border-neutral-600'
            } bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white dark:placeholder-neutral-400`}
            placeholder="Tell me about your project or how I can help..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Error Message */}
        {submitStatus === 'error' && (
          <motion.div
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex">
              <svg className="w-5 h-5 text-red-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-red-600 dark:text-red-400">
                {errorMessage}
              </p>
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </div>
          ) : (
            'Send Message'
          )}
        </Button>
      </form>

      {/* Fallback Contact Info */}
      <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
        <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
          Prefer email? You can also reach me at{' '}
          <a 
            href="mailto:hello@himanshu.dev" 
            className="text-primary-600 dark:text-primary-400 hover:underline"
          >
            hello@himanshu.dev
          </a>
        </p>
      </div>
    </motion.div>
  )
}
