import React from 'react'
import { motion } from 'framer-motion'

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/HRS0221',
    color: '#24292e',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/hr0221',
    color: '#0077b5',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'X (Twitter)',
    href: 'https://x.com/Wiser_0221',
    color: '#000000',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: 'Email',
    href: 'mailto:salunkehimanshu2001@gmail.com',
    color: '#ea4335',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819L12 8.73l6.545-4.909h3.819c.904 0 1.636.732 1.636 1.636z"/>
      </svg>
    ),
  },
]

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer 
      id="footer" 
      className="border-t border-neutral-200 dark:border-neutral-800"
      style={{ backgroundColor: 'hsla(221, 51%, 16%, 1)' }}
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Ready to Connect Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'hsla(0, 0%, 100%, 1)' }}
          >
            Ready to Connect?
          </h2>
          <p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            style={{ color: 'hsla(0, 0%, 90%, 1)' }}
          >
            Whether you want to collaborate, have questions, or just say hi!
          </p>
          
          {/* CTA Button */}
          <motion.a
            href="/contact"
            className="inline-block text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            style={{
              backgroundColor: 'hsla(37, 98%, 53%, 1)',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>

          {/* Quick Action Links */}
          <div 
            className="mt-8 flex flex-wrap justify-center items-center gap-6"
            style={{ color: 'hsla(0, 0%, 90%, 1)' }}
          >
            <a
              href="/articles"
              className="flex items-center gap-2 transition-colors duration-200"
              style={{ color: 'hsla(37, 98%, 53%, 1)' }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20c-1.2 0-2.18-1-2.18-2.18a2.18 2.18 0 0 1 2.18-2.18m0-5.64a2.18 2.18 0 0 1 2.18 2.18C8.36 13.36 7.38 14.36 6.18 14.36c-1.2 0-2.18-1-2.18-2.18A2.18 2.18 0 0 1 6.18 10m0-5.64a2.18 2.18 0 0 1 2.18 2.18C8.36 7.72 7.38 8.72 6.18 8.72c-1.2 0-2.18-1-2.18-2.18A2.18 2.18 0 0 1 6.18 4.36m5.64 0a2.18 2.18 0 0 1 2.18 2.18C14 7.72 13 8.72 11.82 8.72c-1.2 0-2.18-1-2.18-2.18A2.18 2.18 0 0 1 11.82 4.36m5.64 0a2.18 2.18 0 0 1 2.18 2.18C19.64 7.72 18.64 8.72 17.46 8.72c-1.2 0-2.18-1-2.18-2.18A2.18 2.18 0 0 1 17.46 4.36m-5.64 5.64a2.18 2.18 0 0 1 2.18 2.18C14 13.36 13 14.36 11.82 14.36c-1.2 0-2.18-1-2.18-2.18A2.18 2.18 0 0 1 11.82 10m5.64 0a2.18 2.18 0 0 1 2.18 2.18C19.64 13.36 18.64 14.36 17.46 14.36c-1.2 0-2.18-1-2.18-2.18A2.18 2.18 0 0 1 17.46 10m-5.64 5.64a2.18 2.18 0 0 1 2.18 2.18C14 19 13 20 11.82 20c-1.2 0-2.18-1-2.18-2.18A2.18 2.18 0 0 1 11.82 15.64m5.64 0a2.18 2.18 0 0 1 2.18 2.18C19.64 19 18.64 20 17.46 20c-1.2 0-2.18-1-2.18-2.18A2.18 2.18 0 0 1 17.46 15.64z"/>
              </svg>
              <span>Stay Updated</span>
            </a>
            
            <div 
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: 'hsla(0, 0%, 90%, 1)' }}
            ></div>
            
            <a
              href="/work"
              className="flex items-center gap-2 transition-colors duration-200"
              style={{ color: 'hsla(37, 98%, 53%, 1)' }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              <span>Find Content</span>
            </a>
            
            <div 
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: 'hsla(0, 0%, 90%, 1)' }}
            ></div>
            
            <a
              href="/Himanshu_Salunke_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors duration-200"
              style={{ color: 'hsla(37, 98%, 53%, 1)' }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
              <span>Download CV</span>
            </a>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="text-center border-t pt-8"
          style={{ borderColor: 'hsla(0, 0%, 90%, 1)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p 
            className="text-sm"
            style={{ color: 'hsla(0, 0%, 90%, 1)' }}
          >
            Built with <span className="text-red-500">❤️</span> by{' '}
            <a
              href="https://github.com/HRS0221"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: 'hsla(37, 98%, 53%, 1)' }}
            >
              Himanshu
            </a>{' '}
            using{' '}
            <a
              href="https://vitejs.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: 'hsla(37, 98%, 53%, 1)' }}
            >
              Vite
            </a>{' '}
            &{' '}
            <a
              href="https://tailwindcss.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: 'hsla(37, 98%, 53%, 1)' }}
            >
              Tailwind CSS
            </a>
          </p>
          
          {/* Decorative Icon */}
          <div className="mt-4 flex justify-center">
            <div 
              className="w-6 h-6 rounded-sm flex items-center justify-center"
              style={{ backgroundColor: 'hsla(0, 0%, 90%, 1)' }}
            >
              <div 
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: 'hsla(37, 98%, 53%, 1)' }}
              ></div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
