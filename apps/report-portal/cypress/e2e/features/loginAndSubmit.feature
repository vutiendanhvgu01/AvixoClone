Feature: Login functionality
    In order to access self report portal
    As a registered patient
    I want to be able to log in of the application and submit vitals
    Scenario: Field Required
        Given I am at the login page
        When I click submit button at the login page
        Then I should see an error required message
    
    Scenario: Invalid phone number
        Given I am at the login page
        When I enter invalid phone number
        And I click submit button at the login page
        Then I should see an error invalid phone message
    
    Scenario: Successfully log in and submit vitals
        Given I am logged in to vital submission page
        When I enter all the fields
        Then new vitals record submitted