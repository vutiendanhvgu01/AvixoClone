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
    ORGANISATION_MS_URL: process.env.ORGANISATION_MS_URL,
    PRACTITIONER_MS_URL: process.env.PRACTITIONER_MS_URL,
    INVOICE_MS_URL: process.env.INVOICE_MS_URL,
  },
};

module.exports = nextConfig;
