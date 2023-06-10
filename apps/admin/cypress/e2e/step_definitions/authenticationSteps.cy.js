/* eslint-disable no-undef */
const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

Given('the user is on a page with the login fields', () => {
  cy.visit('/login');
  cy.url().should('contain', '/login');

  cy.contains('Log in');
  cy.contains('By logging in, you agree to our Terms of Service');
  cy.contains('Forgot password?');
});

When('the user inputs invalid credentials', () => {
  cy.log('filling out username');
  cy.get('[data-cy="username"]').type('johndoe');

  cy.log('filling out password');
  cy.get('[data-cy="password"]').type('N0pa$$w1rd');
});

When('the user clicks the login button', () => {
  cy.log('submitting form');
  cy.get('[data-cy="submit"]').click();
});

Then('the user is not logged in and display an error message', () => {
  cy.log('Show error message');
  cy.get('[data-cy="errors"]').should('contain', 'Invalid credentials');
});

When('the user doesnt inputs username and password', () => {
  cy.get('[data-cy="submit"]').click();
  cy.get('[data-cy="form"]').contains('Required');

  cy.log('filling out username');
  cy.get('[data-cy="username"]').type('avix');

  cy.log('filling out password');
  cy.get('[data-cy="password"]').type('avix');
});

Then('the error messages are displayed below fields', () => {
  cy.get('[data-cy="form"]').contains('Username is too short - should be 5 chars minimum.');
  cy.get('[data-cy="form"]').contains('Password is too short - should be 5 chars minimum.');
});

When('the user has inputs the valid credential', () => {
  cy.getCookie('access_token').should('not.exist');
  cy.log('filling out username');
  cy.get('[data-cy="username"]').type(Cypress.env('AT_USERNAME'));
  cy.log('filling out password');
  cy.get('[data-cy="password"]').type(Cypress.env('AT_PASSWORD'));
});

Then('the user successfully logged in the admin page', () => {
  cy.wait(5000);
  cy.url().should('not.contain', '/login');

  cy.url().should('include', '/organisation');
  cy.getCookie('access_token').should('exist');
});

When('the user forgets his password', () => {
  cy.contains('Forgot password?');
});

When('the user click on Forgot Password? link to reset password', () => {
  const text = 'Please contact your Clinic Administrator or Avixo Support team to reset your password.';
  cy.get('[data-cy="form"]').should('not.contain', text);
  cy.get('[data-cy="forgot-password"]').click();
  cy.get('[data-cy="form"]').should('contain', text);
});

Then('a text {string} is displayed above login button', wording => {
  cy.get('[data-cy="form"]').should('contain', wording);
});

Given('the user login as admin', () => {
  cy.loginApi();
});

When('the user redirect to the dashboard page', () => {
  cy.visit('/organisation');
  cy.getCookie('access_token').should('exist');
  cy.get('[data-cy="Parent Organisations"]').should('contain', 'Parent Organisations');
});

When('the user logout', () => {
  cy.log('clicking on logout button');
  cy.get('[data-cy="logout-button"]').click();

  cy.wait(1000);
  cy.contains('Proceed to Logout');

  cy.log('clicking on confirm button');
  cy.get('[data-cy="logout-confirm"]').click();
});

Then('the user will redirect to login page', () => {
  cy.wait(5000);
  cy.getCookie('access_token').should('not.exist');
  cy.url().should('contain', '/login');
});
