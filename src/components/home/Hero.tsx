import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'

// Typewriter effect component
const TypewriterText: React.FC<{ text: string; speed?: number }> = ({ text, speed = 100 }) => {
  const [currentSkill, setCurrentSkill] = React.useState(0)
  const [currentChar, setCurrentChar] = React.useState(0)
  const [isDeleting, setIsDeleting] = React.useState(false)
  
  const skills = text.split(', ')

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing characters
        if (currentChar < skills[currentSkill].length) {
          setCurrentChar(prev => prev + 1)
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        // Deleting characters
        if (currentChar > 0) {
          setCurrentChar(prev => prev - 1)
        } else {
          // Finished deleting, move to next skill
          setIsDeleting(false)
          setCurrentSkill(prev => (prev + 1) % skills.length)
        }
      }
    }, isDeleting ? speed / 2 : speed) // Delete faster than type

    return () => clearTimeout(timeout)
  }, [currentChar, currentSkill, isDeleting, skills, speed])

  return (
    <span className="inline-block min-w-[200px] text-left">
      <span>
        {skills[currentSkill].substring(0, currentChar)}
      </span>
      <span className="animate-pulse ml-1">|</span>
    </span>
  ) 
}

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Lightweight Background */}
      <div className="absolute inset-0 bg-white dark:bg-neutral-900" />
      

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Greeting */}
          <p className="text-lg font-semibold mb-4 text-blue-600 dark:text-blue-200">
            Hey, I'm
          </p>

          {/* Name */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 dark:text-neutral-200 mb-6">
            Himanshu Salunke
          </h1>

          {/* Role with emojis */}
          <div className="text-xl md:text-2xl lg:text-3xl mb-4 font-semibold text-blue-500 dark:text-blue-200">
            <span className="inline-block">😊</span>
            <span className="mx-2">Specialize in </span>
            <TypewriterText text="Python, Machine Learning, Deep Learning, Gen AI" speed={150} />
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl mb-8 max-w-4xl mx-auto leading-relaxed font-medium text-neutral-600 dark:text-neutral-300">
            I'm all about building things that actually work. Whether it's a machine learning model or a simple script, I love the process of turning ideas into reality.
          </p>

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
                  className="w-full sm:w-auto relative overflow-hidden group bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-700"
                >
                  <span className="relative z-10">Explore My Projects</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700"
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
                  className="w-full sm:w-auto relative overflow-hidden group border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white"
                >
                  <span className="relative z-10">My Story</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-10"
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
           <motion.div
             className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 -ml-2"
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
