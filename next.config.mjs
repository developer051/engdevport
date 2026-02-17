/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance: เปิดการ optimize images
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // เปิด experimental สำหรับ performance
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
