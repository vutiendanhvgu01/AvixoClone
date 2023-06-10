const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

Given('I am at the login page', () => {
  cy.visit('/login');
  cy.url().should('contain', '/login');
  cy.contains('Welcome');
  cy.contains('Please login with your phone number.');
});

Given('I am logged in to vital submission page', () => {
  // wait for the specified duration before sending another OTP request
  cy.wait(30000);
  cy.loginApi();
});

When('I enter all the fields', () => {
  cy.vitalsSubmission();
  cy.get('[data-testid="submit-btn"]').click();
});

When('I click submit button at the login page', () => {
  cy.get('[data-cy="phoneForm"]').should('exist');
  cy.get('[data-cy="submitBtn"]').click();
});

When('I enter invalid phone number', () => {
  cy.get('[data-testid="phone-number-input"]').type('6511111111');
});

When('I enter valid phone number', () => {
  cy.get('[data-testid="phone-number-input"]').type('18583587616');
});

Then('I should see an error required message', () => {
  cy.get('[data-cy="phoneForm"]').contains('A phone number is required');
});

Then('I should see an error invalid phone message', () => {
  cy.get('[data-cy="phoneForm"]').contains('Please enter a valid phone number');
});

Then('new vitals record submitted', () => {
  cy.get('[data-testid="submit-spinner"]').should('not.exist');
  cy.url().should('include', '/vital/success');
  cy.get('[data-testid="successInfo"]').should('have.text', 'Thank you for your submission');
  cy.get('[data-testid="newRecord"]').should('exist');
});
