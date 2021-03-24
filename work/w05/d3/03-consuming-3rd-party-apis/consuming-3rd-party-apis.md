
# Consuming 3rd Party API<small>s</small>

<img src="https://i.imgur.com/ukTEfjF.png" width="900">

## Learning Objectives

| Students will be able to: |
|---|
| Consume a third-party API from an Express backend |
| Render an API's data in an EJS Template |
| Make multiple requests to retrieve "detail" data |

## Road Map

1. What kind of API are we talking about?
1. Why consume third-party APIs?
1. Research available APIs
1. I have a simple request
1. Different architectural approaches
1. Preview the completed app
1. Setup
1. Code the `index.ejs`
1. Accessing the username
1. Install and require the `node-fetch` module
1. Review the GitHub API docs
1. Access Tokens
1. Fetching data from GitHub's API
1. Details, I want details!
1. Essential Questions
1. Further Study

## What kind of API are we talking about?

The term _API_ is quite vague and used within several contexts.

The acronym actually stands for **Application Programming Interface**.

_Application Programming Interfaces_ originally, and still do, allow  programmers to use the functionality of a library, a framework, an operating system, or any piece of software that exposes its functionality through its defined interface.

However, in today's lesson we're interested in external (third-party) APIs that respond with data when we send them requests.  

## Why consume third-party APIs?

There's lots of useful data being exposed via APIs across the Internet - often free of charge!

Our apps can consume this data in useful and interesting ways!

## 💪 Research Available APIs

Google for third-party data APIs that **provide data** (not a service).

Reply to the Slack message with the following about the API you found the most interesting:

- The name of the API
- What kind of data can be consumed
- It's access requirements and limitations (free, usage quotas, etc.)

## I have a simple request

It only takes a simple GET request to one of the API's available endpoints to retrieve data.

Since we can issue GET requests straight from the browser's address bar, let's retrieve all the data you'd ever want to know about Bulbasaur:

```
https://pokeapi.co/api/v2/pokemon/1
```

<details><summary>❓ What data format was returned?</summary>
<p><strong>JSON (JavaScript Object Notation)</strong></p>
</details>

## Different architectural approaches

When accessing APIs, there are a few different architectural approaches we can take:

<img src="https://i.imgur.com/Hflu0K0.png">

- The top-approach is the recommended approach with traditional web apps that respond to client requests with a new HTML page.  Access tokens remain secure on the server.

- The middle-approach is recommended for single-page apps (SPAs) like the MERN-stack apps we'll develop in unit 4.

- The bottom-approach is not recommended because access tokens would have to be sent to the browser.  Because of this, many APIs will disallow this architecture by not implementing [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) (discussed in a later lesson) and the request will fail.

Since we will be developing traditional web apps in this and next unit, we'll use the **top-approach** in this lesson.

## Preview the completed application

Allow me to demo what we'll be building today.

The app we'll build today consumes the GitHub API and displays repos for the entered GH Username.

If one of the repos is clicked, that repo is opened in a new browser tab.

The app only has a single view (`index.ejs`).

## Setup

Once again, we're going to use Express Generator to scaffold a basic Express app.

Hints:

- Be sure to specify the EJS view engine.

- Name the app `github-users`.

- Kind of prefer `server.js` instead of `app.js` too.

- Don't forget to install the Node modules.

- Make sure to test it out when you're done.

## Code the `index.ejs`

We're going to use the existing `index.ejs`.  For now, we will want to:

- Adjust the existing boilerplate.
	
- Add the form for submitting GitHub usernames

Later, when we see what data comes back from the API, we'll know how to better render it. 

### Adjust the boilerplate

We're adding [Bootstrap](http://getbootstrap.com/getting-started/), changing the title and adding a Jumbotron:

```html
<head>
  <title>GitHub Users</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
  <link rel='stylesheet' href='/stylesheets/style.css' />
</head>
<body class="container">
  <h1 class="jumbotron text-center">GitHub Users</h1>
    
</body>
``` 

Next, we need a form to submit a GitHub username to retrieve repos for:

```html
<div class="row">
  <div class="col-xs-6 col-xs-offset-6">
    <form action="/" method="GET">
      <div class="input-group">
        <input type="text" name="username" class="form-control"
          placeholder="Enter a GitHub Username">
        <span class="input-group-btn">
          <button class="btn btn-success" type="submit">Go!</button>
        </span>
      </div>
    </form>
  </div>
</div>	
```

Note that we're using a GET method instead of POST.

The rule of thumb is - if you're not changing data on the server, such as using the form to perform a search, use a GET instead of POST.

However, we access data submitted to the server differently when GET is used...

## Accessing the username

When using a GET in a form, the input data is sent to the server using a query string in the URL.

The [Express docs](https://expressjs.com/en/4x/api.html#req.query) show that we access the inputs via the `req.query` object.

Like `req.params`, `req.query` is available without having to mount any middleware.

Let's take a baby step by logging out to the server terminal what was typed in the input.  In **routes/index.js**:

```js
router.get('/', function(req, res, next) {
  const username = req.query.username;
  console.log(`username: ${username}`);
  res.render('index');
});
```

Cool!  Now let's see how we're going to be able to make HTTP requests from the server...

## Install and require the `node-fetch` module

In order to make HTTP requests from our Express server to the GitHub API, we'll want to install and require an NPM module named [node-fetch](https://www.npmjs.com/package/node-fetch), which is a promise-based HTTP request client that mimics the [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) method we can use in the browser:

```
$ npm install node-fetch
```

Now lets require it in **routes/index.js**:

```js
var express = require('express');
var router = express.Router();

// The fetch variable will be a function that behaves like fetch in the browser
const fetch = require('node-fetch');
```

Now, we need to review the documentation for the GitHub API...

## 💪 Review the GitHub API docs

Review the [GitHub API](https://developer.github.com/v3/) docs and upon discovery, slack a reply for the following:

1. What is the API's **Root Endpoint**?  The root endpoint is the first part of the API's URL that remains fixed. Paths are then appended to the root endpoint to form other endpoints for specific requests.

2. Are there limits to the number of times we can "hit" the API?

After identifying the _root endpoint_, let's use the browser to make a GET request using that endpoint.

GitHub has written their API so that when we do a GET request on the _root endpoint_, it returns JSON representing all endpoints available.

Scrolling down toward the bottom will reveal a couple of endpoints that we are going to use - so take note of them:

- **user\_url**: This endpoint returns some info about a user, such as a link to their avatar...

- **user\_repositories\_url**: This endpoint returns an array of repositories the user is involved with.

> Note:  This "self-discovery" is a great feature of the GitHub API, we won't always be so lucky.

## Access Tokens

So, the answer to this question...

> Are there limits to the number of times we can "hit" the API?

Is **YES**.

According to their docs, GitHub limits anonymous user's requests to only 60 per hour, tracked by IP address; and guess what, because we are all on the same wireless network, the API will see us as all having the same IP address.

Yup, we're going to need to obtain an access token so that we can make up to 5,000 requests/hr.

### Obtaining an Access Token

According to the docs, we can obtain personal use tokens directly from our personal GitHub accounts:

- Make sure you are logged in to your personal GitHub account and go to _settings_, then click _Developer settings_ on the left.

- Now select _Personal access tokens_ from the menu at the bottom-left.

- Click the _Generate new token_ button.

- Enter a description and click the _Generate token_ button at the bottom. There is no need to select any of the scopes listed.

- Copy your token to the clipboard.

### Protecting Access Tokens & other "secrets"

It's extremely important that we don't expose tokens, keys, database connection strings, or other secrets in our source code (or send them to the browser).

We can "hide" our secrets by keeping them in a file that is _gitignored_, i.e., a file that is not ever pushed to the repo.

> Note:  If you followed the _Configuring a Global git ignore_ instructions during Installfest, you're all set.

The name of the file typically used for holding secrets is `.env`.

The `.env` file will be processed within `server.js` and its `key=value` pairs will be merged into the Node app's environment variables.

To get started, we'll need to install the module that will process the `.env` file

```
$ npm install dotenv
```
	
Then all we have to do is add this code near the top of **server.js**:

```js
var logger = require('morgan');
// load secrets from .env file
require('dotenv').config();
``` 

Next, create a `.env` file and add a variable for your token:

```
GITHUB_TOKEN=1a1596cfe4484ff...
```

No spaces please!

The name of the key is your call, but uppercase with underscores between words is a best practice.

Now you will be able to access the token in code like this:

```js
// Each entry in .env will become a property on process.env
const token = process.env.GITHUB_TOKEN;
```

Go ahead and add the above line of code within **routes/index.js**:

```js
const fetch = require('node-fetch');

// Add the following line of code
const token = process.env.GITHUB_TOKEN;
```

## Fetching data from GitHub's API

When we submit the GitHub username in our app our goal is to display the user's:

-  GitHub username

-  Avatar

-  A list of their repos (as hyperlinks that open the repo home pages in new tab.
	
Earlier we discovered the **user\_url** endpoint that returns general info for a username along with other endpoints that drill into that user's resources.

The **user\_url** endpoint was documented as `https://api.github.com/users/{user}`.

> Note: Any segment that is in curly braces, such as `{user}` shown above, is a named parameter and is where we need to provide actual value for the placeholder.

First, let's define a variable to hold the _root endpoint_ in **routes/index.js**:

```js
const fetch = require('node-fetch');

const token = process.env.token;

// Add the line below
const rootURL = 'https://api.github.com/';
```

### First Attempt to Call the API

Now let's use the `node-fetch` module (which returned a function we assigned to a `fetch` variable) to send a GET request to the **user\_url** endpoint for the submitted username and render the entire JSON response.  Still in **routes/index.js**:

```js
router.get('/', function(req, res, next) {
  const username = req.query.username;
  // If this is not a "search", just render the index view
  if (!username) return res.render('index', {userData: null});
  // For now, we'll pass the token in a querystring
  fetch(`${rootURL}users/${username}?access_token=${token}`)
    .then(res => res.json())
    .then(userData => {
      res.render('index', { userData });
    });
});
```

> We'll ignore the best practice of creating a separate controller module - let's be rebels this lesson!

For now, we're using the simple option of the `fetch` function that:

- Takes a URL (string)
- Sends a `GET` request to that URL, and
- Returns a promise that resolves to a [response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object.

However, to obtain the data sent back in the body of the response, we need to call the response object's `json()` method which returns another promise that resolves to the data.

Since we're passing the content returned from the request to our **index.ejs**.  Let's display it:

```html
  <!-- new HTML just above closing body tag -->
  <hr>
  <div class="row col-xs-8 col-xs-offset-2">
    <% if (userData) { %>
      <!-- If we don't stringify the data, we'll just see [object Object] - see Further Study section -->
      <%= JSON.stringify(userData) %>
    <% } else { %>
      <h3 class="text-center text-info">
        Submit a GitHub username!
      </h3>
    <% } %>
  </div>
</body>
```

Make sure nodemon is serving our app and try submitting your GitHub username.

We're on our way!

### Refactor to Send Token in a Header Instead

The `fetch` function accepts an optional **options** object that enables us to:

- Specify any HTTP method (fetch defaults to a GET)
- Add headers to the HTTP request
- Send data in the body of the request

Let's refactor to pass the token in a header instead of a query string which is a better practice...

Here's the refactored code:

```js
router.get('/', function(req, res, next) {
  const username = req.query.username;
  if (!username) return res.render('index', {userData: null});
  // Define an object that will also come in handy later
  const options = {
    headers: {
      Authorization: `token ${token}`
    }
  };
  // Next line has been refactored
  fetch(`${rootURL}users/${username}`, options)
    .then(res => res.json())
    .then(userData => {
      res.render('index', { userData });
    });
});
```

### Examining the returned data

Examining the data we'll see that:

- The `login` property holds the username, and
- The `avatar_url` property points to user's avatar image

So now we can improve our view a bit to render the username and display the avatar using a Bootstrap **panel**:

```html
<% if (userData) { %>
  <div class="panel panel-default">
    <div class="panel-heading text-center">
      <img src="<%= userData.avatar_url %>"
        class="img-circle" width="300">
      <h2><%= userData.login %></h2>
    </div>
    <div class="panel-body">
      <h3>Repos:</h3>
      need to list repos here...
    </div>
  </div>
<% } else { %>
```

### Finally - looking good!

Not looking too bad.  Now we need to list the user's repositories.

💪 **Check out the userData object's properties and Slack the endpoint we can use to retrieve the repos for the user.**

Now it's time to make a second request for the details...

## Details, I want details!

When consuming APIs, it may be necessary to make multiple requests to different endpoints to fetch all of the data you need before rendering.

Multiple requests can be chained as follows:

```js
// other code above

fetch(`${rootURL}users/${username}`, options)
  .then(userData => {
    // return the promise to be handled by the next .then
    return fetch(userData.repos_url, options);
  })
  .then(res => res.json())
  .then(repos => {
    // let's see what properties a repo has...
    console.log(repos[0]);
    // Houston, we have a problem!
    res.render('index', { userData });
  });
```

We have a scope issue because `userData` is not in scope in that last function!

A solution would be to define the `userData` variable above & outside of those fetch callback functions.

Be careful doing the following refactor, some names have been changed to protect the innocent...

```js
// other code above

let userData;
fetch(`${rootURL}users/${username}`, options)
  .then(user => {
    userData = user;
    // return the promise to be handled by the next .then
    return fetch(user.repos_url, options);
  })
  .then(res => res.json())
  .then(repos => {
    // let's see what properties a repo has...
    console.log(repos[0]);
    // add a repos property to userData that we are passing to be rendered
    userData.repos = repos;
    res.render('index', { userData });
  });
```

That should do the trick!

BTW, a bleeding edge way to resolve the scoping issue would be to use [async/await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await).

### Rendering the Repos

Okay, we're logging out the first repo in the array so that we could see what properties are in there - and there's a bunch!

However, this app only needs the `name` and the `html_url` properties.

Bootstrap has a nice **List Group** component that's great for listing links:

```html
<div class="panel-body">
  <h3>Repos:</h3>
  <!-- new stuff below -->
  <div class="list-group">
    <% userData.repos.forEach(function(repo) { %>
      <a href="<%= repo.html_url %>" target="_blank"
        class="list-group-item">
        <%= repo.name %>
      </a>
    <% }); %>
  </div>
  <!-- new stuff above -->
</div>
```

##### Congrats on Consuming a Third-party API!

## ❓ Essential Questions

1. **True or False:  There's lots of interesting data available for our apps to consume provided by third-party APIs.**

2. **True or False:  It's important to read the docs for an API before committing to use it for a project.**

3. **What was the name of the Node module we used to make HTTP requests from the Express backend?**

## Further Study

[JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) converts a string into a JS Object and [JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) does just the opposite by converting a JS object into a JSON string.