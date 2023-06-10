Feature: Authentication functionality
    In order to access hward portal
    As a Hospital staff registered user
    I want to be able to log in of the application

    Scenario: All fields required
        Given I am at the login page
        When I click the login button
        Then I should see an error required message


    Scenario: Fails to log in with Invalid Credentials
        Given I am at the login page
        When I enter invalid credentials
        And I click the login button
        Then I should see an error invalid message

    Scenario: Forgot Password
        Given I am at the login page
        When I click on the forgot password link
        Then a text should be appear in the validation errors


    Scenario: Logs in with valid credentials
        Given I am at the login page
        When I enter valid credentials
        And I click the login button
        Then I should login to 'cases' page


    Scenario: Remember the user after reloading the page
        Given I am logged in to 'cases' page
        When I reload the page
        Then I should still be logged in
    
    Scenario: Logout
        Given I am logged in to 'cases' page
        When I click logout button
        Then I should logout from the application

