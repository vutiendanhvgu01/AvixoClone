// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
// import 'cypress-localstorage-commands';
import pages from '../fixtures/pages.json';

// Login by API
Cypress.Commands.add('loginApi', () => {
  let cookie;
  cy.request({
    method: 'POST',
    url: `${Cypress.env('AUTH_MS_URL')}/${Cypress.env('API_VERSION')}/auth/login?client-account=${Cypress.env(
      'CLIENT_ACCOUNT',
    )}`,
    body: {
      username: Cypress.env('E2E_LOGIN_USERNAME'),
      password: Cypress.env('E2E_LOGIN_PASSWORD'),
    },
  })
    .its('body')
    .then(loginRespond => {
      cy.log(loginRespond.access_token);
      cy.setCookie('access_token', loginRespond.access_token);
      cookie = loginRespond.access_token;

      cy.request({
        method: 'GET',
        url: `${Cypress.env('AUTH_MS_URL')}/${Cypress.env('API_VERSION')}/auth/me?client-account=${Cypress.env(
          'CLIENT_ACCOUNT',
        )}`,
        auth: { bearer: cookie },
      })
        .its('body')
        .then(meRespond => {
          cy.log(meRespond.doctor);
          cy.request({
            method: 'GET',
            url: `${Cypress.env('USMS_API_URL')}/hward`,
            headers: { 'x-api-key': Cypress.env('USMS_API_KEY') },
            qs: { avixoId: meRespond.doctor },
          })
            .its('body')
            .then(doctorRespond => {
              cy.log(doctorRespond);
              const businessRef = doctorRespond.hward.accounts.find(acc => acc.type === 'jarvis')?.id;
              // eslint-disable-next-line no-underscore-dangle
              cy.setCookie('organizationRef', doctorRespond.hward?._id);
              cy.setCookie('businessRef', businessRef);
            });
        });
    });
});

const visitOptions = { headers: { 'Accept-Encoding': 'gzip' } };

Cypress.Commands.add('openPage', url => {
  cy.visit(pages[url], visitOptions);
});
