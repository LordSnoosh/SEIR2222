<img src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80">

# React Movies - Part 1

## Intro

Following along with what you did today in the MERN-Stack Infrastructure - Part 2 lesson, you will be creating your own `react-movies` application!

You will need to create a new React CodeSandbox project named `react-movies`.

This application will act as a movie & actor list for the list of movies that will be provided to you.

Here is a link to an example of the final product, but do your best to style the page to your liking!

[React Movies Demo](https://7umcq.csb.app/)


## Exercises

1. Start by creating the skeleton page-level components for each page of the application below:
	- Login Page
	- Movie Index Page
	- Actor Index Page

2. Set up a `user` state variable that will keep track of the user.
	- The "login" functionality will consist of a user entering any username in the input

3. Conditionally render based on the `user` state variable.
	- When the page first loads, you should see a login page where a user can enter a username in an input
	- Once the user has entered a username and clicked submit, they should be redirected to the Movie Index Page
	- Once on the Movie Index Page, the user's username should be displayed at the top of the page

4. Setup client-side routing for the Movie Index Page and Actor Index Page.
	- Once a user has logged-in, they should see the Movie Index Page with 2 buttons or navigation links to switch pages, AKA one button for the Movie Index, one button for Actor Index (see [demo](https://7umcq.csb.app/))


## Deliverable

At this point in the application, you should be able to "login" and see your username displayed on the page, as well as having the basic navigation of your site setup.

#### The final version of `react-movies` (parts 1 thru 3 combined) will be a deliverable, so do each part and don't fall behind.
