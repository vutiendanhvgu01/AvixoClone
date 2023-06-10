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
    baseUrl: 'http://localhost:13041',
    projectId: 'wpffm5',
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
    AVIXO_UTILITY_API_URI: process.env.AVIXO_UTILITY_API_URI,
    AVIXO_UTILITY_API_KEY: process.env.AVIXO_UTILITY_API_KEY,
    NOTIFICATION_MS_URI: process.env.NOTIFICATION_MS_URI,
    QA_NUMBER: process.env.QA_NUMBER,
    SENDER_NUMBER: process.env.SENDER_NUMBER,
    USMS_API_URL: process.env.USMS_API_URL,
    USMS_API_KEY: process.env.USMS_API_KEY,
  },
});
