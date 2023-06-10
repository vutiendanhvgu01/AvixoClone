/* eslint-disable @typescript-eslint/no-var-requires */
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
    baseUrl: 'http://localhost:13010',
    projectId: 'k7mhfb',
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
    AT_USERNAME: process.env.AT_USERNAME,
    AT_PASSWORD: process.env.AT_PASSWORD,
    API_VERSION: process.env.API_VERSION,
  },
});
