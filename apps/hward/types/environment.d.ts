namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    BASE_URL: string;

    AUTH_MS_URL: string;
    CLIENT_ACCOUNT: string;
    API_VERSION: string;

    ONEMAP_URI: string;

    USMS_API_URL: string;
    USMS_API_KEY: string;

    AVIXO_CMS_URL: string;

    BOOKING_SERVICE_URL: string;
    BOOKING_SERVICE_API_KEY: string;

    UNLEASH_FRONTEND_API_URL: string;
    UNLEASH_FRONTEND_API_TOKEN: string;
    UNLEASH_APP_NAME: string;

    E2E_LOGIN_USERNAME?: string;
    E2E_LOGIN_PASSWORD?: string;
  }
}
