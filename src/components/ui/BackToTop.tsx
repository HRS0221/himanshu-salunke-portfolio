import { useState, useEffect } from 'react'

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }


  // Set the scroll event listener with throttling for better performance
  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          toggleVisibility()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-[9999] w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
          aria-label="Back to top"
          title="Scroll to top"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto transition-transform duration-300 ease-in-out group-hover:-translate-y-0.5 md:w-5 md:h-5"
          >
            <path
              d="M12 4L12 20M12 4L6 10M12 4L18 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </>
  )
}

export default BackToTop
