import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

Then('I should login to {string} page', url => {
  cy.openPage(url);
});

When('I am logged in to {string} page', url => {
  cy.loginApi();
  cy.openPage(url);
});
