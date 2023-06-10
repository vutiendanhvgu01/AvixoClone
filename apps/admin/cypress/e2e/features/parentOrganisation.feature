Feature: Parent Organisation 
    A user should be able to see the list, detail, search bar, 
    and able to create a new parent organisations 

    Scenario: User able to see dashboard and list of organisation 
      Given the user is on Parent Organisations page
      Then the user can see list of organisations

      And the menu item of Parent Organisations is highlighted
      And search box is displayed
      And on the screen, he sees the Actions button with 3 options: Add Organisation, Add Premise, Add Practitioner
      And he should see 4 tabs: Parent Organisation, Organisations, Premises, Pratitioners

      When he clicks on Organisations tab
      Then he should see list of child organisations that belongs to this parent organisation as cards

      When he clicks on Premises tab
      Then he should see list of premises that belongs to this parent organisation as cards

      When he clicks on Practitioners tab
      Then he should see list of practitioners as table

    Scenario: User able to see detail of organisation 
      Given the user is on Parent Organisations page
      When the user click one of the organisation
      Then he should see 5 blocks: Organisation Information, Contact Information, Finance Information, Timezone, Qualification
      And details block is shown same information as header


    # NOTES: this code will continue until the feature for adding a new organization is STABLE.
    # Scenario: As a system user, when go to parent organisation page, he can click on "New Parent Organisation" button to create new Parent organisation
      # Given the user is on Parent Organisations page

      # When he click on Add Organisation button to show a float panel to create a parent organisation
      # And he fills in the required fields 
      # And also fills in the optional fields
      # And can change or remove avatar 
      # And he click on Next button to fill in Contact Information form
      # NOTES: the step definitions will continue after that step.

      # And On "Contact Information" form, he can update mobile number with country code, update email, address
      # And he can add / remove new phones, emails, addresses
      # And he click on "Next" button to fill in "Finance Information" form

      # And he can update tax and currency as required fields
      # And After that, he can click on "Next" button to fill in "Timezone" form
      # And he can click on "Back" button to view and edit the "Finance Information" value

      # And he can update timezone required fields
      # And After that, he can click on "Next" button to fill in "Qualification" form
      # And he can click on "Back" button to view and edit the "Timezone" value
    
      # And After filling all required fields, he can click on "Add organisation" to submit the form
      # Then the new parent organisation can be displayed on the list
      # And a small popup is displayed on bottom right page conn    
    
      # Scenario: As a system user, after filling all fields, but he does not click on "Add parent organisation",
      # Given the user already filling all required fields
      # When he click on the cancel or x button
      # Then no new organisation is created and no new organisation is displayed on the list

    # Scenario: As a system user, he can not create new parent organisation if atlest one required field is not filled
    #   Given the user is on "Parent organisations" page
    #   Then he can click on "New Parent organisation" button to show a float panel to create a parent organisation
    #   And he fill many fields but does not fill atleast one required field
    #   Then he can not submit the form by click on "Add parent organisation" butt 
    # NOTES: for this scenario still there are no validation for required fields
