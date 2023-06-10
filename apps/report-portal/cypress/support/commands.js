/// <reference types="cypress" />

// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
// OTP Request and verify API
Cypress.Commands.add('loginApi', () => {
  let otp;
  cy.request({
    method: 'POST',
    url: `${Cypress.env('USMS_API_URL')}/hward/vitals/otp/request`,
    headers: { 'x-api-key': Cypress.env('USMS_API_KEY') },
    body: {
      phoneNumber: {
        ext: 1,
        number: 8583587616,
      },
    },
  })
    .its('body')
    .then(res => {
      cy.log(res.token);
      otp = res.token;

      cy.request({
        method: 'POST',
        url: `${Cypress.env('USMS_API_URL')}/hward/vitals/otp/verify`,
        headers: { 'x-api-key': Cypress.env('USMS_API_KEY') },
        body: {
          phoneNumber: {
            ext: 1,
            number: 8583587616,
          },
          token: otp,
        },
      })
        .its('body')
        .then(avixoIdRes => {
          cy.log(avixoIdRes.pcno);
          cy.setCookie('report_portal_avixo_id', avixoIdRes.pcno);
          cy.visit({
            url: '/',
            retryOnStatusCodeFailure: true,
          });
        });
    });
});

Cypress.Commands.add('vitalsSubmission', () => {
  cy.get('#weight').type('68');
  cy.get('#height').type('176');
  cy.get('#bodyTemp').type('37');
  cy.get('#pulse').type('85');
  cy.get('#spo2').type('95');
  cy.get('#bloodPressure').type('120/80');
});
