import React from 'react'
import { motion } from 'framer-motion'

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/himanshu',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/himanshu',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/himanshu',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
    ),
  },
  {
    name: 'Email',
    href: 'mailto:hello@himanshu.dev',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
]

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="footer" className="bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                Himanshu Kishor Salunke
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                AI/ML Engineer & Full-Stack Developer passionate about creating intelligent solutions 
                that solve real-world problems. Building the future, one line of code at a time.
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                <span>📍 Maharashtra, India</span>
                <span>•</span>
                <span>🎓 B.Tech Data Science</span>
                <span>•</span>
                <span>🚀 Preparing for GATE 2026</span>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
                Quick Links
              </h4>
              <ul className="mt-4 space-y-2">
                {[
                  { name: 'About', href: '/about' },
                  { name: 'Work', href: '/work' },
                  { name: 'Developer', href: '/developer' },
                  { name: 'Articles', href: '/articles' },
                  { name: 'Contact', href: '/contact' }
                ].map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm text-neutral-600 hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-400 transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Social Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
                Connect
              </h4>
              <div className="mt-4 flex space-x-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
                    aria-label={link.name}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
              <div className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
                <p>Ready to collaborate?</p>
                <p className="mt-1">Let's build something amazing together!</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-8 border-t border-neutral-200 dark:border-neutral-800 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              © {currentYear} Himanshu Kishor Salunke. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-neutral-600 dark:text-neutral-400">
              <a
                href="/privacy"
                className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
