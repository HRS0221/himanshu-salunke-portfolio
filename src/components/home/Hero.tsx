import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Lightweight Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900" />
      
      {/* Simple animated background elements - CSS only */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 dark:bg-primary-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 dark:bg-secondary-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Additional lightweight decorative elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-lg"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-20 blur-lg"
          animate={{
            y: [0, 20, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Greeting */}
          <motion.p
            className="text-lg font-semibold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.span 
              className="bg-clip-text text-transparent"
              style={{
                background: 'linear-gradient(90deg, hsla(210, 90%, 80%, 1) 0%, hsla(212, 93%, 49%, 1) 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                MozBackgroundClip: 'text',
                filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#9FCCFA", endColorstr="#0974F1", GradientType=1)'
              }}
              animate={{ backgroundPosition: ['0% 50%', '200% 50%', '0% 50%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              Hello, I'm
            </motion.span>
          </motion.p>

          {/* Name */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.span 
              className="bg-clip-text text-transparent"
              style={{
                background: 'linear-gradient(90deg, hsla(210, 90%, 80%, 1) 0%, hsla(212, 93%, 49%, 1) 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                MozBackgroundClip: 'text',
                filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#9FCCFA", endColorstr="#0974F1", GradientType=1)'
              }}
              animate={{ backgroundPosition: ['0% 50%', '200% 50%', '0% 50%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            >
              Himanshu Salunke
            </motion.span>
          </motion.h1>

          {/* Role with emojis */}
          <motion.div
            className="text-xl md:text-2xl lg:text-3xl mb-4 font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.span
              className="inline-block"
              animate={{ 
                rotate: [0, 5, -5, 0],
                transition: { duration: 2, repeat: Infinity, repeatDelay: 3 }
              }}
            >
              🚀
            </motion.span>
            <motion.span 
              className="mx-2 bg-clip-text text-transparent"
              style={{
                background: 'linear-gradient(90deg, hsla(210, 90%, 80%, 1) 0%, hsla(212, 93%, 49%, 1) 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                MozBackgroundClip: 'text',
                filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#9FCCFA", endColorstr="#0974F1", GradientType=1)'
              }}
              animate={{ backgroundPosition: ['0% 50%', '200% 50%', '0% 50%'] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            >
              Aspiring Data Scientist
            </motion.span>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl mb-8 max-w-4xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.span 
              className="bg-clip-text text-transparent"
              style={{
                background: 'linear-gradient(90deg, hsla(210, 90%, 80%, 1) 0%, hsla(212, 93%, 49%, 1) 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                MozBackgroundClip: 'text',
                filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#9FCCFA", endColorstr="#0974F1", GradientType=1)'
              }}
              animate={{ backgroundPosition: ['0% 50%', '200% 50%', '0% 50%'] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            >
              Building the future, one line of code at a time. Passionate about creating intelligent solutions 
              that solve real-world problems with Python, Machine Learning, and cutting-edge AI technologies.
            </motion.span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/work">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto relative overflow-hidden group"
                >
                  <span className="relative z-10">Explore My Projects</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3 }}
                />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto relative overflow-hidden group"
                >
                  <span className="relative z-10">My Story</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-secondary-500 to-primary-500 opacity-0 group-hover:opacity-10"
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 -ml-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.div
              className="w-6 h-10 border-2 border-neutral-400 dark:border-neutral-500 rounded-full flex justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-3 bg-neutral-400 dark:bg-neutral-500 rounded-full mt-2"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
