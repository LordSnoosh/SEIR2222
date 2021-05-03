<img src="https://i.imgur.com/IKHxRMa.png">

# MERN-Stack Infrastructure - Part 7

## Learning Objectives

|Students Will Be Able To:|
|---|
| Send the JWT to the Server in AJAX Requests |
| Validate the JWT and Add the Payload to `req.user` |
| Protect Server-Side Routes that Require A Logged In User |
| Save a Project to a Different GitHub Repo |

## Road Map

- The Plan - Part 7
- Infrastructure - Part 7 of 7 (Yay!)

## The Plan - Part 7

In Part 7 we will will wrap up the basic infrastructure for a MERN-Stack app.

**Part 7 - Implementing Token-Based Auth (continued):**
  1. Send the token with AJAX requests
  2. Check the token on the server and add a `user` property to `req`
  3. Implement middleware to protect server-side routes
  4. Save MERN-Stack infrastructure to a new GH repo

## 1. Send the Token with AJAX Requests

In order to perform user-centric CRUD, the server of course, needs to know who the user is when they make a request.

During the discussion on token-based authentication, we learned that a token, or in our case more specifically a JWT, is used to identify the user.

So how do we include the JWT when sending a request that involves user-centric functionality?

The best practice is to send the token in a header of the request named `Authorization`.

### What Feature Are We Going to Implement?

We could start implementing a user-centric feature of SEI CAFE, however, that would be more work than necessary, after all, we just want to implement the infrastructure of a MERN-Stack app for now.

Instead, we'll simply mock up some functionality...

**AAU, I want to click a button to check the expiration of my log in.**

<details><summary>❓ When implementing new features, where to we start?</summary>
<p>

**With the UI.**

</p>
</details>

### Add a `<button>` to `<OrderHistoryPage>`

We'll add our feature to the `<OrderHistoryPage>`.

#### 💪 Practice Exercise - Add the `<button>` & `onClick` Handler (4 minutes)

1. Add a `<button>` with the content of "**Check When My Login Expires**" below the current `<h1>`.

    > Hint: You must return a single root component/node.

2. Add an `onClick` prop to the `<button>` and assign to it a handler named `handleCheckToken`.

3. Stub up the `handleCheckToken` function and baby step with `alert('clicked');`.

4. Make `handleCheckToken` an `async` function so that we can consume promises using `await`.

<img src="https://i.imgur.com/wXXNEgi.png">

Now, let's continue with the flow leading toward sending an AJAX request that includes the JWT...

### Add the `checkToken` Service Function

You got this...

#### 💪 Practice Exercise - Add the `checkToken` Service Function  (5 minutes)

1. Stub up and export a `checkToken` function in **users-service.js**.

2. Move the `alert('clicked');` from the `handleCheckToken` function to the `checkToken` function just stubbed up.

3. Import the `checkToken` function into **OrderHistoryPage.js** using one of the two syntaxes we've previously used.

4. Invoke the `checkToken` function from the `handleCheckToken` function. Consume the promise that `checkToken` will ultimately return using `await` assigning its resolved value to a variable named `expDate`.

5. After invoking `checkToken` add a `console.log(expDate)`.

6. Verify that clicking still pops up the alert.

### Add the `checkToken` API Function and Call It

Because we'll be making an AJAX request, we'll want to add another `checkToken` function in the **users-api.js** API module that can be called from `checkToken` in the **users-service.js** service module.

However, notice how the existing `signUp` and `login` functions in **users-api.js** aren't very DRY?

Here's a really clean refactor that will DRY things up in a jiffy:

```js
const BASE_URL = '/api/users';

export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

/*--- Helper Functions ---*/

async function sendRequest(url, method = 'GET', payload = null) {
  // Fetch accepts an options object as the 2nd argument
  // used to include a data payload, set headers, etc. 
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }
  const res = await fetch(url, options);
  // res.ok will be false if the status code set to 4xx in the controller action
  if (res.ok) return res.json();
  throw new Error('Bad Request');
}
```

> Tip: Making code more DRY usually consists of recognizing repeated code, identifying what varies between the two or more functions and define those as parameters (inputs) in a new function the existing functions can invoke.

Now we're ready to code the `checkToken` function in **users-api.js** responsible for making the AJAX request to the server:

```js
export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}
```

> Note: The `sendRequest` function always returns a promise and we are passing that promise to the caller of checkToken.

Now we want to call the API module's `checkToken` from within the `checkToken` function in **users-service.js** that we coded earlier.

<details><summary>❓ Looking at <strong>users-service.js</strong>, do we need import <code>checkToken</code> from <strong>users-api.js</strong>?</summary>
<p>

**No, because<br>`import * as usersAPI from './users-api';`<br>already imports all exports.**

</p>
</details>

Let's make the call, replacing the `alert('clicked')`:

```js
export function checkToken() {
  // Just so that you don't forget how to use .then
  return usersAPI.checkToken()
    // checkToken returns a string, but let's 
    // make it a Date object for more flexibility
    .then(dateStr => new Date(dateStr));
}
```

### Refactor `sendRequest` To Send the JWT

Finally, we're going to refactor `sendRequest` in **users-api.js** so that if there's a valid token in local storage, include it with the AJAX request in a header:

```js
// users-api.js

// Add the following import
import { getToken } from './users-service';

...

async function sendRequest(url, method = 'GET', payload = null) {
  ...
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }
  // Add the below code
  const token = getToken();
  if (token) {
    // Ensure the headers object exists
    options.headers = options.headers || {};
    // Add token to an Authorization header
    // Prefacing with 'Bearer' is recommended in the HTTP specification
    options.headers.Authorization = `Bearer ${token}`;
  }
```

Nice, we've got the JWT being sent to the server with AJAX requests!

## 2. Check the Token On the Server and Add a `user` Property To `req`

In Unit 2, we relied heavily on the fact that our OAuth/Passport code assigned the logged in user's document to `req.user`.

We want some of that goodness!

> IMPORTANT: As discussed when token-based auth was introduced, the `req.user` property will contain the user's info from the JWT's payload - it will not be a MongoDB document. If you need to modify the user's document, which should be uncommon, it will have to be retrieved from the database.

### Add the `checkToken` Middleware to **server.js**

As we learned many moons ago, middleware is used to process requests in an Express app.

Yay!  Another opportunity to write a custom middleware function that:

1. Checks if there's a token sent in an `Authorization` header of the HTTP request. For additional flexibility, we'll also check for a token being sent as a query string parameter.
2. Verifies the token is valid and hasn't expired.
3. Decodes the token to obtain the user data from its payload.
4. Then finally, adds the user payload to the Express request object.

First, create the module for the middleware function in the **config** folder:

```
touch config/checkToken.js
```

Now for some fun code:

```js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Check for the token being sent in a header or as a query parameter
  let token = req.get('Authorization') || req.query.token;
  if (token) {
    // Remove the 'Bearer ' if it was included in the token header
    token = token.replace('Bearer ', '');
    // Check if token is valid and not expired
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      // If valid token, decoded will be the token's entire payload
      // If invalid token, err will be set
      req.user = err ? null : decoded.user;  
      // If your app cares... (optional)
      req.exp = err ? null : new Date(decoded.exp * 1000);  
      return next();
    });
  } else {
    // No token was sent
    req.user = null;
    return next();
  }
};
```

Now we need to mount the above middleware function so that it processes every request:

```js
// server.js

...
app.use(express.static(path.join(__dirname, 'build')));

// Middleware to verify token and assign user object of payload to req.user.
// Be sure to mount before routes
app.use(require('./config/checkToken'));

...
```

### Add a Route to Test Out the Goodness

Add the following route to **routes/api/users.js**:

```js
// routes/api/users.js
...
const usersCtrl = require('../../controllers/api/users');

// GET /api/users/check-token
router.get('/check-token', usersCtrl.checkToken);
...
```

<details><summary>❓ What earlier code determined that we are using the path of <code>/check-token</code>?</summary>
<p>

**The `checkToken` function in the users-api.js module.**

</p>
</details>

### Create the `checkToken` Controller Function

Keep following the flow...

```js
// controllers/api/users.js

function checkToken(req, res) {
  // req.user will always be there for you when a token is sent
  console.log('req.user', req.user);
  res.json(req.exp);
}
```

<details><summary>❓ Where did the <code>req.exp</code> property come from?</summary>
<p>

**The checkToken middleware function we just mounted in server.js**

</p>
</details>

That should do it!

<img src="https://i.imgur.com/GgRQELR.png">

Be sure to checkout the `req.user` being logged in the Express server's terminal too:

<img src="https://i.imgur.com/R0NWVoz.png">

# 😍

## 3. Implement Middleware to Protect Server-Side Routes

Any route/controller action that accesses `req.user` needs to ensure that the request is coming from a logged in user.

Yup, another opportunity for a custom middleware function:

```
touch config/ensureLoggedIn.js
```

Doesn't take much code:

```js
// config/ensure/LoggedIn.js

module.exports = function(req, res, next) {
  // Status code of 401 is Unauthorized
  if (!req.user) return res.status(401).json('Unauthorized');
  // A okay
  next();
};
```

Now we can use it within any router module with routes that need to ensure that there's a logged in user.

Let's require it in **routes/api/users.js** and use it to protect the check token functionality we just coded:

```js
// routes/api/users.js

const usersCtrl = require('../../controllers/api/users');
// require the authorization middleware function
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// Insert ensureLoggedIn on all routes that need protecting
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);
```

**Congrats - that wraps up the infrastructure code for a MERN-Stack app!**

## 4. Save MERN-Stack Infrastructure To a New GitHub Repo

You'll definitely want to use the infrastructure we've coded over the last few days to launch your capstone project and likely future MERN-Stack projects as well.

First, let's update the **README.md** to something like:

```
# MERN-Stack Infrastructure

Clone this repo to provide the starter code for a comprehensive MERN-Stack project including token-based authentication.
```

### Reset the Commit History

So that you don't have a bunch of commits made by me, let's start a fresh local repo:

```
rm -rf .git
git init
```

Next, let's ensure that we've committed our code as it stands:

```
git add -A
git commit -m "MERN-Stack Infrastructure"
```

Next, go to your personal GitHub account and create a new repo named whatever you wish.

FYI, I'm going to name mine **mern-infrastructure**:

<img src="https://i.imgur.com/Ue3cPST.png">

Now click to copy the new repo's URL:

<img src="https://i.imgur.com/4KzM8o4.png">

Now let's add a remote that points to the new repo...

### Add the Remote:

We'll need to add a remote so that we can push to the new GH repo in the cloud.

```
git remote add origin <paste the copied url>
```

Now you can push the code:

```
git push origin main
```

> Note:  If your branch is named `master`, you can rename it with `git branch -m main`

That should do it!

### Refresh the Repo

Refreshing the repo should confirm that the repo is ready for cloning when needed!

### Creating Projects in the Future

Here's the process to create a new project that starts with the infrastructure code:

1. Clone the **mern-infrastructure** repo.
2. Rename the newly **mern-infrastructure** folder to the name of your new project.
3. Optionally, update the `"name": "mern-infrastructure"` in **package.json**.
6. Create a new repo on your personal GH account.
7. Copy the GH repo's URL.
8. Update the remote's URL: `git remote set-url origin <paste the copied url>`
9. Push for the first time:  `git push -u origin main`

#### Congrats!
