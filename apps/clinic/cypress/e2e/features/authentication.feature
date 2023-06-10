Feature: Authentication 
    A user should be able to login by use their username and password
    After user entered valid information, he/she can be re-directed to homepage

    Scenario: User enters invalid credentials
      Given the user is on a page with the login fields
      And the user inputs invalid credentials
      When the user clicks the login button
      Then the user is not logged in and display an error message

    Scenario: User doesn't enter username/password or short values
      Given the user is on a page with the login fields
      And the user doesnt inputs username and password
      When the user clicks the login button
      Then the error messages are displayed below fields

    Scenario: User enters valid credentials
      Given the user is on a page with the login fields
      And the user has inputs the valid credential
      When the user clicks the login button
      Then the user successfully logged in the patient page

    Scenario: User click on 'Forgot Password'
      Given the user is on a page with the login fields
      And the user forgets his password
      When the user click on Forgot Password? link to reset password
      Then a text 'Please contact your Clinic Administrator or Avixo Support team to reset your password.' is displayed above login button  

    Scenario: User able to visit the dashboard and logout
      Given the user already logged in
      And the user redirect to the dashboard page
      When the user logout 
      Then the user will redirect to login page 