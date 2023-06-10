/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

let patientUUID = '';

Given('User visits patient list and select the first patient to view his dashboard', () => {
  cy.loginApi();

  cy.visit('/patient');
  cy.contains('All Patients');

  cy.log('Click on the first patient');
  cy.get('[data-cy="list-of-patients"] tbody tr:first td:nth-child(3)').click();

  cy.wait(5000);

  cy.url().should('contain', '/dashboard');
  cy.url().then(text => {
    cy.log(text);

    patientUUID = text.split('/')[4];
    cy.log(`Patient UUID: ${patientUUID}`);
  });
});

Then(
  'the patient dashboard is displayed, and it contains 5 boxes: Patient Information, Allergy, Immunisation, Appoinment, Invoices',
  () => {
    cy.log('Check url contains suffix "dashboard"');
    cy.url().should('contain', '/dashboard');

    cy.log('Check dashboard contain 5 boxes');
    cy.contains('Patient Information');
    cy.contains('Allergy');
    cy.contains('Immunisation');
    cy.contains('Appointment');
    cy.contains('Invoices');
  },
);

Then('check information between header and Patient Information card', () => {
  cy.log('Check same information between header and patient information card');
  cy.get('[data-cy="Phone Number"]')
    .invoke('text')
    .then(text => {
      cy.get('[data-cy="patient-information"]').contains(text);
    });
});

// Patient Information
When('User click on Patient Information', () => {
  cy.log('Click on the Patient Information card');
  cy.get('[data-cy="Patient Information"]').click(100, 100);
});

Then('user should be directed to patient detail', () => {
  cy.url().should('not.contain', '/dashboard');
  cy.url().should('contain', patientUUID);
});

// Allergy
When('User click on Allergy', () => {
  cy.log('Click on the Allergy card');
  cy.get('[data-cy="Allergy"]').click(100, 100);
});

Then('user should be directed to allergy page', () => {
  cy.wait(5000);
  cy.url().should('contain', `/${patientUUID}/allergy`);
});

// Immunisation
When('User click on Immunisation', () => {
  cy.log('Click on the Immunisation card');
  cy.get('[data-cy="Immunisation"]').click(100, 100);
});

Then('user should be directed to immunisation page', () => {
  cy.wait(5000);
  cy.url().should('contain', `/${patientUUID}/immunisation`);
});

// Medical Record
When('User click on Medical Record button', () => {
  cy.log('Click on the Medical Record button');
  cy.get('[data-cy="medical-record-button"]').click();
});

Then('user should be directed to medical record page', () => {
  cy.wait(5000);
  cy.url().should('contain', `${patientUUID}/medical-record`);
});
