'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Bebas_Neue, Nunito_Sans } from 'next/font/google'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
})

const footerLinks = [
  {
    title: "Company",
    links: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
    ]
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ]
  },
  {
    title: "Support",
    links: [
      { name: "Help Center", href: "#" },
      { name: "FAQs", href: "#" },
      { name: "Contact Support", href: "#" },
    ]
  }
]

const socialLinks = [
  { name: "Twitter", icon: "/assets/twitter.png", href: "#" },
  { name: "LinkedIn", icon: "/assets/linkedin.png", href: "#" },
  { name: "Instagram", icon: "/assets/instagram.png", href: "#" },
]

export default function Footer() {
  return (
    <footer className="w-full bg-transparent py-12 lg:py-20 relative z-10 overflow-hidden">
      <style jsx global>{`
        .footer-glass {
          background: linear-gradient(135deg, rgba(50, 50, 50, 0.95) 0%, rgba(30, 30, 30, 0.98) 100%);
          backdrop-filter: blur(75px);
          -webkit-backdrop-filter: blur(75px);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          width: 100vw;
        }
      `}</style>

      {/* Glassmorphic Background */}
      <div className="absolute inset-0 footer-glass" />

      <div className="relative z-20 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-32 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-4">
            <Image 
              src="/assets/logo.png" 
              alt="CRDX Logo" 
              width={120} 
              height={42}
              className="mb-6"
            />
            <p className={`${nunitoSans.className} text-[#ADB2B1] text-sm leading-relaxed mb-6`}>
              CRDX helps you improve your credit score without any additional effort. Build your credit with your own money.
            </p>
            {/* Chat with us CTA */}
            <button className="bg-transparent border-2 border-[#FFD700] text-[#FFD700] px-6 py-2 rounded-full text-sm font-medium hover:bg-[#FFD700]/10 transition-colors mb-8">
              Chat with us
            </button>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link 
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Image 
                    src={social.icon} 
                    alt={social.name} 
                    width={20} 
                    height={20}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title} className="lg:col-span-2">
              <h4 className={`${bebasNeue.className} text-white text-xl mb-4`}>
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className={`${nunitoSans.className} text-[#ADB2B1] hover:text-white transition-colors text-sm`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Section */}
          <div className="lg:col-span-2">
            <h4 className={`${bebasNeue.className} text-white text-xl mb-4`}>
              Contact
            </h4>
            <div className="space-y-3">
              <p className={`${nunitoSans.className} text-[#ADB2B1] text-sm`}>
                Email: info@credixio.com
              </p>
              <p className={`${nunitoSans.className} text-[#ADB2B1] text-sm`}>
                Phone: +44 (0) 123 456 789
              </p>
              <p className={`${nunitoSans.className} text-[#ADB2B1] text-sm`}>
                Address: London, UK
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Updated border color for better visibility */}
        <div className="mt-12 pt-8 border-t border-white/[0.15]">
          <p className={`${nunitoSans.className} text-[#ADB2B1] text-sm text-center`}>
            © {new Date().getFullYear()} CRDX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 