'use client'

import React from 'react'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { Bebas_Neue } from 'next/font/google'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

// Update the CardInfo type to include image path
type CardInfo = {
  id: number
  name: string
  nameColor: string
  features: string[]
  image: string
}

// Update the cards array with image paths
const cards: CardInfo[] = [
  {
    id: 1,
    name: "BUILD",
    nameColor: "white",
    image: "/assets/crdxcard1.png",
    features: [
      "Add Money to start your Credit limit from £300",
      "0% interest unless you want to pay in installments in that case 29.8% representative APR (Fixed)",
      "No international fees",
      "No ATM fees",
      "£0 subscription fee"
    ]
  },
  {
    id: 2,
    name: "REPAIR",
    nameColor: "white",
    image: "/assets/crdxcard2.png",
    features: [
      "Add Money to start your Credit limit from £500",
      "0% interest unless you want to pay in installments in that case 29.8% representative APR (Fixed)",
      "No international fees",
      "No ATM fees",
      "£5 subscription fee"
    ]
  },
  {
    id: 3,
    name: "DUAL",
    nameColor: "white",
    image: "/assets/crdxcard3.png",
    features: [
      "Add Money to start your Credit limit from £500",
      "0% interest unless you want to pay in installments in that case 29.8% representative APR (Fixed)",
      "No international fees",
      "No ATM fees",
      "£15 subscription fee",
      "Gadget Insurance",
      "Purchase Protection Insurance",
      "Deals and Vouchers"
    ]
  },
  {
    id: 4,
    name: "AVANGUARD",
    nameColor: "white",
    image: "/assets/crdxcard4.png",
    features: [
      "Add Money to start your Credit limit from £500",
      "0% interest unless you want to pay in installments in that case 29.8% representative APR (Fixed)",
      "No international fees",
      "No ATM fees",
      "£25 subscription fee",
      "Travel Insurance",
      "Gadget Insurance",
      "Purchase Protection Insurance",
      "Cancellation Protection Insurance",
      "Deals and Vouchers"
    ]
  }
]

// Add this new type for feature slides
type FeatureSlide = {
  features: string[]
}

export default function CardSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [selectedCard, setSelectedCard] = useState(cards[0])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [totalSlides, setTotalSlides] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger)
    }
    
    const section = sectionRef.current
    const cardElements = document.querySelectorAll('.card-item')
    const totalCards = cardElements.length

    if (!section || !cardElements.length) return

    // Initial stack setup - BUILD on top
    gsap.set(cardElements, {
      x: 0,
      opacity: 1,
      force3D: true,
      transformOrigin: 'bottom left',
      immediateRender: true,
      transformPerspective: 1000,
      backfaceVisibility: 'hidden',
      willChange: 'transform'
    })

    const setupCards = () => {
      cardElements.forEach((card, index) => {
        gsap.set(card, {
          rotation: index === 0 ? 0 : -(index * 8),
          scale: 1 - (index * 0.05),
          zIndex: totalCards - index,
        })
      })
    }

    setupCards()

    const handleResize = () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      setupCards()
      initScrollTrigger()
    }

    const initScrollTrigger = () => {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=200%",
          pin: true,
          pinSpacing: true,
          pinReparent: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          scrub: 1,
          fastScrollEnd: true,
          onEnterBack: () => ScrollTrigger.refresh(),
          onLeaveBack: () => ScrollTrigger.refresh(),
          onUpdate: (self) => {
            const progress = Math.max(0, Math.min(self.progress * 1.1, 0.99))
            const currentIndex = Math.floor(progress * (totalCards - 0.01))
            const isReversing = self.getVelocity() < 0
            
            if (currentIndex >= 0 && currentIndex < totalCards) {
              setSelectedCard(cards[currentIndex])

              cardElements.forEach((card, i) => {
                gsap.set(card, {
                  zIndex: isReversing ? 
                    (i >= currentIndex ? totalCards + (totalCards - i) : i) :
                    (i <= currentIndex ? totalCards - (currentIndex - i) : totalCards - (i - currentIndex))
                })
              })

              gsap.to(cardElements, {
                x: i => i < currentIndex ? -window.innerWidth : 0,
                opacity: 1,
                rotation: i => {
                  if (i < currentIndex) return 8
                  if (i === currentIndex) return 0
                  return -(i - currentIndex) * 8
                },
                scale: i => {
                  if (i < currentIndex) return 0.95
                  if (i === currentIndex) return 1
                  return 1 - ((i - currentIndex) * 0.05)
                },
                duration: 0.2,
                ease: "none",
                overwrite: true
              })
            }
          }
        })
      })

      return () => ctx.revert()
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    const cleanup = initScrollTrigger()

    return () => {
      cleanup()
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Update the getFeatureSlides function to handle server-side rendering
  const getFeatureSlides = (features: string[]): FeatureSlide[] => {
    const slides: FeatureSlide[] = []
    
    // Fixed heights for other elements in the card
    const headerHeight = 140  // Height for title + card name + padding
    const dotsHeight = 24    // Height for navigation dots + margin
    const verticalPadding = 32 // Total vertical padding
    
    // Calculate available height for features - safely handle window access
    const totalCardHeight = typeof window !== 'undefined' 
      ? window.innerHeight * 0.6 - 80 
      : 600 // Default height for SSR
    const availableHeight = totalCardHeight - (headerHeight + dotsHeight + verticalPadding)
    
    // Calculate how many features can fit in one slide
    const singleFeatureHeight = 56 // Height of single feature including margin
    const featuresPerSlide = Math.max(2, Math.floor(availableHeight / singleFeatureHeight))
    
    // Split features into slides
    for (let i = 0; i < features.length; i += featuresPerSlide) {
      slides.push({
        features: features.slice(i, i + featuresPerSlide)
      })
    }
    
    return slides
  }

  // Add useEffect to handle dynamic slide adjustment
  useEffect(() => {
    const handleResize = () => {
      const features = selectedCard.features
      setTotalSlides(getFeatureSlides(features).length)
      setCurrentSlide(0) // Reset to first slide on resize
    }

    handleResize() // Initial call
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [selectedCard])

  // Update the scroll handling functions
  const handleScrollEnd = (container: HTMLElement) => {
    const slideWidth = container.clientWidth * 0.85 + 16 // width + margin
    const maxScroll = container.scrollWidth - container.clientWidth
    let targetScroll = Math.round(container.scrollLeft / slideWidth) * slideWidth
    
    // Ensure we don't scroll beyond bounds
    targetScroll = Math.max(0, Math.min(targetScroll, maxScroll))
    
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    })
  }

  // Add scroll end detection
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout
    const container = document.querySelector('.overflow-x-scroll')

    const handleScroll = (e: Event) => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        if (container instanceof HTMLElement) {
          handleScrollEnd(container)
        }
      }, 150)
    }

    if (container) {
      container.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
      clearTimeout(scrollTimeout)
    }
  }, [selectedCard])

  return (
    <>
      {/* Info Cards Section */}
      <section className="w-full py-10 lg:py-20 mt-20 lg:mt-40">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-32">
          <div className="grid grid-cols-1 md:grid-cols-10 gap-6 lg:gap-8">
            {/* Card 1 - Wider */}
            <motion.div 
              className="md:col-span-4 space-y-6 flex flex-col items-center lg:items-start"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="relative w-24 h-24"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="/assets/setbudget.png"
                  alt="Set Budget"
                  fill
                  className="object-contain"
                />
              </motion.div>
              <motion.div 
                className="p-6 rounded-3xl w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(217, 217, 217, 0.37) 0%, rgba(115, 115, 115, 0) 100%)',
                  backdropFilter: 'blur(75px)'
                }}
              >
                <h3 className={`${bebasNeue.className} text-2xl text-[#FFD700] mb-4`}>
                  Decide your credit balance
                </h3>
                <p className="text-white text-base leading-relaxed">
                  As soon as you download the CREDIXIO APP we will ask you how much do you want to top up and add to your Credit Card, we know is a weird question but there's no trick you will decide we will advice
                </p>
              </motion.div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              className="md:col-span-3 space-y-6 flex flex-col items-center lg:items-start"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div 
                className="relative w-24 h-24"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="/assets/addmoney.png"
                  alt="Add Money"
                  fill
                  className="object-contain"
                />
              </motion.div>
              <motion.div 
                className="p-6 rounded-3xl w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(217, 217, 217, 0.37) 0%, rgba(115, 115, 115, 0) 100%)',
                  backdropFilter: 'blur(75px)'
                }}
              >
                <h3 className={`${bebasNeue.className} text-2xl text-[#FFD700] mb-4`}>
                  add money
                </h3>
                <p className="text-white text-base leading-relaxed">
                  Connect as many accounts and debit cards as you want and add your pot money to the CreditCard and the DD Account
                </p>
              </motion.div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              className="md:col-span-3 space-y-6 flex flex-col items-center lg:items-start"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div 
                className="relative w-24 h-24"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="/assets/getstarted.png"
                  alt="Get Started"
                  fill
                  className="object-contain"
                />
              </motion.div>
              <motion.div 
                className="p-6 rounded-3xl w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(217, 217, 217, 0.37) 0%, rgba(115, 115, 115, 0) 100%)',
                  backdropFilter: 'blur(75px)'
                }}
              >
                <h3 className={`${bebasNeue.className} text-2xl text-[#FFD700] mb-4`}>
                  get started
                </h3>
                <p className="text-white text-base leading-relaxed">
                  Your basic account and Build Credit Card are ready as soon as you sign up. For extra perks, choose a premium card with customizable benefits
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Card Animation Section */}
      <section 
        ref={sectionRef} 
        id="card" 
        className="w-full relative h-screen z-10"
        style={{
          touchAction: 'pan-y',
          overscrollBehavior: 'contain',
          willChange: 'transform'
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-[1440px] w-full px-4 md:px-8 lg:px-32">
            <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-12 pt-[80px] lg:pt-0">
              {/* Left Side - Card Stack */}
              <div className="lg:w-1/2 h-[200px] lg:h-[600px] flex items-center justify-center relative">
                <div ref={cardsRef} className="relative w-[250px] lg:w-[400px] h-[200px] lg:h-[600px] z-20 mx-auto">
                  {cards.map((card) => (
                    <div
                      key={card.id}
                      className="card-item absolute inset-0 w-full h-full"
                      style={{
                        transformOrigin: 'bottom left',
                        willChange: 'transform',
                        backfaceVisibility: 'hidden',
                        perspective: 1000,
                        WebkitFontSmoothing: 'antialiased',
                        position: 'absolute'
                      }}
                    >
                      <Image
                        src={card.image}
                        alt={`CRDX ${card.name} Card`}
                        fill
                        className="object-contain"
                        priority={card.id === selectedCard.id}
                        loading="eager"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side - Card Info */}
              <div className="lg:w-1/2 min-h-[300px] h-[calc(60vh-80px)] lg:h-[600px] flex items-start lg:items-center">
                <motion.div 
                  className="p-4 pt-5 sm:pt-6 lg:p-8 rounded-3xl w-full z-10 h-full max-w-[90vw] mx-auto flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  key={selectedCard.id}
                  style={{
                    background: 'linear-gradient(135deg, rgba(217, 217, 217, 0.37) 0%, rgba(115, 115, 115, 0) 100%)',
                    backdropFilter: 'blur(75px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {/* Fixed Header - Updated padding */}
                  <div className="mb-4 lg:mb-4 flex-shrink-0 pt-1 sm:pt-2">
                    <h2 className={`${bebasNeue.className} text-2xl lg:text-4xl text-white mb-2 lg:mb-6`}>
                      Find the Perfect Credit Card for You
                    </h2>
                    <h3 className={`${bebasNeue.className} text-xl lg:text-2xl`}>
                      <span className="text-[#FFD700]">CRDX</span>
                      <span className="text-white">{selectedCard.name}</span>
                    </h3>
                  </div>

                  {/* Desktop Content remains unchanged */}
                  <div className="hidden lg:block overflow-y-auto pr-6 flex-1">
                    <motion.ul 
                      className="space-y-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {selectedCard.features.map((feature, index) => (
                        <li key={index} className="text-white leading-relaxed">
                          {feature}
                        </li>
                      ))}
                    </motion.ul>
                  </div>

                  {/* Mobile Carousel Content */}
                  <div className="lg:hidden flex-1 flex flex-col" style={{ height: 'calc(100% - 120px)' }}>
                    <div className="mobile-features-container flex-1 min-h-0">
                      {isClient && (
                        <div 
                          className="h-full overflow-x-scroll hide-scrollbar"
                          style={{
                            WebkitOverflowScrolling: 'touch',
                            scrollSnapType: 'x mandatory',
                            scrollBehavior: 'smooth'
                          }}
                          onScroll={(e) => {
                            const container = e.currentTarget
                            const slideWidth = container.clientWidth * 0.85 + 16
                            const newSlide = Math.round(container.scrollLeft / slideWidth)
                            if (newSlide !== currentSlide) {
                              setCurrentSlide(newSlide)
                            }
                          }}
                        >
                          <div className="flex h-full">
                            {getFeatureSlides(selectedCard.features).map((slide, slideIndex) => (
                              <div 
                                key={slideIndex}
                                className="flex-none w-[85%] space-y-2 px-1 mr-4"
                                style={{
                                  scrollSnapAlign: 'center'
                                }}
                              >
                                {slide.features.map((feature, featureIndex) => (
                                  <div 
                                    key={featureIndex}
                                    className="text-white text-sm sm:text-base leading-relaxed p-3 rounded-xl"
                                    style={{
                                      background: 'linear-gradient(135deg, rgba(217, 217, 217, 0.1) 0%, rgba(115, 115, 115, 0) 100%)'
                                    }}
                                  >
                                    {feature}
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Navigation Dots - Only show on client side */}
                    {isClient && getFeatureSlides(selectedCard.features).length > 1 && (
                      <div className="flex-shrink-0 flex justify-center gap-1.5 mt-2">
                        {getFeatureSlides(selectedCard.features).map((_, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              const container = document.querySelector('.overflow-x-scroll')
                              if (container instanceof HTMLElement) {
                                const slideWidth = container.clientWidth * 0.85 + 16
                                const targetScroll = index * slideWidth
                                const maxScroll = container.scrollWidth - container.clientWidth
                                
                                container.scrollTo({
                                  left: Math.min(targetScroll, maxScroll),
                                  behavior: 'smooth'
                                })
                                setCurrentSlide(index)
                              }
                            }}
                            className={`w-1.5 h-1.5 rounded-full transition-colors ${
                              currentSlide === index ? 'bg-[#FFD700]' : 'bg-white/30'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
