import { useEffect } from 'react'

export const useViewportHeight = () => {
  useEffect(() => {
    const updateHeight = () => {
      // Get the actual viewport height
      const vh = window.innerHeight
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    // Initial calculation
    updateHeight()

    // Update on resize and orientation change
    window.addEventListener('resize', updateHeight)
    window.addEventListener('orientationchange', updateHeight)
    
    // Update on scroll for Safari
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      window.addEventListener('scroll', updateHeight)
    }

    return () => {
      window.removeEventListener('resize', updateHeight)
      window.removeEventListener('orientationchange', updateHeight)
      if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        window.removeEventListener('scroll', updateHeight)
      }
    }
  }, [])
} 