'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import { Bebas_Neue } from 'next/font/google'
import OfferSection from '@/components/OfferSection'
import VideoSection from '@/components/VideoSection'
import CardSection from '@/components/CardSection'
import ScoreSection from '@/components/ScoreSection'
import DownloadSection from '@/components/DownloadSection'
import Footer from '@/components/Footer'
import { useEffect } from 'react'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function Home() {
  useEffect(() => {
    // Function to handle Safari's dynamic viewport
    const handleSafariViewport = () => {
      // Get the visible viewport height
      const vh = window.innerHeight;
      // Get the maximum viewport height (without Safari UI)
      const maxVh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      
      // Set both values as CSS variables
      document.documentElement.style.setProperty('--vh', `${vh * 0.01}px`);
      document.documentElement.style.setProperty('--max-vh', `${maxVh * 0.01}px`);
      
      // Force reflow to handle Safari's elastic scroll
      document.body.style.height = `${maxVh}px`;
      requestAnimationFrame(() => {
        document.body.style.height = '';
      });
    };

    // Initial call
    handleSafariViewport();

    // Add event listeners with debounce
    let timeoutId: NodeJS.Timeout;
    const handleViewportChange = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleSafariViewport, 100);
    };

    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('orientationchange', handleViewportChange);
    window.addEventListener('scroll', handleViewportChange, { passive: true });

    return () => {
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('orientationchange', handleViewportChange);
      window.removeEventListener('scroll', handleViewportChange);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <main 
      className="relative bg-[#1A1E1C]"
      style={{ 
        minHeight: 'calc(var(--max-vh, 1vh) * 100)',
        height: 'calc(var(--vh, 1vh) * 100)',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      <Image 
        src="/assets/PageThread.png"
        alt="Background Thread"
        fill
        className="object-cover object-top opacity-50 fixed"
        style={{ transform: 'scale(1)', transformOrigin: 'top' }}
        priority
      />
      
      <div className="relative">
        <Navbar />
        
        {/* Desktop Hero */}
        <div className="hidden lg:flex max-w-[1440px] mx-auto px-4 md:px-8 lg:px-32 min-h-screen items-center">
          <div className="flex flex-row gap-0">
            {/* Left Content */}
            <motion.div 
              className="max-w-[600px] px-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className={`${bebasNeue.className} text-7xl leading-tight text-white mb-6`}>
                Decide your own credit; control your limits!
              </h1>
              <p className="text-[#ADB2B1] text-xl leading-relaxed">
                Discover the power of our <span className="text-[#FFD700]">SECURED CREDIT CARDS WITH REWARDS</span>. 
                Explore our range of credit cards and take control of your finances today.
              </p>
            </motion.div>

            {/* Right Content - Restored original positioning */}
            <motion.div 
              className="relative w-[140%] -mr-[80%] h-auto overflow-visible -mt-16"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Background Blur */}
              <div className="absolute right-[-20%] top-1/2 -translate-y-1/2 w-[100%] h-[200px] bg-[#979797] blur-[800px]" />
              
              {/* Phone - Restored original positioning */}
              <motion.div
                className="absolute left-[70%] -top-[10%] z-10 w-[40%]"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
              >
                <Image 
                  src="/assets/HeroPhoneFinal.png"
                  alt="Hero Phone"
                  width={1800}
                  height={1800}
                  priority
                  className="w-full h-auto scale-150"
                  unoptimized
                />
              </motion.div>

              {/* Card - Restored original positioning */}
              <motion.div
                className="absolute left-[10%] -top-[0%] z-20 w-[100%]"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
              >
                <Image 
                  src="/assets/HeroCard.png"
                  alt="Hero Card"
                  width={3000}
                  height={1876}
                  priority
                  className="w-full h-auto"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Mobile Hero */}
        <div className="lg:hidden max-w-[1440px] mx-auto px-4 min-h-[calc(100vh-80px)] flex items-center">
          <div className="flex flex-col gap-8 pt-20 w-full">
            {/* Mobile Images */}
            <motion.div 
              className="relative w-full h-[260px]"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Background Blur */}
              <div className="absolute right-[-20%] top-1/2 -translate-y-1/2 w-[100%] h-[200px] bg-[#979797] blur-[800px]" />
              
              {/* Phone */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 -top-[20px] z-10 w-[120px]"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
              >
                <Image 
                  src="/assets/HeroPhoneFinal.png"
                  alt="Hero Phone"
                  width={1800}
                  height={1800}
                  priority
                  className="w-full h-auto scale-125"
                  unoptimized
                />
              </motion.div>

              {/* Card */}
              <motion.div
                className="absolute left-[10%] -translate-x-1/2 top-[40px] z-20 w-[250px]"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
              >
                <Image 
                  src="/assets/HeroCard.png"
                  alt="Hero Card"
                  width={3000}
                  height={1876}
                  priority
                  className="w-full h-auto"
                />
              </motion.div>
            </motion.div>

            {/* Mobile Content */}
            <motion.div 
              className="w-full px-2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className={`${bebasNeue.className} text-3xl sm:text-4xl leading-tight text-white mb-4 text-center`}>
                Decide your own credit; control your limits!
              </h1>
              <p className="text-[#ADB2B1] text-sm sm:text-base leading-relaxed text-center">
                Discover the power of our <span className="text-[#FFD700]">SECURED CREDIT CARDS WITH REWARDS</span>. 
                Explore our range of credit cards and take control of your finances today.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="relative">
          <VideoSection />
          <div className="relative" style={{ zIndex: 2 }}>
            <CardSection />
          </div>
          <div className="relative" style={{ zIndex: 1 }}>
            <ScoreSection />
            <OfferSection />
            <DownloadSection />
            <Footer />
          </div>
        </div>
      </div>
    </main>
  )
}
