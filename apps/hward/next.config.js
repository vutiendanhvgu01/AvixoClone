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
    BASE_URL: process.env.BASE_URL,
    API_VERSION: process.env.API_VERSION,
    AUTH_MS_URL: process.env.AUTH_MS_URL,
    CLIENT_ACCOUNT: process.env.CLIENT_ACCOUNT,
    ONEMAP_URI: process.env.ONEMAP_URI,
    USMS_API_URL: process.env.USMS_API_URL,
    USMS_API_KEY: process.env.USMS_API_KEY,
    AVIXO_CMS_URL: process.env.AVIXO_CMS_URL,
    BOOKING_SERVICE_URL: process.env.BOOKING_SERVICE_URL,
    BOOKING_SERVICE_API_KEY: process.env.BOOKING_SERVICE_API_KEY,
    UNLEASH_FRONTEND_API_URL: process.env.UNLEASH_FRONTEND_API_URL,
    UNLEASH_FRONTEND_API_TOKEN: process.env.UNLEASH_FRONTEND_API_TOKEN,
    UNLEASH_APP_NAME: process.env.UNLEASH_APP_NAME,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
