/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picky-app.s3-ap-southeast-1.amazonaws.com'],
  },
}

export default nextConfig
