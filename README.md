# Project 2: XXX

Write the documentation of your project here. Do not include your personal
details (e.g. name or student number).

Remember to include the address of the online location where your project is
running as it is a key part of the submission.


### Functionality

Login functionality

* ~~When making a GET request to the path at /auth/login, the application shows a login form with two fields and a submit button.~~ 
* ~~The login form asks for email (use input type email, name must be email) and password (use input type password, name must be password).~~ 
* ~~Submitting the form makes a POST request to the path /auth/login.~~
* ~~When making a POST request to the path at /auth/login, i.e. attempting to login, the application verifies the credentials against data in the database. If the entered credentials match those in the database, the user retrieved from the database is added to the session, and the user is redirected to /topics.~~
* ~~If the verification of entered credentials fail, the user is shown the login page with an error message.~~

Registration functionality

When making a GET request to the path at /auth/register, the application shows a registration form with two fields and a submit button. The registration form asks for email (use input type email, name must be email) and password (use input type password, name must be password). Submitting the form makes a POST request to the path /auth/register.
When making a POST request to the path at /auth/register, i.e. attempting to register a user, the submitted data is validated on the server. The email must be a valid email and the password must contain at least 4 characters. If validation fails, the user is shown the registration form with validation errors and the the email field populated. If validation succeeds, a new user is created (the password is hashed using bcrypt) and the user is redirected to /auth/login.


