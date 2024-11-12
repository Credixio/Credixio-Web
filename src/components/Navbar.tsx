'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { offerItems } from './OfferSection' // Import offerItems

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  // Function to handle offer section navigation
  const scrollToOffer = (offerId: number) => {
    const offerSection = document.getElementById('offering')
    if (offerSection) {
      offerSection.scrollIntoView({ behavior: 'smooth' })
      
      setTimeout(() => {
        // For mobile carousel
        const container = document.querySelector('.overflow-x-scroll')
        if (container) {
          const index = offerItems.findIndex(item => item.id === offerId)
          if (index !== -1) {
            const cardWidth = container.clientWidth * 0.85 // 85vw
            const gap = 16 // gap-4
            container.scrollTo({
              left: index * (cardWidth + gap),
              behavior: 'smooth'
            })
          }
        }
        
        // For desktop
        window.dispatchEvent(new CustomEvent('setOffer', { detail: offerId }))
      }, 800)
    }
    setIsMenuOpen(false)
  }

  // Function to handle smooth scroll to sections
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false) // Close mobile menu after click
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1440px] z-50">
      <style jsx global>{`
        .nav-glass {
          background: linear-gradient(135deg, rgba(50, 50, 50, 0.8) 0%, rgba(30, 30, 30, 0.9) 100%);
          backdrop-filter: blur(75px);
          -webkit-backdrop-filter: blur(75px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .mobile-menu-glass {
          background: linear-gradient(135deg, rgba(50, 50, 50, 0.8) 0%, rgba(30, 30, 30, 0.9) 100%);
          backdrop-filter: blur(75px);
          -webkit-backdrop-filter: blur(75px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>

      <motion.div 
        className="mx-auto relative"
        animate={{
          width: scrolled ? '85%' : '95%',
          top: scrolled ? '1rem' : '0',
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        <nav 
          className={`relative flex items-center justify-between py-4 px-8 transition-all duration-500 ${
            scrolled ? 'rounded-full nav-glass' : ''
          }`}
        >
          <button 
            onClick={scrollToTop}
            className="cursor-pointer"
          >
            <Image 
              src="/assets/logo.png" 
              alt="Logo" 
              width={120}
              height={42}
              className="object-contain"
            />
          </button>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-16">
            <Link 
              href="#card" 
              className="text-[#FFD700] text-lg hover:text-[#FFE55C] transition-colors"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('card')
              }}
            >
              CRDX Cards
            </Link>
            <Link 
              href="#score" 
              className="text-[#FFD700] text-lg hover:text-[#FFE55C] transition-colors"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('score')
              }}
            >
              CRDX Score
            </Link>
            <Link 
              href="#offering" 
              className="text-[#FFD700] text-lg hover:text-[#FFE55C] transition-colors"
              onClick={(e) => {
                e.preventDefault()
                scrollToOffer(4) // ID for Perks and Deals
              }}
            >
              CRDX Deals
            </Link>
            <Link 
              href="#offering" 
              className="text-[#FFD700] text-lg hover:text-[#FFE55C] transition-colors"
              onClick={(e) => {
                e.preventDefault()
                scrollToOffer(1) // ID for CRDX Cards section
              }}
            >
              Why CRDX
            </Link>
          </div>

          <button className="hidden lg:block bg-transparent border-2 border-[#FFD700] text-[#FFD700] px-8 py-3 rounded-full text-lg font-medium hover:bg-[#FFD700]/10 transition-colors">
            Pre-register now
          </button>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-[#FFD700] p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu - Moved outside nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="absolute top-full left-0 right-0 mt-4 py-8 px-4 lg:hidden rounded-3xl mobile-menu-glass"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col items-center gap-6 max-w-[400px] mx-auto">
                <Link 
                  href="#card" 
                  className="text-[#FFD700] text-lg hover:text-[#FFE55C] transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('card')
                  }}
                >
                  CRDX Cards
                </Link>
                <Link 
                  href="#score" 
                  className="text-[#FFD700] text-lg hover:text-[#FFE55C] transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('score')
                  }}
                >
                  CRDX Score
                </Link>
                <Link 
                  href="#offering" 
                  className="text-[#FFD700] text-lg hover:text-[#FFE55C] transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToOffer(4)
                  }}
                >
                  CRDX Deals
                </Link>
                <Link 
                  href="#offering" 
                  className="text-[#FFD700] text-lg hover:text-[#FFE55C] transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToOffer(1)
                  }}
                >
                  Why CRDX
                </Link>
                <button className="bg-transparent border-2 border-[#FFD700] text-[#FFD700] px-8 py-3 rounded-full text-lg font-medium hover:bg-[#FFD700]/10 transition-colors w-full max-w-[250px]">
                  Pre-register now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  )
}
