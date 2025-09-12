import React, { Suspense, Component } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { Button } from '../ui/Button'
import { ParticleBackground } from './ParticleBackground'



// Custom ErrorBoundary component for React 18 compatibility
interface ErrorBoundaryState {
  hasError: boolean
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback: ReactNode
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

// Animated blob component for 3D background
const AnimatedBlob: React.FC = () => {
  return (
    <Sphere visible args={[1, 100, 200]} scale={2.4}>
      <MeshDistortMaterial
        color="#3b82f6"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0}
      />
    </Sphere>
  )
}

export const Hero: React.FC = () => {
  // Removed scrollToProjects function since recent projects section was removed
  // Removed scrollToContact function since contact is on a separate page

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900" />
      
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <ErrorBoundary fallback={<div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900" />}>
          <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900" />}>
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <AnimatedBlob />
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
            </Canvas>
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* Particle Background */}
      <ErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <ParticleBackground />
        </Suspense>
      </ErrorBoundary>
      
      {/* Animated background elements */}
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
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto]"
              animate={{ backgroundPosition: ['0% 50%', '200% 50%', '0% 50%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
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
              className="bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 bg-clip-text text-transparent bg-[length:200%_auto]"
              animate={{ backgroundPosition: ['0% 50%', '200% 50%', '0% 50%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
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
              className="mx-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent bg-[length:200%_auto]"
              animate={{ backgroundPosition: ['0% 50%', '200% 50%', '0% 50%'] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
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
              className="bg-gradient-to-r from-slate-600 via-gray-600 to-slate-600 bg-clip-text text-transparent bg-[length:200%_auto]"
              animate={{ backgroundPosition: ['0% 50%', '200% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
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
