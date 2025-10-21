import { config } from 'dotenv'
import path from 'path'
const envFile =
  process.env.NODE_ENV?.toLowerCase() === 'production'
    ? '.env'
    : '.env.development'
const envFilePath = path.resolve(process.cwd(), envFile)
config({ path: envFilePath })

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'react-icons'],
  },
  // Enable compression
  compress: true,
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  // Bundle analyzer (uncomment for analysis)
  // webpack: (config, { dev, isServer }) => {
  //   if (!dev && !isServer) {
  //     const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
  //     config.plugins.push(
  //       new BundleAnalyzerPlugin({
  //         analyzerMode: 'static',
  //         openAnalyzer: false,
  //       })
  //     )
  //   }
  //   return config
  // },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    ABLY_API_KEY: process.env.ABLY_API_KEY,
    MQTT_BROKER_URL: process.env.MQTT_BROKER_URL,
    NEXT_PUBLIC_E2E_GMAIL_ID: process.env.NEXT_PUBLIC_E2E_GMAIL_ID,
    NEXT_PUBLIC_E2E_GMAIL_PASSWORD: process.env.NEXT_PUBLIC_E2E_GMAIL_PASSWORD,
  },
}

export default nextConfig
