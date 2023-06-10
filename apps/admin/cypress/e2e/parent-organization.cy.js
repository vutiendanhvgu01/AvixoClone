describe('The Parent Organization Page', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/organisation');
  });

  // Scenario: As a system user, when go to parent organization page,
  // Given the user is on "Parent Organizations" page
  // Then he can see list of organizations
  // And the menu item of "Parent Organizations" is highlighted
  // And search box is displayed
  // And on the screen, he sees the "Actions" button with 3 options:
  // - Add Organisation
  // - Add Premise
  // - Add Practitioner
  it('Go to organisation list', () => {
    cy.log('Check url contains suffix "organisation"');
    cy.url().should('contain', '/organisation');

    cy.log('Check list of organisations');
    cy.get('[data-cy="organisation-card"]').its('length').should('be.gt', 0);

    cy.log('Check Parent Organisations tab is highlight');
    cy.get('[data-cy="Parent Organisations"]').should('have.class', 'Mui-selected');

    cy.log('Check organisation search box exists');
    cy.get('[data-cy="organisation-search-box"]').should('be.visible');

    cy.log('Check list actions of organisation list page');
    cy.contains('Add Organisation').should('not.exist');
    cy.contains('Add Premise').should('not.exist');
    cy.contains('Add Practitioner').should('not.exist');

    cy.get('[data-cy="organisation-actions"]').click();

    cy.contains('Add Organisation');
    cy.contains('Add Premise');
    cy.contains('Add Practitioner');
  });

  // Scenario: As a system user, when go to parent organisation details page,
  // Then he should see 4 tabs: Parent Organisation Details, Organisations, Premises, Pratitioners
  // And "Parent Organisation Details" is highlighted
  // And he should see 3 blocks: Details, Settings and Configurations, Contact Number
  // And Details block is shown same information as header
  // And he clicks on Organisations tab, he should see list of child organisations
  // that belongs to this parent organisation as cards
  // And he clicks on Premises tab, he should see list of premises
  // that belongs to this parent organisation as cards
  // And he clicks on Practitioners tab, he should see list of practitioners as table
  it('Check parent organisation details', () => {
    cy.log('Go to the first parent organisation');
    cy.get('[data-cy="organisation-card"]').first().find('a').click();

    cy.log('Check 4 tabs are shown');
    cy.get('[data-cy="Organisation Details"]').should('be.visible');
    // cy.get('[data-cy="Organisations"]').should('be.visible');
    // cy.get('[data-cy="Premises"]').should('be.visible');
    // cy.get('[data-cy="Practitioners"]').should('be.visible');

    cy.log('Check blocks exist');
    cy.get('[data-cy="Details"]').should('be.visible');
    cy.get('[data-cy="Settings and Configurations"]').should('be.visible');
    cy.get('[data-cy="Contact Information"]').should('be.visible');

    cy.log('Check "Organisation Details" is highlighted');
    cy.get('[data-cy="Organisation Details"]').should('have.class', 'Mui-selected');

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

    // cy.log('Go to Organisations tab');
    // cy.get('[data-cy="Organisations"]').click();
    // cy.get('[data-cy="organisation-card"]').its('length').should('be.gt', 0);

    // cy.log('Go to Premises tab');
    // cy.get('[data-cy="Premises"]').click();
    // cy.get('[data-cy="premise-item"]').its('length').should('be.gt', 0);

    // cy.log('Go to Practitioners tab');
    // cy.get('[data-cy="Practitioners"]').click();
    // cy.get('[data-cy="practitioner-table"]').should('be.visible');
  });

  // Scenario: As a system user, when go to parent organization page,
  // he can click on "New Parent Organization" button to create new Parent Organization
  // Given the user is on "Parent Organizations" page
  // Then he can click on "New Parent Organization" button to show a float panel to create a parent organization
  // And then he can fill in the form with 'Category', 'Type', 'Display name', 'Company name', 'Location', (required fields),
  // 'Description' (optional field)
  // and can change / remove avatar
  // After that, he can click on "Next" button to fill in "Contact Information" form
  // On "Contact Information" form, he can update mobile number with country code,
  // update email, address
  // And he can add / remove new phones, emails, addresses
  // After that, he can click on "Next" button to fill in "Tax Information" form
  // (And he can click on "Back" button to view and edit the "Parent Organization Detail")
  // Then he can update tax and currency as required fields
  // After filling all required fields, he can click on "Add parent organization" to submit the form
  // (And he can click on "Back" button to view and edit the "Tax Information")
  // Then, the new parent organization can be displayed on the list
  // And a small popup is displayed on bottom right page conner

  // Scenario: As a system user, he can not create new parent organization if atlest one required field is not filled
  // Given the user is on "Parent Organizations" page
  // Then he can click on "New Parent Organization" button to show a float panel to create a parent organization
  // And he fill many fields but does not fill atleast one required field
  // Then he can not submit the form by click on "Add parent organization" button

  // Scenario: As a system user, after filling all fields, but he does not click on "Add parent organization",
  // he click on the area outside of the form
  // Then no new organization is created and no new organization is displayed on the list
});
