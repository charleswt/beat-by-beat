# beat-by-beat

In this beat-by-beat project, you will work with a group to build a full-stack crowdfunding app using Node.js, Express.js, Sequelize, Handlebars.js, and MVC architecture.

## User Stories

* As a user, I want to be able to create an account.

* As a registered user, I want to login and search for beats.

* As a user, I want to see a list of beats which I had search for.

### Acceptance Criteria

* The homepage route `/`  renders a list of all projects from the database.

* The route `/signup`  renders a form to create a new account.

* The `/profile/:id` route renders an individual saved search details based on the route parameter id. -CHK

* The route `/login` renders a form to log in.

* The existing user can enter their credentials on the login page to create a session on the server.

* The new user can create an account on the signup page and then be immediately logged in with a session.

* The route `/profile` or `/dashboard` renders the logged-in user's previously searched beats.

* The logged in user should be able to visit the `/profile` or `/dashboard` route.

* The user on the profile or dashboard page can use the form to create a new beat in the database.

* The logged-in user can select a "Logout" button to remove their session.

* The session for a logged-in user expires after a set time. - CHK

* The code is organized using MVC architecture.

* The views are rendered with Handlebars.js templates.

## Specifications 

* The database models have the following fields and associations:

  * `User`

    * `id`: primary key

    * `name`

    * `email`

    * `password`

  * `Beats`

    * `id`: primary key

    * `name`

    * `description`

    * `date_created`

    * `user_id`: foreign key that references `User.id`

  * Users have many saves beats belong to a user.

    * If a user is deleted, all associated beats are also deleted.

 ## Technologies Used

* node.js
* Express.js
* Sequelize
* Handlebars.js
* MVC architecture

## Roles and Responsibilities

Judith Hernandez: Front End: Working with Style and Landing Page
Robert Solorzano: Backend: Working with API fetch/response
lucy(Jihyeon) kwon: Working on error handling routes
Charles Tiffany: Working on user routes and home routes
Harika Patha: Quality Assurance: Testing & Documentation, aboutUs handlebars

## Challenges

* Chk with the team

## Source Code Repository

* https://github.com/charleswt/beat-by-beat 

