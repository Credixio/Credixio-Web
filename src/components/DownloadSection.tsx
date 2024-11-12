'use client'

import Image from 'next/image'
import { Bebas_Neue, Nunito_Sans } from 'next/font/google'
import { motion } from 'framer-motion'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
})

export default function DownloadSection() {
  return (
    <section className="w-full py-20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-32">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={`${bebasNeue.className} text-4xl md:text-5xl lg:text-7xl text-white mb-4`}>
              Easy Way to manage your credit score
            </h2>
            <p className={`${nunitoSans.className} text-lg md:text-xl text-[#ADB2B1] mb-8`}>
              Easy to use mobile app that support on android and ios.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* App Store Button */}
              <motion.a
                href="#"
                className="flex items-center justify-center bg-[#FFD700] rounded-xl px-6 py-4 group hover:bg-[#FFE55C] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="mr-3">
                  <Image
                    src="/assets/apple-icon.png"
                    alt="Apple Icon"
                    width={24}
                    height={24}
                  />
                </div>
                <div className="flex flex-col">
                  <span className={`${nunitoSans.className} text-xs text-black`}>
                    Download on the
                  </span>
                  <span className={`${bebasNeue.className} text-xl text-black`}>
                    App Store
                  </span>
                </div>
              </motion.a>

              {/* Google Play Button */}
              <motion.a
                href="#"
                className="flex items-center justify-center bg-[#FFD700] rounded-xl px-6 py-4 group hover:bg-[#FFE55C] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="mr-3">
                  <Image
                    src="/assets/google-play-icon.png"
                    alt="Google Play Icon"
                    width={24}
                    height={24}
                  />
                </div>
                <div className="flex flex-col">
                  <span className={`${nunitoSans.className} text-xs text-black`}>
                    Get it on
                  </span>
                  <span className={`${bebasNeue.className} text-xl text-black`}>
                    Google Play
                  </span>
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Right Content - Phone */}
          <motion.div 
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="relative w-[280px] md:w-[400px] h-[560px] md:h-[800px] mx-auto"
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              <Image
                src="/assets/HeroPhoneFinal.png"
                alt="CRDX App"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 