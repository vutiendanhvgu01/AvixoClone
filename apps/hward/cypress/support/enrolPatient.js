import { randomFirstName, randomLastName, generateNric, randomPhoneNumber } from './utils';

Cypress.Commands.add('inputFullName', () => {
  cy.get('[data-testid="full-name-input"]').type(`${randomFirstName} ${randomLastName}`);
});

Cypress.Commands.add('selectGender', () => {
  cy.get('[data-testid="gender-select"]').click();
  cy.get('ul li[data-value="Male"]').click();
});

Cypress.Commands.add('inputNric', () => {
  cy.get('[data-testid="nric-input"]').type(generateNric('S', 22));
});

Cypress.Commands.add('selectDateOfBirth', () => {
  cy.get('[placeholder="dd/mm/yyyy"]').type('12/11/1965');
});

Cypress.Commands.add('inputPatientContact', () => {
  cy.get('[data-testid="contact-input"]').type(randomPhoneNumber);
});

Cypress.Commands.add('inputAlternativePatientContact', () => {
  cy.get('[data-testid="alt-contact-input"]').type(randomPhoneNumber);
});

Cypress.Commands.add('selectAddress', () => {
  cy.get('[data-testid="Address"]').type('Nanyang');
  cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click();
});
