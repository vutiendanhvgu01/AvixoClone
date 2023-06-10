Feature: Patient Dashboard 
    A user should be able to access all information about the patient

  Background:
    Given User visits patient list and select the first patient to view his dashboard

    Scenario: User goes to patient list page and select the first patient
      Then the patient dashboard is displayed, and it contains 5 boxes: Patient Information, Allergy, Immunisation, Appoinment, Invoices
      And check information between header and Patient Information card

    Scenario: User goes to patient detail
      When User click on Patient Information
      Then user should be directed to patient detail

    Scenario: User goes to patient allergy page
      When User click on Allergy
      Then user should be directed to allergy page

    Scenario: User goes to patient immunisation page
      When User click on Immunisation
      Then user should be directed to immunisation page

    Scenario: User goes to patient medical record page
      When User click on Medical Record button
      Then user should be directed to medical record page