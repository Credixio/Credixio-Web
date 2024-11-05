/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2500, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 1024, 2048],
    remotePatterns: [],
    unoptimized: true
  },
}

module.exports = nextConfig
