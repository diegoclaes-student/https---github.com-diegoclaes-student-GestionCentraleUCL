/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  transpilePackages: ['@gestion-ucl/core', '@gestion-ucl/db'],
}

module.exports = nextConfig