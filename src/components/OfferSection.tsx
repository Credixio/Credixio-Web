'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Bebas_Neue } from 'next/font/google'
import { motion, AnimatePresence } from 'framer-motion'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

type OfferItem = {
  id: number
  title: string
  icon: string
  content: {
    subheading1: string
    body1: string
    subheading2: string
    benefits: string[]
    body2: string
  }
  image: string
  gridItems?: {
    icon: string
    text: string
  }[]
}

// Export offerItems
export const offerItems: OfferItem[] = [
  {
    id: 1,
    title: "CRDX CARDS",
    icon: "/assets/icon1.png",
    content: {
      subheading1: "Build Your Credit with Your Own Money – No More Rejections or Credit Shame",
      body1: "Whether you're just starting out, rebuilding your credit, or aiming to boost your financial health, Credixio Secured Credit Cards are here to help you reach your goals. With Credixio, you can use your own funds to establish and grow your credit profile, all while enjoying peace of mind.",
      subheading2: "Key Benefits:",
      benefits: [
        "Zero interest on purchases",
        "NO international fees",
        "Travel insurance coverage"
      ],
      body2: "Flexible options from no-fee to premium cards. Choose a smarter, hassle-free way to build credit with Credixio – and take control of your financial future."
    },
    image: "/assets/crdxcards.png"
  },
  {
    id: 2,
    title: "Direct Debit Balances",
    icon: "/assets/icon2.png",
    content: {
      subheading1: "CREDIXIO Credit DD Account – Build Credit on Every Direct Debit",
      body1: "For those payments that don't accept credit cards, the Credixio Secured Credit Account for Direct Debits is your solution. Pay recurring expenses like utilities, rent, and subscriptions while building your credit profile with every payment.",
      subheading2: "How it works:",
      benefits: [
        "Set up your monthly budget and payments in the Credixio DD Account.",
        "Enjoy automated, on-time direct debit payments—no more late payments or fees.",
        "Each payment strengthens your credit score with reporting to credit bureaus."
      ],
      body2: "With essential protections like payment insurance, budget tracking, and credit progress monitoring in the Credixio app, you're empowered to make smart, informed financial decisions while keeping your payments stress-free.\n\nCredixio – Security, Convenience, and Credit Growth, all in one."
    },
    image: "/assets/directdebit.png"
  },
  {
    id: 3,
    title: "Credit scoring improvements",
    icon: "/assets/icon3.png",
    content: {
      subheading1: "CREDIXIO Score Report – Boost Your Credit with Every Smart Choice",
      body1: "Every month, Credixio reports your on-time payments, responsible shopping, and overall financial progress to the credit bureau, helping you build a stronger credit profile and better financial opportunities.",
      subheading2: "Key Steps to Success:",
      benefits: [
        "Keep your personal data up-to-date.",
        "Open and manage your credit bureau profile with ***********.",
        "Get expert advice at our Credixio Credit Clinics.",
        "Follow credit bureau recommendations and maintain healthy account habits."
      ],
      body2: "By paying back and topping up your Credixio accounts and cards at month's end, you'll see your score climb, opening doors to better deals on mortgages, affordable rent, utility plans, phone contracts, grocery subscriptions, car financing, insurance, and more.\n\nWith Credixio, build your credit and your future with ease."
    },
    image: "/assets/creditscore.png"
  },
  {
    id: 4,
    title: "Perks and deals",
    icon: "/assets/icon4.png",
    content: {
      subheading1: "Only pick and choose the deals that are best for you",
      body1: "",
      subheading2: "",
      benefits: [],
      body2: ""
    },
    image: "/assets/placeholder.png",
    // Add new grid items property
    gridItems: [
      {
        icon: "/assets/travelinsurance.png",
        text: "Travel Insurance"
      },
      {
        icon: "/assets/gymmembersdeal.png",
        text: "Gym Members Deal"
      },
      {
        icon: "/assets/cancellationprotection.png",
        text: "Cancellation Protection"
      },
      {
        icon: "/assets/gadgetinsurance.png",
        text: "Gadget Insurance"
      },
      {
        icon: "/assets/purchaseprotection.png",
        text: "Purchase Protection"
      },
      {
        icon: "/assets/socialmedia.png",
        text: "Social Media"
      }
    ]
  },
  {
    id: 5,
    title: "Cashbacks",
    icon: "/assets/icon5.png",
    content: {
      subheading1: "CASHBACK REWARDS – Earn More on Every Purchase",
      body1: "Discover your exclusive cashback with our easy-to-use cashback calculator, where you can earn between 1-3% cashback on everyday purchases. Plus, enjoy a voucher wallet packed with 30-40% discount deals, giving you even more value.",
      subheading2: "With Credixio, you're not just building credit—you're saving as you spend.",
      benefits: [], // Empty array since there are no bullet points
      body2: "" // Empty string since there's no additional body text
    },
    image: "/assets/cashback.png"
  }
]

// Add this new component for the scroll indicator
const ScrollIndicator = () => (
  <motion.div 
    className="absolute bottom-4 right-4 w-6 h-12 rounded-full border-2 border-[#FFD700] hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <motion.div
      className="w-1.5 h-1.5 bg-[#FFD700] rounded-full mx-auto mt-2"
      animate={{
        y: [0, 16, 0],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  </motion.div>
)

export default function OfferSection() {
  const [selectedOffer, setSelectedOffer] = useState<OfferItem>(offerItems[0])
  const [direction, setDirection] = useState(0)
  const [currentMobileCard, setCurrentMobileCard] = useState(0)

  // Add this state to track if content is scrollable
  const [isScrollable, setIsScrollable] = useState(false)

  // Add this state at the top of the component
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)

  // Add this state to track if user has scrolled for each card
  const [scrolledCards, setScrolledCards] = useState<number[]>([])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    const currentIndex = offerItems.findIndex(item => item.id === selectedOffer.id)
    let nextIndex = currentIndex + newDirection
    
    if (nextIndex < 0) nextIndex = offerItems.length - 1
    if (nextIndex >= offerItems.length) nextIndex = 0
    
    setSelectedOffer(offerItems[nextIndex])
  }

  const renderContent = (content: OfferItem['content'], item: OfferItem) => (
    <div className="space-y-6">
      {content.subheading1 && (
        <h4 className={`${bebasNeue.className} text-[#FFD700] text-xl`}>
          {content.subheading1}
        </h4>
      )}
      
      {content.body1 && (
        <p className="text-white text-base leading-relaxed">
          {content.body1}
        </p>
      )}

      {/* Grid items section */}
      {item.id === 4 && item.gridItems && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 h-[calc(100%-4rem)]">
          {item.gridItems.map((gridItem, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col items-center text-center justify-center bg-[rgba(217,217,217,0.1)] rounded-2xl p-4 h-full min-h-[180px]"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative w-16 h-16 mb-3">
                <Image
                  src={gridItem.icon}
                  alt={gridItem.text}
                  fill
                  className="object-contain"
                />
              </div>
              <span className={`${bebasNeue.className} text-white text-lg`}>
                {gridItem.text}
              </span>
            </motion.div>
          ))}
        </div>
      )}

      {content.subheading2 && item.id !== 4 && (
        <h4 className={`${bebasNeue.className} text-[#FFD700] text-xl`}>
          {content.subheading2}
        </h4>
      )}

      {content.benefits.length > 0 && (
        <ul className="text-white text-base leading-relaxed list-disc pl-6 space-y-2">
          {content.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      )}

      {content.body2 && (
        <p className="text-white text-base leading-relaxed">
          {content.body2}
        </p>
      )}
    </div>
  )

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    const scrollPosition = container.scrollLeft
    const cardWidth = container.offsetWidth * 0.85 // 85vw width of each card
    const gap = 16 // gap-4 = 16px
    
    // Calculate current card index
    const index = Math.round(scrollPosition / (cardWidth + gap))
    if (index !== currentMobileCard) {
      setCurrentMobileCard(index)
      setSelectedOffer(offerItems[index])
    }
  }

  useEffect(() => {
    const handleSetOffer = (event: CustomEvent) => {
      const offerId = event.detail
      const offer = offerItems.find(item => item.id === offerId)
      if (offer) {
        setSelectedOffer(offer)
      }
    }

    window.addEventListener('setOffer', handleSetOffer as EventListener)
    return () => {
      window.removeEventListener('setOffer', handleSetOffer as EventListener)
    }
  }, [])

  // Add this useEffect to check if content is scrollable
  useEffect(() => {
    const checkScrollable = () => {
      const content = document.querySelector('.offer-content')
      if (content) {
        setIsScrollable(content.scrollHeight > content.clientHeight)
      }
    }

    checkScrollable()
    window.addEventListener('resize', checkScrollable)
    return () => window.removeEventListener('resize', checkScrollable)
  }, [selectedOffer])

  return (
    <section id="offering" className="w-full bg-background py-12 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-32">
        {/* Heading and Dots Container */}
        <div className="flex justify-between items-center mb-8 lg:mb-16">
          <h2 className={`${bebasNeue.className} text-4xl md:text-5xl lg:text-7xl text-white`}>
            what do we offer?
          </h2>

          {/* Mobile Navigation Dots */}
          <div className="flex gap-1.5 lg:hidden">
            {offerItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  const container = document.querySelector('.overflow-x-scroll')
                  if (container) {
                    const cardWidth = container.clientWidth * 0.85
                    const gap = 16
                    container.scrollTo({
                      left: index * (cardWidth + gap),
                      behavior: 'smooth'
                    })
                  }
                  setCurrentMobileCard(index)
                  setSelectedOffer(item)
                }}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  currentMobileCard === index ? 'bg-[#FFD700]' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex flex-row gap-8">
          {/* Left Side - Buttons */}
          <div className="w-full lg:w-[400px] flex flex-col gap-4">
            {offerItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedOffer(item)}
                className="relative flex items-center gap-4 p-4 w-full text-left transition-all duration-300"
              >
                {/* Selection Indicator */}
                {selectedOffer.id === item.id && (
                  <motion.div 
                    className="absolute inset-0 rounded-xl"
                    layoutId="selectedOffer"
                    style={{
                      background: 'linear-gradient(135deg, rgba(217, 217, 217, 0.37) 0%, rgba(115, 115, 115, 0) 100%)',
                      backdropFilter: 'blur(75px)'
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  />
                )}
                
                {/* Icon */}
                <motion.div 
                  className="relative w-12 h-12"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src={item.icon}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </motion.div>

                {/* Text */}
                <motion.span 
                  className={`${bebasNeue.className} text-2xl relative z-10`}
                  animate={{ 
                    color: selectedOffer.id === item.id ? '#FFD700' : '#FFFFFF',
                    scale: selectedOffer.id === item.id ? 1.05 : 1
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.title}
                </motion.span>
              </button>
            ))}
          </div>

          {/* Right Side - Content */}
          <div className="flex-1">
            <motion.div 
              className="relative rounded-3xl p-8 md:p-12 h-[600px]"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              style={{
                background: 'linear-gradient(135deg, rgba(217, 217, 217, 0.37) 0%, rgba(115, 115, 115, 0) 100%)',
                backdropFilter: 'blur(75px)'
              }}
            >
              <h3 className={`${bebasNeue.className} text-3xl md:text-4xl text-white mb-6`}>
                {selectedOffer.title}
              </h3>
              
              <div className="flex gap-8 h-[calc(100%-80px)]">
                {/* Left side - Text Content */}
                <div className={`${selectedOffer.id === 4 ? 'w-full' : 'w-1/2'}`}>
                  <div 
                    className={`${selectedOffer.id === 4 ? 'h-full' : 'overflow-y-auto pr-4'} h-full`}
                    style={{ 
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#4A4A4A transparent',
                    }}
                  >
                    <style jsx global>{`
                      .overflow-y-auto::-webkit-scrollbar {
                        width: 8px;
                      }
                      .overflow-y-auto::-webkit-scrollbar-track {
                        background: transparent;
                      }
                      .overflow-y-auto::-webkit-scrollbar-thumb {
                        background-color: #4A4A4A;
                        border-radius: 20px;
                        border: 2px solid transparent;
                      }
                    `}</style>
                    {renderContent(selectedOffer.content, selectedOffer)}
                  </div>
                </div>

                {/* Right side - Image */}
                {selectedOffer.id !== 4 && (
                  <div className="w-1/2 relative">
                    <Image
                      src={selectedOffer.image}
                      alt={selectedOffer.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="relative w-screen -mx-4 md:-mx-8">
            <div 
              className="flex flex-row gap-4 overflow-x-scroll hide-scrollbar px-4 md:px-8 pb-12"
              onScroll={handleScroll}
            >
              {offerItems.map((item) => (
                <div 
                  key={item.id}
                  className="flex-none w-[85vw] h-[450px] rounded-3xl relative" // Added relative
                  style={{
                    background: 'linear-gradient(135deg, rgba(217, 217, 217, 0.37) 0%, rgba(115, 115, 115, 0) 100%)',
                    backdropFilter: 'blur(75px)',
                    WebkitBackdropFilter: 'blur(75px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="flex flex-col h-full p-6">
                    <div className="flex-shrink-0 flex items-center gap-4 mb-4">
                      <div className="relative w-12 h-12">
                        <Image
                          src={item.icon}
                          alt={item.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h3 className={`${bebasNeue.className} text-3xl text-white`}>
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 relative"
                      onScroll={(e) => {
                        const target = e.currentTarget
                        // Mark this card as scrolled using array
                        setScrolledCards(prev => {
                          if (!prev.includes(item.id)) {
                            return [...prev, item.id]
                          }
                          return prev
                        })
                      }}
                    >
                      {renderContent(item.content, item)}
                      
                      {/* Updated Scroll Indicator - check array instead of Set */}
                      {item.content.benefits.length > 2 && !scrolledCards.includes(item.id) && (
                        <motion.div 
                          className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-[#FFD700] flex items-center justify-center"
                          animate={{ 
                            y: [0, 4, 0],
                            opacity: [1, 0.7, 1]
                          }}
                          transition={{ 
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="#000000"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6"/>
                          </svg>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
