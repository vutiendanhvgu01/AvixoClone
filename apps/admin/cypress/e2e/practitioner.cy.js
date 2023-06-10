describe('The Patient Page', () => {
  beforeEach(() => {
    cy.login();
  });

  // Scenario: As a system user, he can check list practitioner of one organisation
  // Given the user is on Organisation detail, he click on one of its organisation
  // Then he can see the list of practitioners of the organisation
  // Then he can type some name in "Search practitioner" box to narrow down the list of practitioners he want to check
  // And he can click on pagination bottom tab to check the next / previous page

  // Scenario: As a system user, he can create new practitioner
  // Given the user is on Organization detail, he click "Action" button to show new popup with "Add Practitioner" option
  // Then he can click this option and new right slide is displayed
  // ...

  // Scenario: As a system user, he can delete one practitioner
  // Given the user is on Organization detail
  // Then he can see the list of practitioner
  // Then he can click on bin icon on each row
  // Then one right slide is displayed as delete confirmation
  // Then:
  // 1. if he click on "Yes, remove", the slide is hidden and this practitioner is removed from list
  // and a small black popup with "Dismiss" button is displayed that inform the practitioner has been removed successfully
  // 2. if he click on "Cancel", the slide is hidden and this practitioner is still displayed on list
});
