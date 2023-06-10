/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    externalDir: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  rewrites() {
    return [
      {
        source: '/ping',
        destination: `/api/ping`,
      },
    ];
  },
  publicRuntimeConfig: {
    USMS_API_URL: process.env.USMS_API_URL,
    USMS_API_KEY: process.env.USMS_API_KEY,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/vital',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
