<img src="https://i.imgur.com/IKHxRMa.png">

# MERN-Stack Infrastructure - Part 4

## Learning Objectives

|Students Will Be Able To:|
|---|
| Call "Service" Methods from a Component |
| Make AJAX Requests From an "API" Module Using `fetch` |

## Road Map

- The Plan - Part 4
- Infrastructure - Part 4 of 7

## The Plan - Part 4

In Part 4 we will continue to implement user authentication.

FYI, user authentication requires implementing code that's typical of most features in a MERN-Stack app including: 

- Responding to user interaction by handling events.
- Making AJAX requests to the server.
- Updating state using JSON data returned from the server.

So, when we're finally done with part 7, implementing the main functionality of an app, e.g., placing new orders, will be more of the same!

**Part 4 - Implementing Token-Based Auth (continued):**
  1. Review of `fetch`
  2. Review of handling promises with `async`/`await`
  3. Make the AJAX request to sign-up
  4. Define the server-side route for signing-up
  5. Define the **controllers/api/users.js** module
  6. Mock up the `create` (sign-up) controller action

## 1. Review of `fetch`

Back in Unit 2, we installed and used `node-fetch` to make HTTP requests from the Express server to the GitHub API.

Our browsers have [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) built-in!

We're going to work with `fetch` in the Console of Chrome's DevTools.

First, browse to the [JSONPlaceholder fake REST API](https://jsonplaceholder.typicode.com/).

> Note:  The JSONPlaceholder API will reject requests coming from other sites (it checks the headers in the request).

In the Console:

```
> let resPromise = fetch('https://jsonplaceholder.typicode.com/users');
< undefined
> resPromise
< Promise {<fulfilled>: Response}
```

As seen above, invoking the `fetch` function returns a [JS Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that quickly resolves to a response object with properties pertaining to the results of the request. For example:

```
> resPromise.then(response => console.log(response.ok))
  true
< Promise {<fulfilled>: undefined}
```

The response's `ok` property returning `true` means that the request was successful, i.e., it has a [status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) in the 200s.

That `Promise {<fulfilled>: undefined}` is displayed due to the fact that a promise's `then()` method **always** returns another promise.

### So Where's the Data?

The response object has a few methods for accessing the data sitting in the body of the HTTP response.

The [JSONPlaceholder API](https://jsonplaceholder.typicode.com/), like most APIs, responds with JSON data (`content-type: application/json` header).

If the response object has JSON data in its body, the `json()` method is used to retrieve the data:

```
> resPromise.then(res => res.json()).then(data => console.log(data));
< Promise {<pending>}
  (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
```

As you can see, the `json()` method also returns a promise which resolves to the actual data.

We can use `fetch` to make HTTP requests using any HTTP method, include headers and include a data payload which we'll do in a bit when we make a `POST` request to send the sign-up data to the server.

## 2. Review of Handling Promises with `async`/`await`

Again, back when we consumed the GitHub API in Unit 2, we refactored the code from calling `then()` on promises to use [`async`/`await`](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await).

Here was the `then()` based code we used in the GitHub API lesson:

```js
router.get('/', function(req, res, next) {
  const username = req.query.username;
  if (!username) return res.render('index', {userData: null});
  const options = {
    headers: {
      Authorization: `token ${token}`
    }
  };
  let userData;
  // This is a search for a user
  fetch(`${rootURL}users/${username}`, options)
    .then(res => res.json())
    .then(user => {
      userData = user;
      return fetch(userData.repos_url, options);
    })
    .then(res => res.json())
    .then(repos => {
      userData.repos = repos;
      res.render('index', { userData });
    });
});
```

and here was the refactored code using `async`/`await`:

```js
router.get('/', async function (req, res, next) {
  const username = req.query.username;
  if (!username) return res.render('index', { userData: null });
  const options = {
    headers: {
      Authorization: `token ${token}`
    }
  };
  // This is a search for a user
  const userData = await fetch(`${rootURL}users/${username}`, options).then(res => res.json());
  const repos = await fetch(userData.repos_url, options).then(res => res.json());
  userData.repos = repos;
  res.render('index', { userData });
});
```

Quite an improvement in terms of conciseness and readability.  Look how the `await` keyword "pauses" the code until the promise is resolved and causes the promise to return its resolved value allowing us to assign the value to variables as shown with `userData` and `repos` above.

However, in order to use the magical `await` keyword, we must preface its containing function with the `async` keyword - do you see it?

We'll certainly be using `async`/`await` to consume promises as we continue to code `mern-infrastructure`!

## 3. Make the AJAX Request to Sign-Up

Okay, so the state in `<SignUpForm>` is ready to be sent to the server!

As we've discussed, SPAs must communicate via AJAX and we're going to utilize the **users-service.js** and **users-api.js** modules to pull this off.

### Use a `try`/`catch` Block to Catch Errors When Using `async`/`await`

Let's start back in the `handleSubmit` method in **SignUpForm.jsx** by setting up a `try`/`catch` block required to handle errors when using `async`/`await`:

```jsx
handleSubmit = async (evt) => {
  // Prevent form from being submitted to the server
  evt.preventDefault();
  try {
    
  } catch {
    // An error occurred 
    this.setState({ error: 'Sign Up Failed - Try Again' });
  }
};
```

Look how cleanly we are handling a failed sign-up by simply setting the `error` state property!

### Ready the Sign Up Data Payload

<details><summary>❓ There are two extra properties on the <code>state</code> object we don't want to send to the server - what are they?</summary>
<p>

**The `state.error` and `state.confirm` properties.**

</p>
</details>

We never want to directly mutate the `state` object, so let's make a copy of it and delete those properties from it:

```jsx
...
try {
  // We don't want to send the 'error' or 'confirm' property,
  //  so let's make a copy of the state object, then delete them
  const formData = {...this.state};
  delete formData.error;
  delete formData.confirm;

} catch {
...
```

<details><summary>❓ Can you think of another way to create the <code>formData</code> object that excludes the <code>confirm</code> and <code>error</code> properties?</summary>
<p>

```js
const formData = {
  name: this.state.name,
  emai: this.state.email,
  password: this.state.password
};
// or
const {name, email, password} = this.state;
const formData = {name, email, password};
```

</p>
</details>

`formData` is now ready to send to the server. We'll follow the best practice of putting sign up related app logic in the **users-service.js** service module and network logic in the **users-api.js** API module we created last lesson.

### Follow the "Coding Flow"

Even though we don't yet have the following `signUp` service method being invoked, let's continue coding by following the flow from the component to the service method, then to the API/AJAX method...

```
SignUpForm.jsx <--> users-service.js <--> users-api.js <-Internet-> server.js (Express)
```

```jsx
// SignUpForm.jsx

...
try {
  ...
  delete formData.error;
  // The promise returned by the signUp service method 
  // will resolve to the user object included in the
  // payload of the JSON Web Token (JWT)
  const user = await signUp(formData);
  // Baby step!
  console.log(user)
} catch {
...
```

We need to import the non-existent `signUp` method:

```jsx
// SignUpForm.jsx

import { Component } from 'react';
// Add this import
import { signUp } from '../../utilities/users-service';
```

Now let's follow the flow and go code and export the `signUp` method in **users-service.js**:

```js
// users-service.js

export async function signUp(userData) {
  try {
    // Delegate the network request code to the users-api.js API module
    // which will ultimately return a JSON Web Token (JWT)
    const token = await usersAPI.signUp(userData);
    // Baby step by returning whatever is sent back by the server
    return token;
  } catch {
    throw new Error('Invalid Sign Up');
  }
}
```

Let's import the **users-api.js** using a different approach so that you can learn more about ES2015 JS modules...

```jsx
// users-service.js

// Import all named exports attached to a usersAPI object
// This syntax can be helpful documenting where the methods come from 
import * as usersAPI from './users-api';
```

Okay, let's follow the flow and go code and export the `signUp` method in **users-api.js**:

```jsx
// users-api.js

// This is the base path of the Express route we'll define
const BASE_URL = '/api/users';

export async function signUp(userData) {
  // Fetch uses an options object as a second arg to make requests
  // other than basic GET requests, include data, headers, etc. 
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // Fetch requires data payloads to be stringified
    // and assigned to a body property on the options object
    body: JSON.stringify(userData)
  });
  // Check if request was successful
  if (res.ok) {
    // res.json() will resolve to the JWT
    return res.json();
  } else {
    throw new Error('Invalid Sign Up');
  }
}
```

> IMPORTANT:  The fetch method will not raise an error unless there's a network failure. This is why we need to check the `res.ok` property to see if the server returned a successful response (status code in the 200s).

Yes, that was a lot to follow.  Don't worry, you'll get used to coding the flow from component to service module to API module - hang in there!

Open the Network tab of Chrome's DevTools, then attempt to sign up.  Inspect the request!

<img src="https://i.imgur.com/NSTHblW.png">

<details><summary>❓ What does that <code>404</code> mean?</summary>
<p>

**There's no route defined on the server that matches the HTTP request.**

</p>
</details>

To the Express server code we go...

## 4. Define the Server-Side Route for Signing-Up

Now that the AJAX request is being made from the browser, we need a route defined on the server that matches that request!

### Create the Router Module

Just like in Unit 2, we'll use an Express router module to define routes for each data resource. However, we want to help other developers know that the router is designed to respond to AJAX requests with JSON instead of rendering a template or redirecting.

To do so, we'll namespace these routes by prefacing them with `/api`.  Additionally, we will create the route module within a `routes/api` folder:

```
mkdir routes/api
```

Now let's create the router module dedicated to our **users** data resource:

```
touch routes/api/users.js
```

> Note: This namespacing business may seem overkill until you realize that its possible to include a traditional web app that includes traditional routes/controllers/views right alongside the SPA/API code! For example, you might want to code a quick admin view that returns the status of the SPA - those routes & controllers would not be namespaced with `/api` and the controller actions would respond by rendering EJS templates that return HTML instead of JSON.

### Define the Route

Hopefully, this code looks somewhat familiar:

```js
const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');

// POST /api/users
router.post('/', usersCtrl.create);

module.exports = router;
```

### Mount the Router

With the router being exported, we now can mount it in **server.js**:

```js
// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
```

> Note how we've eliminated a line of code by requiring the router module inline.

Mapping the route to the non-existent controller action/function expectedly makes the Express server unhappy...

## 5. Define the **controllers/api/users.js** Module

Just like the route module, we'll namespace our controller modules as well...

#### 💪 Practice Exercise - Stub Up the Controller Module and Action (3 minutes)

1. Make a **controllers/api** folder.
2. Create the **controllers/api/users.js** module.
3. Stub up and export the `create` controller action.

    > Hint: Remember how we used `module.exports` to export an object in Node modules?

## 6. Mock up the `create` (Sign-Up) Controller Action

Ultimately we will need to return a JSON Web Token (JWT) from the controller action after the user is added to the database.

We'll code the `User` model and see how we create the JWT in the next lesson. For now, let's baby step and return some JSON that we can verify back in the React app:

```js
module.exports = {
  create
};

function create(req, res) {
  // Baby step...
  res.json({
    user: {
      name: req.body.name,
      email: req.body.email
    }
  });
}
```

That should complete the flow from component to server and back!

Open the Console tab of Chrome's DevTools, then attempt to sign up.

Rejoice!

<img src="https://i.imgur.com/9qsfE1d.png">

As a reminder, what we returned from the server is being logged by this line of code in the `<SignUpForm>` component:

```jsx
...
const user = await signUp(formData);
// Baby step!
console.log(user)
...
```

#### Congrats! On to the lab!

