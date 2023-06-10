/* eslint-disable no-undef */
const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

Given('the user is on Parent Organisations page', () => {
  cy.loginApi();
  cy.visit('/organisation');
});

Then('the user can see list of organisations', () => {
  cy.visit('/organisation');
  cy.getCookie('access_token').should('exist');

  cy.log('check list of organisations');
  cy.get('[data-cy="organisation-card"]').its('length').should('be.gt', 0); // new
  cy.get('[data-cy="Avixo Card Title"]').should('exist');
  cy.get('[data-cy="Parent Organisations"]').should('contain', 'Parent Organisations');
});

Then('the menu item of Parent Organisations is highlighted', () => {
  cy.log('check parent organisation is highlighted');
  cy.get('[data-cy="Parent Organisations"]').should('have.attr', 'aria-selected', 'true');
});

Then('search box is displayed', () => {
  cy.log('check search box is displayed');
  cy.get('[data-cy="organisation-search-box"]').should('exist');
});

Then(
  'on the screen, he sees the Actions button with 3 options: Add Organisation, Add Premise, Add Practitioner',
  () => {
    cy.log('check action button');
    cy.get('[data-cy="add-premise-button"]').should('exist');
    cy.get('[data-cy="add-practitioner-button"]').should('exist');
    cy.get('[data-cy="add-organisation-button"]').should('exist');
  },
);

Then('he should see 4 tabs: Parent Organisation, Organisations, Premises, Pratitioners', () => {
  cy.log('check tabs on dashboard');
  cy.get('[data-cy="Parent Organisations"]').should('exist');
  cy.get('[data-cy="Organisations"]').should('exist');
  cy.get('[data-cy="Premises"]').should('exist');
  cy.get('[data-cy="Practitioners"]').should('exist');
});

When('he clicks on Organisations tab', () => {
  cy.get('[data-cy="Organisations"]').click();
});

Then('he should see list of child organisations that belongs to this parent organisation as cards', () => {
  cy.log('check list of child organisation');
  cy.get('[data-cy="organisation-card"]').its('length').should('be.gt', 0);
  cy.get('[data-cy="organisation-search-box"]').should('exist');
});

When('he clicks on Premises tab', () => {
  cy.get('[data-cy="Premises"]').click();
});

Then('he should see list of premises that belongs to this parent organisation as cards', () => {
  cy.log('check list of premises');
  cy.get('[data-cy="premise-item"]').its('length').should('be.gt', 0);
  cy.get('[data-cy="premise-search-box"]').should('exist');
});

When('he clicks on Practitioners tab', () => {
  cy.get('[data-cy="Practitioners"]').click();
  cy.wait(3000);
});

Then('he should see list of practitioners as table', () => {
  cy.log('check list of practicioners');
  cy.get('[data-cy="practitioner-table"]').should('be.visible');
  cy.get('[data-cy="practitioner-table"] tbody tr').its('length').should('be.gt', 0);
  cy.get('[data-cy="practicioner-search-box"]').should('exist');
});

When('the user click one of the organisation', () => {
  cy.get('[data-cy="organisation-card"]').contains('Clinic Medical Group').click();
});

Then(
  'he should see 5 blocks: Organisation Information, Contact Information, Finance Information, Timezone, Qualification',
  () => {
    cy.log('verify 5 block on the details page');
    cy.get('[data-cy="Organisation Information"]').should('be.visible');
    cy.get('[data-cy="Contact Information"]').should('be.visible');
    cy.get('[data-cy="Finance Information"]').should('be.visible');
    cy.get('[data-cy="Timezone"]').should('be.visible');
    cy.get('[data-cy="Qualification"]').should('be.visible');
  },
);

Then('details block is shown same information as header', () => {
  cy.log('Check right information is displayed');
  cy.get('[data-cy="organisation-title"]')
    .invoke('text')
    .then(text => {
      cy.get('[data-cy="Name"]').contains(text);
    });
  cy.get('[data-cy="organisation-sub-title"]')
    .invoke('text')
    .then(text => {
      cy.get('[data-cy="Company Name"]').contains(text);
    });
});

// # NOTES: this code will continue until the feature for adding a new organization is STABLE.

// add organization
// When('he click on Add Organisation button to show a float panel to create a parent organisation', () => {
//   cy.get('[data-cy="add-organisation-button"]').click();
// });

// When('he fills in the required fields', () => {
//   cy.log('fills in the required fields');
//   cy.get('[data-cy="input-display-name"]').type('Joy');
//   cy.get('[data-cy="input-company-name"]').type('Joyco');
//   cy.get('[data-cy="input-company-reg-no"]').type('0012345');
//   cy.get('[data-cy="input-license-from"]').clear();
//   cy.get('[data-cy="input-license-from"]').type('12/20/2023');
//   cy.get('[data-cy="input-license-to"]').clear();
//   cy.get('[data-cy="input-license-to"]').type('12/20/2025');
//   cy.get('[data-cy="select-status"]').click();
//   cy.get('[data-value="inactive"]').click();
// });

// When('also fills in the optional fields', () => {
//   cy.log('fills in the  optional fields');
//   cy.get('[data-cy="input-category"]').type('healthcare');
//   cy.get('[data-cy="input-sub-category"]').type('sub healthcare');
//   cy.get('[data-cy="description"]').type('This is description for E2E Testing');
// });

// When('can change or remove avatar', () => {
//   cy.log('change avatar');
//   cy.contains('[data-cy="avatar"]', 'Change').should('be.visible');
//   cy.contains('[data-cy="avatar"]', 'Change').click();
//   cy.contains('[data-cy="avatar"]', 'Remove').should('be.visible');
// });

// When('he click on Next button to fill in Contact Information form', () => {
//   cy.log('next');
//   cy.get('[data-cy="submit-btn"]').click();
// });
