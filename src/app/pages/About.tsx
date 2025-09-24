import React from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Profile } from '../../components/about/Profile'
import { Timeline } from '../../components/about/Timeline'
import { Achievements } from '../../components/about/Achievements'
import { Credentials } from '../../components/about/Credentials'
import { CurrentlyLearning } from '../../components/about/CurrentlyLearning'
import { ShortTermGoals } from '../../components/about/ShortTermGoals'
import PersonalStory from '../../components/about/PersonalStory'
import MissionValues from '../../components/about/MissionValues'
import PersonalInterests from '../../components/about/PersonalInterests'

const About: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About - Himanshu's Portfolio</title>
        <meta name="description" content="Learn more about Himanshu's background, skills, and experience as an AI/ML Engineer and Full-Stack Developer." />
        <meta property="og:title" content="About - Himanshu's Portfolio" />
        <meta property="og:description" content="Learn more about Himanshu's background, skills, and experience as an AI/ML Engineer and Full-Stack Developer." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About - Himanshu's Portfolio" />
        <meta name="twitter:description" content="Learn more about Himanshu's background, skills, and experience as an AI/ML Engineer and Full-Stack Developer." />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Himanshu",
            "jobTitle": "AI/ML Engineer & Full-Stack Developer",
            "description": "AI/ML Engineer and Full-Stack Developer passionate about creating intelligent solutions",
            "url": "https://portfolio.example.com/about",
            "sameAs": [
              "https://github.com/himanshu",
              "https://linkedin.com/in/himanshu",
              "https://twitter.com/himanshu"
            ],
            "knowsAbout": [
              "React",
              "TypeScript",
              "Python",
              "Machine Learning",
              "Artificial Intelligence",
              "Web Development"
            ],
            "hasCredential": [
              {
                "@type": "EducationalOccupationalCredential",
                "name": "AWS Certified Solutions Architect",
                "credentialCategory": "certification"
              },
              {
                "@type": "EducationalOccupationalCredential", 
                "name": "Google Cloud Machine Learning Engineer",
                "credentialCategory": "certification"
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Profile />
          <PersonalStory />
          <MissionValues />
          <Timeline />
          <Achievements />
          <Credentials />
          <PersonalInterests /> 
          <CurrentlyLearning />
          <ShortTermGoals />
          
          {/* Inspirational Quote */}
          <motion.section
            className="mt-16 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8 border border-primary-200 dark:border-primary-800 text-center">
              <div className="text-3xl mb-4">💪</div>
              <blockquote className="text-xl italic text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed max-w-4xl mx-auto">
                "Every setback is a setup for a comeback. The challenges I've faced have only made me stronger, more determined, and more passionate about using technology to create positive change."
              </blockquote>
              <footer className="text-sm text-neutral-500 dark:text-neutral-400">
                — Himanshu Kishor Salunke
              </footer>
            </div>
          </motion.section>
        </div>
      </div>
    </>
  )
}

export default About
