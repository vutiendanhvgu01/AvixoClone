const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

Given('I am at the login page', () => {
  cy.visit('/');
  cy.url().should('contain', '/login');

  cy.contains('Welcome to Avixo H-Ward Portal');
  cy.contains('By logging in, you agree to our Terms of Service');
  cy.contains('Forgot password?');
});

When('I click the login button', () => {
  cy.get('[data-cy="submit"]').click();
});

When('I enter invalid credentials', () => {
  cy.get('[data-cy="username"]').type('johndoe');
  cy.get('[data-cy="password"]').type('N0pa$$w1rd');
});

When('I click on the forgot password link', () => {
  cy.get('[data-cy="forgot-password"]').click();
});

When('I enter valid credentials', () => {
  cy.get('[data-cy="username"]').type(Cypress.env('E2E_LOGIN_USERNAME'));
  cy.get('[data-cy="password"]').type(Cypress.env('E2E_LOGIN_PASSWORD'));
});

When('I reload the page', () => {
  cy.reload();
});

When('I click logout button', () => {
  cy.log('clicking on profile avatar');
  cy.get('[data-cy="profile-avatar"]').click();
  cy.contains('Logout');
  cy.log('clicking on logout tab');
  cy.contains('Logout').click();
  cy.get('[data-testid="logoutConfrim"]').click();
});

Then('I should see an error required message', () => {
  cy.get('[data-cy="form"]').contains('Required');
});

Then('I should see an error invalid message', () => {
  cy.get('[data-cy="errors"]').should('contain', 'Invalid credentials');
});

Then('a text should be appear in the validation errors', () => {
  const text = 'Please contact your Clinic Administrator or Avixo Support team to reset your password.';
  cy.get('[data-cy="form"]').should('contain', text);
});

Then('I should still be logged in', () => {
  cy.url().should('include', '/cases');
});

Then('I should logout from the application', () => {
  cy.getCookie('access_token').should('not.exist');
  cy.getCookie('organizationTag').should('not.exist');
  cy.getCookie('organizationRef').should('not.exist');
  cy.getCookie('businessRef').should('not.exist');

  cy.url().should('contain', '/login');
});
