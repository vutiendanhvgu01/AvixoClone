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
    ORGANISATION_MS_URL: process.env.ORGANISATION_MS_URL,
    ALLERGY_MS_URL: process.env.ALLERGY_MS_URL,
    AUTH_MS_URL: process.env.AUTH_MS_URL,
    IMMUNISATION_MS_URL: process.env.IMMUNISATION_MS_URL,
    APPOINTMENT_MS_URL: process.env.APPOINTMENT_MS_URL,
    INVOICE_MS_URL: process.env.INVOICE_MS_URL,
    PRESCRIPTION_MS_URL: process.env.PRESCRIPTION_MS_URL,
    DISPENSE_MS_URL: process.env.DISPENSE_MS_URL,
    PATIENT_MS_URL: process.env.PATIENT_MS_URL,
    DIAGNOSIS_MS_URL: process.env.DIAGNOSIS_MS_URL,
    MEDICAL_CERTIFICATE_MS_URL: process.env.MEDICAL_CERTIFICATE_MS_URL,
    PRACTITIONER_MS_URL: process.env.PRACTITIONER_MS_URL,
    MEDICAL_RECORD_MS_URL: process.env.MEDICAL_RECORD_MS_URL,
    SCMS_CONNECTOR_MS_URL: process.env.SCMS_CONNECTOR_MS_URL,
    CATALOG_MS_URL: process.env.CATALOG_MS_URL,
    NEHR_CONNECTOR_MS_URL: process.env.NEHR_CONNECTOR_MS_URL,
    INVENTORY_MS_URL: process.env.INVENTORY_MS_URL,
    VISIT_MS_URL: process.env.VISIT_MS_URL,
  },
};

module.exports = nextConfig;
