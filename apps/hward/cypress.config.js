const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild');

require('dotenv').config({ path: '.env.local' });

// eslint-disable-next-line @typescript-eslint/no-shadow
async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config); // to allow json to be produced
  // To use esBuild for the bundler when preprocessing
  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    }),
  );
  return config;
}

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:13040',
    projectId: '4787re',
    viewportWidth: 1440,
    viewportHeight: 950,
    defaultCommandTimeout: 70000,
    requestTimeout: 80000,
    chromeWebSecurity: false,
    modifyObstructiveCode: false,
    supportFile: 'cypress/support/e2e.js',
    specPattern: '**/**/*.feature',
    setupNodeEvents,
    retries: 2,
  },
  env: {
    AUTH_MS_URL: process.env.AUTH_MS_URL,
    CLIENT_ACCOUNT: process.env.CLIENT_ACCOUNT,
    E2E_LOGIN_USERNAME: process.env.E2E_LOGIN_USERNAME,
    E2E_LOGIN_PASSWORD: process.env.E2E_LOGIN_PASSWORD,
    USMS_API_URL: process.env.USMS_API_URL,
    API_VERSION: process.env.API_VERSION,
    USMS_API_KEY: process.env.USMS_API_KEY,
    UNLEASH_FRONTEND_API_URL: process.env.UNLEASH_FRONTEND_API_URL,
    UNLEASH_FRONTEND_API_TOKEN: process.env.UNLEASH_FRONTEND_API_TOKEN,
    UNLEASH_APP_NAME: process.env.UNLEASH_APP_NAME,
  },
});
