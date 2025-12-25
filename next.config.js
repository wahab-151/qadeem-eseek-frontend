/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "example.com" },
      { protocol: "https", hostname: "eseek.s3.us-east-2.amazonaws.com" },
      { protocol: "https", hostname: "your-bucket.com" },
      { protocol: "https", hostname: "s3.us-east-2.amazonaws.com", pathname: "/**" },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: false,
    // Disable optimization in development to avoid 504 timeouts with S3
    // In production, images will be optimized
    unoptimized: process.env.NODE_ENV === 'development',
    // Add timeout configuration (Next.js default is 30s, but we'll handle it via unoptimized in dev)
    // For production, consider using a CDN or image proxy service
  },
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    optimizePackageImports: [
      'lodash',
      'date-fns',
      '@mui/material',
      '@mui/icons-material',
      '@mui/lab'
    ],
  },
};

module.exports = nextConfig;

