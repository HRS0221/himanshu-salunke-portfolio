import React from 'react'
import { motion } from 'framer-motion'

const MissionValues: React.FC = () => {
  const values = [
    {
      title: "Excellence",
      icon: "🏆",
      description: "I strive for excellence in everything I do, from writing clean code to delivering exceptional user experiences.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Innovation",
      icon: "💡",
      description: "I believe in pushing boundaries and finding creative solutions to complex problems using cutting-edge technology.",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Learning",
      icon: "📚",
      description: "Continuous learning is at the heart of my journey. I'm always exploring new technologies and expanding my knowledge.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Impact",
      icon: "🌍",
      description: "I want to create technology that makes a positive difference in people's lives and contributes to society's betterment.",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Collaboration",
      icon: "🤝",
      description: "I believe in the power of teamwork and enjoy working with others to build something greater than the sum of its parts.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Resilience",
      icon: "💪",
      description: "My personal journey has taught me that resilience and determination can overcome any obstacle in life.",
      color: "from-red-500 to-pink-500"
    }
  ]

  const mission = {
    title: "My Mission",
    content: "To leverage the power of artificial intelligence and data science to solve real-world problems, create innovative solutions, and make technology more accessible and beneficial for everyone. I'm committed to continuous learning, ethical development practices, and building a future where technology serves humanity's greatest needs.",
    goals: [
      "Develop AI solutions that address real-world challenges",
      "Contribute to open-source projects and the tech community",
      "Mentor others and share knowledge through writing and teaching",
      "Build ethical and responsible AI systems",
      "Create technology that improves people's lives"
    ]
  }

  return (
    <motion.section
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
          <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
            Mission & Values
          </span>
        </h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
          The principles that guide my work and the mission that drives my passion for technology.
        </p>
      </div>

      {/* Mission Statement */}
      <motion.div
        className="mb-12 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8 border border-primary-200 dark:border-primary-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="text-center mb-6">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            {mission.title}
          </h3>
        </div>
        
        <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6 text-center">
          {mission.content}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mission.goals.map((goal, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-3 p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <div className="text-primary-600 dark:text-primary-400 text-lg">✓</div>
              <span className="text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                {goal}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {values.map((value, index) => (
          <motion.div
            key={value.title}
            className="group relative bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700 hover:shadow-xl transition-all duration-300 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="text-center mb-4">
                <div className="text-4xl mb-3">{value.icon}</div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                  {value.title}
                </h3>
              </div>
              
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-center">
                {value.description}
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-primary-100/30 to-transparent dark:from-primary-800/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        ))}
      </div>

      {/* Personal Philosophy */}
      {/* <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8 border border-primary-200 dark:border-primary-800">
          <div className="text-3xl mb-4">💭</div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
            Personal Philosophy
          </h3>
          <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-4xl mx-auto">
            "Technology should be a force for good. Every line of code I write, every algorithm I design, 
            and every solution I create should ultimately serve to make the world a better place. 
            I believe in building with purpose, learning with passion, and growing with integrity."
          </p>
        </div>
      </motion.div> */}
    </motion.section>
  )
}

export default MissionValues
