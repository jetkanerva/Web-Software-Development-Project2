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

* ~~When making a GET request to the path at /auth/register, the application shows a registration form with two fields and a submit button.~~
* ~~The registration form asks for email (use input type email, name must be email) and password (use input type password, name must be password).~~
* ~~Submitting the form makes a POST request to the path /auth/register.~~
* ~~When making a POST request to the path at /auth/register, i.e. attempting to register a user, the submitted data is validated on the server. The email must be a valid email and the password must contain at least 4 characters.~~ 
* ~~If validation fails, the user is shown the registration form with validation errors and the the email field populated.~~ 
~~* If validation succeeds, a new user is created (the password is hashed using bcrypt) and the user is redirected to /auth/login.~~

Creating and removing topics

~~* If the user has been authenticated as an admin, the page at /topics contains a form for adding a topic.~~
~~* The form asks for the name of the topic (input type text, name must be name). The form is submitted as a POST request to the path /topics, where the topic is added to the database.~~
* ~~When a topic is being added, the content is validated. The name of the topic must contain at least one character. If validation of the submitted question fails, the page shows validation errors and the entered data is populated to the form fields.~~
~~* If the validation does not fail, the question is stored to the database, and the user is redirected to /topics.~~
* ~~If the user has been authenticated as an admin, each topic listed on the page /topics has a button with the text Delete next to them.~~ 
* ~~Pressing the button Delete makes a POST request to the path /topics/:id/delete, where :id refers to the database id of that topic.~~ 
* ~~This removes the topic~~, questions on the topic, answer options related to questions on the topic, and the answers given by users to those questions. 
* ~~Once deleting of the topic has been done, the user is redirected to the path /topics.~~
* ~~The application must verify on the server that only admins can create and remove topics.~~

Listing topics

* ~~GET request to /topics shows a page that lists the topics available in the application.~~
* ~~The list contains topic names in alphabetic order, where the names are links to specific topic pages.~~
* ~~Clicking on a link moves the user to the path /topics/:id, where :id refers to the database id of the topic whose link was clicked.~~~~

Creating and listing questions for a topic

* GET request to /topics/:id shows a page that has a form for adding a question for the given topic.
* The form asks for the question text (textarea, name must be question_text). 
* The form is submitted as a POST request to the path /topics/:id/questions, where :id corresponds to the topic.
* Upon submitting the form to /topics/:id/questions, the question is added to the database pending validation.
* For validation, the question_text must contain at least one character. 
* If validation fails, the page shows validation errors and the entered data is populated to the form field.
* If the validation does not fail, the question is stored to the database, and the user is redirected to /topics/:id, where :id corresponds to the id of the topic.
* Note! When adding the question, remember to assign the current user and the current topic to the added question.
* In addition to showing a form, the page at /topics/:id lists all the questions on the topic. 
* The list contains question texts which are links to specific question pages. 
* Clicking on a link moves the user to the path /topics/:id/questions/:qId, where :id refers to the database id of the topic and :qId refers to the database id of the question whose link was clicked.


Main page

~~* The main page of the application is available at the root path /.~~
* The main page contains a brief description of the application, application statistics, and links for registration and login.
* The application statistics show the total number of topics, questions, and question answers (i.e. answers from users).


