Feature: login


    Scenario: valid user logs in
        Given user has browsed to the login page
        When user logs in with username "demo@demo.demo" and password "demo" using the webUI
        Then the user should be in dashboard page
    
    Scenario Outline: Invalid user logs in
        Given user has browsed to the login page 
        When user logs in with username "<username>" and password "<password>" using the webUI
        Then error message "<error_message>" should be displayed in the webUI

        Examples:
            | username       | password | error_message              |
            | same           | sg123    | Invalid e-mail or username |
            | game           | demo     | Invalid e-mail or username |
            | demo@demo.demo | se24     | Invalid password           |

    Scenario: User logs out
        Given the following users has been created:
            | name   | password | email          |
            | user10 | test     | test@test.test |
        And the user has logged in with email "test@test.test" and password "test" 
        When user "user10" logs out using the webUI
        Then the user should be in the login page
