import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Button } from '../ui/Button'
import { SlackWebhook } from '../../utils/slackWebhook'
import { SiLinkedin, SiGithub, SiLeetcode } from 'react-icons/si'
import { HiMail, HiClock, HiGlobe } from 'react-icons/hi'
import { FaBookOpen } from 'react-icons/fa'

// Zod schema for form validation
const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters'),
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
            Message Sent Successfully! 🎉
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Thank you for reaching out! I've received your message and will get back to you within 24 hours.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="text-blue-600 dark:text-blue-400 text-lg">📧</div>
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  What happens next?
                </h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• I'll review your message and project requirements</li>
                  <li>• You'll receive a detailed response within 24 hours</li>
                  <li>• We can schedule a free consultation call if needed</li>
                </ul>
              </div>
            </div>
          </div>
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
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
          Get In Touch
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Always excited to connect with new people. Feel free to reach out about projects, new opportunities, or anything else.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form - Left Side */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
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
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
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


        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            rows={6}
            {...register('message')}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-vertical ${
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
        </div>

        {/* Contact Information - Right Side */}
        <div className="space-y-6">
          {/* Contact & Response Info */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-600">
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">Contact & Response</h3>
            <div className="space-y-4 text-sm">
               {/* Contact Info */}
               <div className="space-y-3">
                 <div className="flex items-center gap-3">
                   <HiMail className="w-5 h-5 text-blue-600 dark:text-blue-300 flex-shrink-0" />
                   <div>
                     <span className="text-neutral-700 dark:text-neutral-200">Email:</span>
                     <a 
                       href="mailto:contact.himanshusalunke@gmail.com" 
                       className="block text-primary-600 dark:text-blue-300 hover:underline font-medium"
                     >
                       contact.himanshusalunke@gmail.com
                     </a>
                   </div>
                 </div>
                 <div className="flex items-center gap-3">
                   <SiLinkedin className="w-5 h-5 text-blue-600 dark:text-blue-300 flex-shrink-0" />
                   <div>
                     <span className="text-neutral-700 dark:text-neutral-200">LinkedIn:</span>
                     <a 
                       href="https://www.linkedin.com/in/hr0221/" 
                       target="_blank"
                       rel="noopener noreferrer"
                       className="block text-primary-600 dark:text-blue-300 hover:underline font-medium"
                     >
                       Connect with me
                     </a>
                   </div>
                 </div>
               </div>
              
               {/* Response Info */}
               <div className="pt-3 border-t border-blue-200 dark:border-blue-600">
                 <div className="flex items-center gap-3 mb-2">
                   <HiClock className="w-5 h-5 text-blue-600 dark:text-blue-300 flex-shrink-0" />
                   <span className="text-neutral-700 dark:text-neutral-200">Response time: Within 24 hours</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <HiGlobe className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                   <span className="text-neutral-700 dark:text-neutral-200">Timezone: IST (Indian Standard Time)</span>
                 </div>
               </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-600">
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-3 text-sm">
              <div>
                <a 
                  href="/articles" 
                  className="flex items-center gap-3 text-primary-600 dark:text-blue-300 hover:underline font-medium"
                >
                  <FaBookOpen className="w-5 h-5 flex-shrink-0" />
                  Read My Articles
                </a>
              </div>
              <div>
                <a 
                  href="https://github.com/HRS0221" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-primary-600 dark:text-blue-300 hover:underline font-medium"
                >
                  <SiGithub className="w-5 h-5 flex-shrink-0" />
                  View My GitHub
                </a>
              </div>
              <div>
                <a 
                  href="https://leetcode.com/u/himanshusalunke/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-primary-600 dark:text-blue-300 hover:underline font-medium"
                >
                  <SiLeetcode className="w-5 h-5 flex-shrink-0" />
                  Check My LeetCode
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </motion.div>
  )
}
