import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ImageWithShimmer } from './ImageWithShimmer'

interface ProjectGalleryProps {
  images: string[]
  title?: string
  className?: string
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ 
  images, 
  title = 'Project Gallery', 
  className = '' 
}) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  if (!images || images.length === 0) return null

  return (
    <div className={`my-8 ${className}`}>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative group cursor-pointer aspect-video overflow-hidden rounded-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedImage(index)}
          >
            <ImageWithShimmer
              src={image}
              alt={`${title} screenshot ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <motion.div
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </motion.div>
            </div>

            {/* Image number badge */}
            <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
              {index + 1}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-7xl max-h-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Navigation buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : images.length - 1)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setSelectedImage(selectedImage < images.length - 1 ? selectedImage + 1 : 0)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Main image */}
              <ImageWithShimmer
                src={images[selectedImage]}
                alt={`${title} screenshot ${selectedImage + 1}`}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                priority
              />

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {selectedImage + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Compact gallery for smaller spaces
export const CompactProjectGallery: React.FC<ProjectGalleryProps> = ({ 
  images, 
  title = 'Project Gallery', 
  className = '' 
}) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  if (!images || images.length === 0) return null

  return (
    <div className={`my-6 ${className}`}>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {images.slice(0, 4).map((image, index) => (
          <motion.div
            key={index}
            className="relative group cursor-pointer aspect-square overflow-hidden rounded-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedImage(index)}
          >
            <ImageWithShimmer
              src={image}
              alt={`${title} screenshot ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
              <motion.div
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </motion.div>
            </div>

            {/* Show more indicator */}
            {index === 3 && images.length > 4 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  +{images.length - 4} more
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox Modal (same as above) */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-7xl max-h-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Navigation buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : images.length - 1)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setSelectedImage(selectedImage < images.length - 1 ? selectedImage + 1 : 0)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Main image */}
              <ImageWithShimmer
                src={images[selectedImage]}
                alt={`${title} screenshot ${selectedImage + 1}`}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                priority
              />

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {selectedImage + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
