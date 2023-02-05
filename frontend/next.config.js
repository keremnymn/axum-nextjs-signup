/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    backendUrl: process.env.BACKEND_URL,
  }
}

module.exports = nextConfig
