Feature: Feature name

    In order to enrol patient
    As a Hospital staff registered user
    I want to be able to enrol new patient and automatically open case 

    Background:
        Given I am logged in to 'cases' page
        When I am open enrol new patient form

    Scenario: Enrol patient with missing mandatory fields
        And I do not enter fullname or NRIC or patient contact
        And I click the enrol patient button
        Then I should see an error message on the NRIC and patient contact fields


    Scenario: Enrol patient with all fields filled
        And I enter all fields including non mandatory
        And I click the enrol patient button
        Then the new patient is exist
