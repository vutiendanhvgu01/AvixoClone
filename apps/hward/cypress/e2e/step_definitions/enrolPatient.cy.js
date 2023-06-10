const { When, Then } = require('@badeball/cypress-cucumber-preprocessor');

When('I am open enrol new patient form', () => {
  cy.get('[data-testid="enroll-patient"]').click();
});

When('I do not enter fullname or NRIC or patient contact', () => {
  cy.selectGender();
  cy.selectDateOfBirth();
});

When('I enter all fields including non mandatory', () => {
  cy.inputFullName();
  cy.selectGender();
  cy.inputNric();
  cy.selectDateOfBirth();
  cy.inputPatientContact();
  cy.inputAlternativePatientContact();
  cy.selectAddress();
});

When('I click the enrol patient button', () => {
  cy.get('[data-testid="submit-btn"]').click();
});

Then('I should see an error message on the NRIC and patient contact fields', () => {
  cy.get('#fullName-helper-text').should('have.text', 'Must provide full name');
  cy.get('#nric-helper-text').should('have.text', 'Invalid NRIC');
  cy.get('#contact-helper-text').should('have.text', 'Must provide phone number');
});

Then('the new patient is exist', () => {
  cy.get('[data-testid="submit-spinner"]').should('not.exist');
  cy.get('[data-testid="newPatientForm"]').should('not.be.visible');
});
