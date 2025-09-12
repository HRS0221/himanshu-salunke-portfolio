import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useKeyboardNavigation } from '../accessibility/KeyboardNavigation'

interface ProjectImageCarouselProps {
  images: string[]
  isOpen: boolean
  onClose: () => void
  initialIndex?: number
  title?: string
}

export const ProjectImageCarousel: React.FC<ProjectImageCarouselProps> = ({
  images,
  isOpen,
  onClose,
  initialIndex = 0,
  title = 'Project Images'
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isLoading, setIsLoading] = useState(true)

  const { focusedIndex, setFocusedIndex } = useKeyboardNavigation()

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          goToPrevious()
          break
        case 'ArrowRight':
          e.preventDefault()
          goToNext()
          break
        case 'Escape':
          e.preventDefault()
          onClose()
          break
        case 'Home':
          e.preventDefault()
          goToSlide(0)
          break
        case 'End':
          e.preventDefault()
          goToSlide(images.length - 1)
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, goToNext, goToPrevious, goToSlide, onClose, images.length])

  // Focus management
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Focus the modal when it opens
      const modal = document.getElementById('image-carousel-modal')
      modal?.focus()
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Reset index when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex)
      setIsLoading(true)
    }
  }, [isOpen, initialIndex])

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        id="image-carousel-modal"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose()
          }
        }}
      >
        {/* Close Button */}
        <motion.button
          className="absolute top-4 right-4 z-10 p-2 text-white hover:bg-white/20 rounded-full transition-colors"
          onClick={onClose}
          aria-label="Close image carousel"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>

        {/* Image Counter */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/50 text-white rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Main Image Container */}
        <div className="relative w-full h-full max-w-7xl max-h-[90vh] mx-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="relative w-full h-full flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {/* Loading Spinner */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
              )}

              {/* Image */}
              <motion.img
                src={images[currentIndex]}
                alt={`${title} - Image ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain"
                onLoad={handleImageLoad}
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoading ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              {/* Previous Button */}
              <motion.button
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white hover:bg-white/20 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={goToPrevious}
                aria-label="Previous image"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>

              {/* Next Button */}
              <motion.button
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white hover:bg-white/20 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={goToNext}
                aria-label="Next image"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </>
          )}
        </div>

        {/* Thumbnail Navigation */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 max-w-full overflow-x-auto px-4">
            {images.map((image, index) => (
              <motion.button
                key={index}
                className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex
                    ? 'border-white scale-110'
                    : 'border-white/50 hover:border-white/80'
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to image ${index + 1}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {index === currentIndex && (
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        )}

        {/* Keyboard Instructions */}
        <div className="absolute bottom-4 right-4 text-white/70 text-xs hidden md:block">
          <div>← → Navigate</div>
          <div>ESC Close</div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

interface ImageGalleryProps {
  images: string[]
  title?: string
  className?: string
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  title = 'Project Images',
  className = ''
}) => {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const openCarousel = (index: number) => {
    setSelectedIndex(index)
    setIsCarouselOpen(true)
  }

  return (
    <>
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
        {images.map((image, index) => (
          <motion.button
            key={index}
            className="relative aspect-square rounded-lg overflow-hidden group"
            onClick={() => openCarousel(index)}
            aria-label={`View ${title} - Image ${index + 1}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src={image}
              alt={`${title} - Image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <motion.div
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
              >
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </motion.div>
            </div>
          </motion.button>
        ))}
      </div>

      <ProjectImageCarousel
        images={images}
        isOpen={isCarouselOpen}
        onClose={() => setIsCarouselOpen(false)}
        initialIndex={selectedIndex}
        title={title}
      />
    </>
  )
}
