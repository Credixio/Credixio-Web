import './globals.css'
import { Bebas_Neue, Nunito_Sans } from 'next/font/google'
import { useEffect } from 'react'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Add this script to handle viewport height
  const viewportScript = `
    function setVH() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', \`\${vh}px\`);
    }
    setVH();
    let timeout;
    window.addEventListener('resize', () => {
      clearTimeout(timeout);
      timeout = setTimeout(setVH, 100);
    });
  `

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <script dangerouslySetInnerHTML={{ __html: viewportScript }} />
      </head>
      <body className={`${nunitoSans.className}`}>{children}</body>
    </html>
  )
}
