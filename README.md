# Project 2: XXX

Write the documentation of your project here. Do not include your personal
details (e.g. name or student number).

Remember to include the address of the online location where your project is
running as it is a key part of the submission.

`deno test --allow-net --allow-env --allow-read tests.js`


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

* ~~GET request to /topics/:id shows a page that has a form for adding a question for the given topic.~~
* ~~The form asks for the question text (textarea, name must be question_text).~~ 
* ~~The form is submitted as a POST request to the path /topics/:id/questions, where :id corresponds to the topic.~~
* ~~Upon submitting the form to /topics/:id/questions, the question is added to the database pending validation.~~
* ~~For validation, the question_text must contain at least one character.~~ 
* ~~If validation fails, the page shows validation errors and the entered data is populated to the form field.~~
* ~~If the validation does not fail, the question is stored to the database, and the user is redirected to /topics/:id, where :id corresponds to the id of the topic.~~
* ~~Note! When adding the question, remember to assign the current user and the current topic to the added question.~~
* ~~In addition to showing a form, the page at /topics/:id lists all the questions on the topic.~~ 
* ~~The list contains question texts which are links to specific question pages.~~ 
* ~~Clicking on a link moves the user to the path /topics/:id/questions/:qId, where :id refers to the database id of the topic and :qId refers to the database id of the question whose link was clicked.~~

Viewing a question and adding answer options

* ~~The page at /topics/:id/questions/:qId shows the question text for the question with database id :qId.~~
* ~~The page at /topics/:id/questions/:qId shows also a form that can be used to add an answer option.~~
* ~~The form includes a textarea for option text (textarea name must be option_text) and a checkbox for correctness (input with type checkbox, name must be is_correct).~~
* ~~The form is submitted using a POST request to the path /topics/:id/questions/:qId/options, where :id refers to the topic and :qId refers to the question for which the answer option is being added to.~~
* ~~When an answer option is being added, the content is validated. The option_text must contain at least one character. If validation of the submitted answer option fails, the page shows validation errors and the entered data is populated to the form fields.~~
* ~~If the validation does not fail, the answer option is stored to the database, and the user is redirected to /topics/:id/questions/:qId.~~
* ~~Note! When checking whether a checkbox was selected or not, check whether the particular name (in this case is_correct) is in the request body.~~
* ~~In addition to the question text and the form for adding answer options, the page at /topics/:id/questions/:qId also lists answer options for the question with database id :qId.~~
* ~~For each answer option, option text and correctness of the option is shown.~~

Removing answer options and questions

* ~~For each answer option listed at /topics/:tId/questions/:qId~~
* ~~the page also shows a button with the text "Delete option" that is used to remove the specific answer option.~~
* ~~Clicking the button makes a POST request to the path /topics/:tId/questions/:qId/options/:oId/delete,~~ 
* ~~where :qId is the database id of the question and :oId is the database id of the answer option, which leads to the answer option being removed from the database.~~ 
* ~~Removing the answer option redirects the user to /topics/:tId/questions/:qId.~~ ~~Note! If there are question answers, the question answers for the specific answer option are also removed.~~
* ~~If there are no answer options, the page at /topics/:tId/questions/:qId shows a button with the text "Delete question".~~ 
* ~~Clicking the button makes a POST request to the path /topics/:tId/questions/:qId/delete, where :qId is the database id of the question, which leads to the question being deleted.~~ 
* ~~Deleting the question redirects the user to /topics/:tId.~~
* ~~Any authenticated user can remove answer options and questions.~~

Asking questions

* ~~When making a GET request to the path at /quiz, the user is shown the list of topics currently available in the database sorted alphabetically.~~ 
* ~~Each item in the list is a link, which links the user to /quiz/:tId, where :tId corresponds to the database id of the topic that the user selected.~~
* ~~When accessing /quiz/:tId, a random question for the topic identified with tId is chosen from the database, and the user is redirected to /quiz/:tId/questions/:qId,~~
* ~~where :qId refers to the database id of the randomly chosen question. The random question is chosen from all questions for the topic.~~
* If there are no questions for the topic, the user is informed that there are no questions so far for the topic.

* ~~When making a GET request to the path at /quiz/:tId/questions/:qId, where :qId refers to the database id of a specific question, the user is shown the question text and the answer options.~~
* ~~Each answer option has a button with text "Choose". Clicking on the button makes a POST request to the path /quiz/:tId/questions/:qId/options/:oId,~~
* ~~where :qId is the database identifier of the question and :oId is the id of the selected answer option.~~
* ~~When a POST request is made to the path /quiz/:tId/questions/:qId/options/:oId, the question answer with the identifier of the user is stored to the database.~~
* ~~Then, if the chosen answer option was correct, the user is redirected to /quiz/:tId/questions/:qId/correct where the user is shown a page with the text "Correct!".~~
* ~~The page also has a link with the text "Next question" that moves the user to the path /quiz/:tId. On the other hand,~~
* ~~if the chosen answer option was incorrect, the user is redirected to /quiz/:tId/questions/:qId/incorrect where the user is shown a page with the text "Incorrect!".~~
* The page also has the text for the correct answer option, e.g. stating that "The correct option was option text", where option text is the text for the correct option.
* ~~The page also has a link with the text "Next question" that moves the user to the path /quiz/:tId.~~


Main page

~~* The main page of the application is available at the root path /.~~
* The main page contains a brief description of the application, application statistics, and links for registration and login.
* The application statistics show the total number of topics, questions, and question answers (i.e. answers from users).


