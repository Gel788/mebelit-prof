/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
    webpackBuildWorker: false,
  },
};

export default nextConfig;
