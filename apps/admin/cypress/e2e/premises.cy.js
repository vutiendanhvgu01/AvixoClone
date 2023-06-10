describe('The Premises Page', () => {
  beforeEach(() => {
    cy.login();
  });

  // Scenario: As a system user, he can check list patients of one premises
  // Given the user is on Organization detail, he click on one of its premises
  // Then he can see the list of patients of the premises
  // Then he can click on "All patients", "New registered patients", "Deleted patients"
  // When he click on one of these tab, the content will be changed
  // Then he can type some name in "Search patient" box to narrow down the list of patients he want to check
  // And he can click on pagination bottom tab to check the next / previous page
  // And he can click on "Add new patient" to create new patient,
  // click on "Export" to export the searched patient list
  // click on "Import" to import one or many patients

  // Scenario: As a system user, he can create new patient
  // Given the user is on Organization detail, he click on one of its premises
  // Then he can see the button "Add New Patient" on top right conner
  // Then he can click this button and new right slide is displayed
  // ...

  // Scenario: As a system user, he can export patient list
  // Given the user is on Organization detail, he click on one of its premises
  // Then he can see the button "Export" on top right conner
  // Then he can click on this button and he can export list of patient as csv file

  // Scenario: As a system user, he can import patient list
  // Given the user is on Organization detail, he click on one of its premises
  // Then he can see the button "Import" on top right conner
  // Then he can click on this button and a new popup is displayed
  // Then he can choose the csv file to import list of patient with right format
  // Then he click on "Import" button on this popup, the process will be run
  // After that, new patients will be displayed on list
});
