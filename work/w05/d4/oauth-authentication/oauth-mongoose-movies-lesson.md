
<img src="https://i.imgur.com/y42RtQC.jpg" width="600">

# OAuth Authentication<br>with<br>Express & Passport

## Learning Objectives

| Students will be able to: |
|---|
| Explain the difference between Authentication & Authorization |
| Identify the advantages OAuth provides for users and businesses |
| Explain what happens when a user clicks "Login with [OAuth Provider]" |
| Add OAuth authentication to an Express app using PassportJS |
| Use Middleware & PassportJS to implement authorization |

## Roadmap

- Intro to Authentication
- Why OAuth?
- What is OAuth?
- How Does OAuth Work?
- Preview the Completed `mongoose-movies` App
- Set Up the Starter Code
- Using a `.env` File to Protect "Secrets"
- The App's User Stories
- Today's Game Plan
- Code the User Stories

## Intro to Authentication

### Why We Need Authentication

An application's functionality usually revolves around a particular user.

For example, when we use online banking, or more importantly, save songs to our Spotify playlists, the application has to know who we are - and this is where **authentication** comes in.

### What is Authentication?

Authentication is what enables an application to know the **identity** of the person using it.

In SEI, we're going to learn 3 types of **authentication**:

- **Unit 2**: Logging in via a third-party provider - _OAuth_
- **Unit 3**: Session-based username/password login
- **Unit 4**: Token-based username/password login

### Authentication vs. Authorization

_Authentication_ and _authorization_ are not the same thing...

**Authentication** verifies a user's identity.

**Authorization** determines what functionality a given user can access. For example:

- Features a logged in (authenticated) user has vs. an anonymous visitor
- Features an _admin_ user has vs. some other user _role_
- Only the user that added a given comment can delete that comment

## Why OAuth?

Consider applications where we have to sign up and log in using a username and a password...

<details><summary>❓ What are the pitfalls of username/password authentication from a user's perspective?
</summary>

- Creating multiple logins requires you to remember and manage all of those login credentials.

- You will often use the same credentials across multiple sites, so if there's a security breach at one of the sites where you are a member, the hackers know that users often use the same credentials across all of their sites - oh snap!

- You are tempted to use simple/weak passwords so that you can remember all of them.
</details>

<details><summary>❓ What would be the pitfalls from a web site business's perspective?
</summary>

- Managing users' credentials requires carefully crafted security code written by highly-paid devs.

- Users (customers) are annoyed by having to create dedicated accounts, especially for entertainment or personal interest type websites.

- Managing credentials makes your business a target for hackers (internal and external) and that brings with it liability.
</details>

The bottom-line is that users prefer to use OAuth instead of creating another set of credentials to use your site.

When users are your customers, you want to make them as happy as possible!

OAuth is hot, so let's use it!

## What is OAuth?

### OAuth Vocabulary

- **[OAuth 2.0](https://oauth.net/2/)**: The current OAuth standard.  Version 1.0 is obsolete and should not be used.

- **OAuth provider**: A service company such as _Google_ that makes its OAuth authentication service available to third-party applications.

- **client application**: Our web application!  Remember, this is from an _OAuth provider's_ perspective.

- **owner**: A user of a service such as _Facebook_, _Google_, _Dropbox_, etc.

- **resources**: An _owner's_ information on a service that **may** be exposed to _client applications_. For example, a user of Dropbox may allow access to their files.

- **access token**: An temporary key that provides access to an _owner's_ _resources_.

- **scope**: Determines what _resources_ and rights (read-only, update, etc) a particular _token_ has.

### What is it?

OAuth is an open standard that provides **client applications** access to **resources** of a service such as Google with the permission of the resources' **owner**.

There are numerous OAuth Providers including:

- Facebook
- Google
- GitHub
- Twitter
- [Many more...](https://en.wikipedia.org/wiki/List_of_OAuth_providers)

### OAuth 2's Flow & Scope

<img src="https://i.imgur.com/pgb5FN9.png">

The above image, taken from [this excellent article](https://darutk.medium.com/diagrams-and-movies-of-all-the-oauth-2-0-flows-194f3c3ade85), diagrams the flow of logging in using OAuth 2.0.

The ultimate goal is for the _client application_ (our web app) to obtain an **access token** from an OAuth provider that allows the app to access the user's resources from that provider's API's.

OAuth is **token** based.  A token is a generated string of characters. 

Each token has a **scope** that determines what resources an app can access for that user.

For mongoose-movies, as is the case with many applications, we are only interested in using OAuth for identifying who the user is by accessing their basic profile info (**name**, **email** & **avatar**).

If an application needs to access more than a user's basic profile, the **scope** would need to be expanded as dictated by the specific provider's documentation on how to access additional resources.

Yes, OAuth is complex. But not to worry, we don't have to know all of the nitty gritty details in order to take advantage of it because we will be using PassportJS middleware that will handle most of the OAuth dance for us.

### ❓ OAuth Review Questions

1. **What's an advantage OAuth provides to users?**

2. **What's an advantage for web site businesses?**

3. **True or False: If your site allows users to authenticate via OAuth, you should ensure they create a "strong" password.**

4. **What is the _client application_ within the context of an OAuth provider?**

## Preview the Completed `mongoose-movies` App

Today we will be adding OAuth authentication & authorization to mongoose-movies.

Let's take a look at the what the finished app will look like...

Here's a summary of the changes to app:

- When a user logs in for the first time using Google's OAuth service, they will be added to the database using a `User` model.

- The navbar dynamically renders its links based upon whether a user is logged in or not.

- A `User --< Review` data relationship has been implemented enabling user-centric CRUD of reviews. 

## Set Up the Starter Code

1. Move to the mongoose-movies project we've been using:  `cd ~/code/mongoose-movies`

2. Sync your local code with the remote's:  `git fetch --all` then `git reset --hard origin/main`

3. Open the project in VS Code:  `code .`

4. Open an integrated terminal session:  `control + backtick`

5. Ensure the Node modules are installed: `npm i`

6. `nodemon` and browse to `localhost:3000` to test.

## Using a `.env` File to Protect "Secrets"

A `.env` file is used to provide _environment_ variables (also called config vars) such as the database's connection string and other secrets such as our app's OAuth access tokens, etc.

Environment variables allow configuration of an application's settings without changing the source code.

Because they usually hold sensitive info, `.env` files should not be pushed to GitHub and thus be Git ignored.

### Setting Up the `.env`

First, create a `.env` file in the project root:

```
touch .env
```

Install the `dotenv` Node module:

```
npm i dotenv
```

In **server.js**, require `dotenv` and call its `config()` method to "process" the `KEY=VALUE` pairs in the `.env`:

```js
// server.js

var logger = require('morgan');

// It's very important to require dotenv before any other module
// that depends upon the properties added to process.env 
require('dotenv').config();
// config/database depends upon process.env.DATABASE_URL
require('./config/database');
```

### Using a Hosted MongoDB

Instead of using a local MongoDB database, we will connect to a MongoDB hosted in the cloud so that we can see each other's reviews!

From the start of your project, you will want to use a hosted database as well and [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) is the goto cloud-based provider of MongoDB databases.

In the `.env` file, add a key of `DATABASE_URL` and assign it the database connection string value provided by yours truly:

```
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0-oxnsb.azure.mongodb.net/mongoose-movies?retryWrites=true&w=majority
```

> Note that the same Atlas cluster's connection string can be used in multiple projects by simply changing the database name, e.g., `/mongoose-movies?` can be changed to `/another-db-name`.

Okay, now let's update **config/database.js** to connect to the database specified in the `DATABASE_URL` entry:

```js
// mongoose.connect('mongodb://localhost/movies', {

mongoose.connect(process.env.DATABASE_URL, {
```

Note that every `KEY=VALUE` pair defined in `.env` will create a property on Node's `process.env` object.

> IMPORTANT:  All environment variables listed in `.env` will need to be set on the server after the app has been deployed. This will be covered when we walk-thru deployment next week.

`nodemon` doesn't watch for changes in the `.env` file, so you will have to restart it manually which results in a happy message in the server's terminal:

```
Connected to mongoose-movies at cluster0-shard-00-02-oxnsb.azure.mongodb.net:27017
```

## The App's User Stories

We'll be implementing the following user stories today:

- AAU, I want to be able to log in to the app using my Google account so that I can add reviews for a movie.

- AAU, I want to be able to delete a review that I previously created.

The following user story will be a challenge exercise:

- AAU, I want to be able to update a review that I previously created.

## Today's OAuth Game Plan

Ready for some OAuth?  Here's today's game plan:

- **Step 1:** Register our App with Google's OAuth Server
- **Step 2:** Define the `User` model
- **Step 3:** Discuss PassportJS
- **Step 4:** Install & Configure Session middleware
- **Step 5:** Install PassportJS
- **Step 6:** Create a Passport config module
- **Step 7:** Install a Passport Strategy for OAuth
- **Step 8:** Configure Passport
- **Step 9:** Define routes for authentication
- **Step 10:** Add Login/Logout UI
- **Step 11:** Code the First User Story
- **Step 12:** Add Authorization

### Step 1 - Register our App

Every OAuth provider requires that our web app be registered with it.

When we do so, we obtain a _Client ID_ and a _Client Secret_ that identifies **our application** to the OAuth provider.

For this lesson, we are going to use [Google's OAuth provider](https://developers.google.com/identity/protocols/OAuth2).

Time to register our app...

#### Step 1.1 - Google Developers Console

- You must be logged into the [console for Google's Cloud Platform Console](https://console.developers.google.com).  Here's what you'll see once logged in to the console for the first time and consent to the Terms of Service:

<img src="https://i.imgur.com/OjjoaRx.png">

#### Step 1.2 - Create a Project

- Click **Select a project**:

<img src="https://i.imgur.com/XuqQCLu.png">

- Click **NEW PROJECT**:

<img src="https://i.imgur.com/ylSC8mW.png">

- Update the **Project name** to something like `mongoose-movies`, then click **CREATE**:

<img src="https://i.imgur.com/dgKSFOG.png">

> Note: The project name must be globally unique, so Google will append and additional id to the name you provide.

- It might take a bit to create the project.  When done, click SELECT PROJECT:

<img src="https://i.imgur.com/tPviNAe.png">

#### Step 1.3 - Enable the People API

- So that we can access the user's basic profile, we'll need to enable the People API.

- Click **Go to APIs overview**: 

<img src="https://i.imgur.com/dqFFhh3.png">

- Click **+ ENABLE APIS AND SERVICES**:

<img src="https://i.imgur.com/HO1KJjY.png">

- Search for **people** and click on **Google People API** when it is visible:

<img src="https://i.imgur.com/pUEqE4y.png">

- Click **ENABLE**:

<img src="https://i.imgur.com/ylHcvQK.png">

#### Step 1.4 - Obtain Credentials for App

- Now we need to create credentials for the app. Click **CREATE CREDENTIALS**:

<img src="https://i.imgur.com/nayg9Ve.png">

- We need to obtain a **client ID** - click it:

<img src="https://i.imgur.com/PVZnJKn.png">

- Click **Configure consent screen** to setup the screen users will see in order to obtain their consent:

<img src="https://i.imgur.com/ko9DTwc.png">

- Select the **External** User Type (as of March, 2021 Google has added additional security restrictions). Click **CREATE**:

<img src="https://i.imgur.com/bKH4omj.png">

- On the next screen enter an **App name** and select your email address. **Leave the App logo blank** otherwise the app will need additional verification from Google:

<img src="https://i.imgur.com/sldvKlt.png">

- Scroll down the page.  We don't need to be concerned with **Authorized domains** when developing on localhost, however, know that we'll need to come back and add some additional configuration after we deploy.  Enter your email address that Google can contact you at and click the **SAVE AND CONTINUE** button:

<img src="https://i.imgur.com/2EB4xny.png">

- Because we aren't interested in accessing any sensitive or restricted scopes, we can simply click **SAVE AND CONTINUE**:

<img src="https://i.imgur.com/QzSMxX5.png">

- If an app needs verification from Google due to selecting sensitive/restricted scopes, you can add "test" users that can log in to your app when its publishing status is set to "Testing".  We don't need to worry though so we can just click **SAVE AND CONTINUE** one more time:

<img src="https://i.imgur.com/RMzVP2i.png">

- Because our app won't need to be verified by Google, we can advance beyond the "Testing" publishing status to "In production" by clicking **PUBLISH APP**: 

<img src="https://i.imgur.com/vVm2ovE.png">

and clicking **CONFIRM**:

<img src="https://i.imgur.com/Lwq96rd.png">

- Finally, scroll down and click **BACK TO DASHBOARD** to wrap up configuring the consent screen:

<img src="https://i.imgur.com/hwQMrqH.png">

- With the consent screen done, click **Credentials** in the side menu:

<img src="https://i.imgur.com/NvLLLY1.png">

- Click **+ CREATE CREDENTIALS** then click **OAuth client ID** in the dropdown:

<img src="https://i.imgur.com/ctMC3Dr.png">

- In the dropdown, select **Web application**, then click the **+ ADD URI** in the **Authorized redirect URIs**:

<img src="https://i.imgur.com/Va5Ef86.png">

- Type in `http://localhost:3000/oauth2callback` then press `[enter]`

<img src="https://i.imgur.com/HgADxyw.png">

> IMPORTANT: You will have to add an _**additional**_ entry in the **Authorized redirect URIs** once you have deployed your application to Heroku - something like `https://<your app name>.herokuapp.com/oauth2callback`.

#### Step 1.5 - Add the Client ID and Client Secret to `.env`

- You should now be presented with your app's credentials:

<img src="https://i.imgur.com/gSUFsJe.png">

- Let's add the credentials, along with that callback URI we provided, to the `.env` file so that it looks something like this:

	```
	DATABASE_URL=mongodb+srv://<username>:<password>@cluster0-oxnsb.azure.mongodb.net/mongoose-movies?retryWrites=true&w=majority
	GOOGLE_CLIENT_ID=245025414219-2r7f4bvh3t88s3shh6hhagrki0f6op8t.apps.googleusercontent.com
	GOOGLE_SECRET=Yn9T_2BKzxr4zgprzKDGI5j3
	GOOGLE_CALLBACK=http://localhost:3000/oauth2callback
	```

	##### Congrats on Registering your App!

- With registering our app now completed, just remember that each provider will have its own unique process.

### Step 2 - Define the `User` Model

Let's start by defining a minimal `User` model:

1. Create the Node module:

  ```
  touch models/user.js
  ```

2. Define the minimal schema, compile the schema into a `User` model and export it:

  ```js
  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  const userSchema = new Schema({
    name: String
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('User', userSchema);
  ```

We will add additional properties once we "discover" what user info Google provides us with.

### Step 3 - Passport Discussion

Implementing OAuth is complex. There are redirects going on everywhere, access tokens that only last for a short time, refresh tokens used to obtain a fresh access token, etc.

As usual, we will stand on the shoulders of giants that have done much of the heavy lifting for us - enter [PassportJS](http://www.passportjs.org/).

Passport is by far the most popular authentication framework out there for Express apps.

[Passport's website](http://passportjs.org/) states that it provides _Simple, unobtrusive authentication for Node.js_.

Basically this means that it handles much of the mundane tasks related to authentication for us, but leaves the details up to us, for example, not forcing us to configure our user model a certain way.

There are numerous types of authentication, if Passport itself was designed to do them all, it would be ginormous!

Instead, Passport uses **Strategies** designed to handle a given type of authentication. Think of them as plug-ins for Passport.

Each Express app with Passport can use one or more of these strategies.

[Passport's site](http://passportjs.org/) currently shows over 500 strategies available.

OAuth2, although a standard, can be implemented slightly differently by OAuth providers such as Facebook and Google.

As such, there are strategies available for each flavor of OAuth provider.

For this lesson, we will be using the [passport-google-oauth](https://github.com/jaredhanson/passport-google-oauth) strategy.

Passport is just middleware designed to authenticate requests.

**IMPORTANT INFO BELOW**

When a request is sent from an authenticated user, Passport's middleware will automatically add a `user` property to the `req` object.

`req.user` will be the logged in user's Mongoose document!!!

You will then be able to access the `req.user` document in all of the controller actions!

### Step 4 - Session Middleware

Before we install Passport and a strategy, we need to install the [`express-session`](https://github.com/expressjs/session?_ga=1.40272994.1784656250.1446759094) middleware.

Sessions, are a server-side way of remembering a user's browser session.

Sessions remembers the browser session by setting a cookie that contains a _session id_. No other data is stored in the cookie, just the _id_ of the session.

On the server-side, your application can store data pertaining to the user's session.

Passport will use the session, which is an in-memory data-store by default, to store a nugget of information that will allow us to lookup the user in the database.

FYI, since sessions are maintained in memory by default, if the server restarts, session data will be lost. You will see this happen when _nodemon_ restarts the server and you are no longer logged in.

#### Step 4.1 - Installing Session Middleware

Let's install the module:

```
npm install express-session
```

Next, require it below the `logger`:

```js
var logger = require('morgan');
// new code below
var session = require('express-session');
```

#### Step 4.2 - Add a SECRET to `.env`

When session middleware is configured, it will require a "secret" string that it uses to digitally sign the session cookie.  Let's add the secret to the `.env`:

```
...
GOOGLE_CALLBACK=http://localhost:3000/oauth2callback
SECRET=SEIRocks
```

#### Step 4.3 - Configure and Mount Session Middleware

Now, we can configure and mount the session middleware below the `cookieParser` middleware:

```js
app.use(cookieParser());

// new code below
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
```

Don't worry about the `resave` and `saveUninitialized` settings, they are being set to suppress deprecation warnings.

#### Step 4.4 - Verifying Session Middleware

Make sure your server is running with nodemon.

Browse to the app at `localhost:3000`.

Open the _Application_ tab in _DevTools_, then expand _Cookies_ in the menu on the left.

A cookie named `connect.sid` confirms that the session middleware is doing its job.

##### Congrats, the session middleware is now in place!

Time for a few questions...

#### ❓ Review Questions

1. **Before a web app can use an OAuth provider, it must first r__________ with it to obtain a client ____ and a client secret.**

2. **Passport uses s__________ designed to handle specific types of authentication.**

3. **If there is an authenticated user, the request (`req`) object will have what attached to it by Passport?**

### Step 5 - Install Passport

The Passport middleware is easy to install, but challenging to set up correctly.

First the easy part:

```
npm i passport
```

Require it as usual below `express-session`:

```js
var session = require('express-session');
// new code below
var passport = require('passport');
```

#### Step 5.1 - Mount Passport

With Passport required, we need to mount it. Be sure to mount it **after** the session middleware and always **before** any of the routes that would need access to the current user:

```js
// app.use(session({... code above
app.use(passport.initialize());
app.use(passport.session());
```
	
The way `passport` middleware is being mounted is straight from the docs.

### Step 6 - Create a Passport Config Module

Because it takes a significant amount of code to configure Passport, we will create a separate module so that we don't pollute **server.js**.

Let's create the file:

```
touch config/passport.js
```

In case you're wondering, although the module is named the same as the `passport` module we've already required, it won't cause a problem because a module's full path uniquely identifies it to Node.

#### Step 6.1 - Passport Module's Exports Code 

Our `config/passport` module is not middleware.

Its code will basically configure Passport and be done with it. We're not going to export anything either.

Requiring below our database is as good of a place as any in **server.js**:

```js
require('./config/database');
// new code below
require('./config/passport');
```

#### Step 6.2 - Require Passport 

In the **config/passport.js** module we will certainly need access to the `passport` module:

```js
const passport = require('passport');
```

Now on to the _strategy_...

### Step 7 - Install the OAuth Strategy

Time to install the strategy that will implement Google's flavor of OAuth:

```
npm i passport-google-oauth
```

This module implements Google's OAuth 2.0 and 1.0 API. 

Note that _OAuth 1.0_ does still exist here and there, but it's obsolete.

#### Step 7.1 - Require the OAuth Strategy

Now let's require the `passport-google-oauth` module below that of `passport` in **config/passport.js**:

```js
const passport = require('passport');
// new code below
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
```

Note that the variable is named using upper-camel-case.<br>**What does that typically hint at?**

Let's make sure there's no errors before moving on to the fun stuff!

### Step 8 - Configuring Passport

To configure Passport we will:

1. Call the `passport.use` method to plug-in an instance of the OAuth strategy and provide a _verify_ callback function that will be called whenever a user has logged in using OAuth.

2. Define a _serializeUser_  method that Passport will call after the _verify_ callback to let Passport know what data we want to store in the session to identify our user.

3. Define a _deserializeUser_ method that Passport will call on each request when a user is logged in. What we return will be assigned to the `req.user` object.

#### Step 8.1 `passport.use`

Now it's time to call the `passport.use` method to plug-in an instance of the OAuth strategy and provide a _verify_ callback function that will be called whenever a user logs in with OAuth.

In **passport.js**:

```js
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// new code below
passport.use(
  new GoogleStrategy(
    // Configuration object
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK
    },
    // The verify callback function
    function(accessToken, refreshToken, profile, cb) {
      // a user has logged in with OAuth...
    }
  )
);
```

Note the settings from the `.env` file being passed to the `GoogleStrategy` constructor function.

❓ **What is the name of the module we've been using that loads the settings from the `.env` file?**

Next we have to code the _verify_ callback function...

#### Step 8.2 - The Verify Callback

The _verify_ callback will be called by Passport when a user has logged in with OAuth.

It's called a _verify_ callback because with most other strategies we would have to verify the credentials, but with OAuth, well, there are no credentials!

In this callback we must:

- Fetch the user from the database and provide them back to Passport by calling the `cb()` callback function, or...

- If the user does not exist, we have a new user! We will add them to the database and pass along this new user in the `cb()` callback function.

But wait, how can we tell what user to lookup?

Looking at the callback's signature:

```js
function(accessToken, refreshToken, profile, cb) {
```
	
We can see that we are being provided the user's `profile` by Google.

If we were to inspect this `profile` object, we'd find the following useful properties:

- **`id`**: The user's _Google Id_ that uniquely identifies each Google account.
- **`displayName`**: The user's full name.
- **`emails`**: An array of email objects associated with the account.
- **`photos`**: An array of avatar image objects associated with the account.

Let's add these field to our `User` model's schema to hold it...

#### Step 8.3 - Modify the `User` Model

Let's add a property for `googleId` to our `userSchema` inside `models/user.js` file:

```js
const userSchema = new mongoose.Schema({
  name: String,
  googleId: {
    type: String,
    required: true
  },
  email: String,
  avatar: String
}, {
  timestamps: true
});
```

Cool, now when we get a new user via OAuth, we can use the Google `profile` object's info to create our new user!

#### Step 8.4 - Verify Callback Code

Now we need to code the callback!

We're going to need access to our `User` model:

```js
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// new code below
const User = require('../models/user');
```

Cool, here comes the code for the entire `passport.use` method. We'll review it as we type it in...

```js
passport.use(
  new GoogleStrategy(
    // Configuration object
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK
    },
    // The verify callback function
    function(accessToken, refreshToken, profile, cb) {
      // a user has logged in with OAuth...
      User.findOne({ googleId: profile.id }).then(async function(user) {
        if (user) return cb(null, user);
        // We have a new user via OAuth!
        try {
          user = await User.create({
            name: profile.displayName,
            googleId: profile.id,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value
          });
          return cb(null, user);
        } catch (err) {
          return cb(err);
        }
      });
    }
  )
);
```

#### Step 8.5 `serializeUser` & `deserializeUser` Methods

With the `passport.use` method done, we now need to code two more methods inside of `config/passport` module.

#### Step 8.6 `serializeUser` Method

The `passport.serializeUser` method is called after the verify callback function when a user logs in.

Passport passes the user document we provided to the verify callback function as an argument.

It is the job of `serializeUser` to return the nugget of data that passport is going to add to the **session** used to track the user:

```js
passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});
```

Note that we are using the MongoDB `_id` which is then passed to the `deserializeUser` method...

#### Step 8.7 `deserializeUser` Method

The `passport.deserializeUser` method is called every time a request comes in from an existing logged in user - it is this method where we return what we want passport to assign to the `req.user` object.

Code it below the `passport.serializeUser` method:

```js
passport.deserializeUser(function(userId, cb) {
  User.findById(userId).then(function(user) {
    cb(null, user);
  });
});
```

Let's do another error check.

### Step 9 - Define Routes for Authentication

We're going to need three auth related routes:

1. A route to handle the request sent when the user clicks Login with Google

2. The `/oauth2callback` route that we told Google to call after the user confirms or denies the OAuth login.

3. Lastly, we will need a route for the user to logout.

#### Step 9.1 Coding the Routes...

We're going to code these three new auth related routes in the existing `routes/index` module.

These new routes will need to access the `passport` module, so let's require it in **routes/index.js**:

```js
var router = require('express').Router();
// new code below
const passport = require('passport');
```

#### Step 9.2 Login Route

In **routes/index.js**, let's add the login route below the root route:

```js
// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));
``` 

The `passport.authenticate` function will return a middleware function that does the coordinating with Google's OAuth server.

The user will be presented the consent screen if they have not previously consented.

Note that we are specifying that we want passport to use the `google` strategy. Remember, we could have more than one strategy in use.

We are also specifying the scope that we want access to, in this case, `['profile', 'email']`.

#### Step 9.3 Google Callback Route

Below our login route we just added, let's add the callback route that Google will call after the user confirms:

```js
// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/movies',
    failureRedirect : '/movies'
  }
));
```

Note that we can specify the redirects for a successful and unsuccessful login. For this app, we will redirect to our main `/movies` route in both cases.

#### Step 9.4 Logout Route

The last route to add is the route that will logout our user:

```js
// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/movies');
});
```
	
The `logout()` method was automatically added to the `req` object by Passport!

Good time to do another error check.

### Step 10 - Add Login/Logout UI

We want the nav bar in **views/partials/header.ejs** to update dynamically depending upon whether there's an authenticated user or not:

<img src="https://i.imgur.com/TPzABUk.png">
<br>

**versus**

<img src="https://i.imgur.com/0tt4eu3.png">

#### Step 10.1 Pass `req.user` to All Views via `res.locals` & Middleware

Instead of having to pass `req.user` every time we render a template, let's take advantage of Express' [res.locals](https://expressjs.com/en/api.html#res.locals) object and a tidy custom middleware function:

In **server.js**:

```js
// Add this middleware BELOW passport middleware
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});
```

Now the logged in user is in a `user` variable that's available inside all EJS templates!

If nobody is logged in, `user` will be `undefined`.

#### Step 10.2 Add the Login / Logout UI Logic

We're going to use an `if`/`else` block in the EJS to dynamically render the nav links depending upon whether there is a logged in user or not.

Here's the updated `<nav>` element in **partials/header.ejs**:

```html
<nav>
  <img src="/images/camera.svg">
  <a href="/movies" <%- title === 'All Movies' ? 'class="active"' : '' %>>ALL MOVIES</a>
  <% if (user) { %>
    <a href="/performers/new"	<%- title === 'Add Performer' ? 'class="active"' : '' %>>
		ADD PERFORMER</a>
    <a href="/movies/new" <%- title === 'Add Movie' ? 'class="active"' : '' %>>ADD MOVIE</a>
    <a href="/logout">LOG OUT</a>
  <% } else { %>
    <a href="/auth/google" class="login">LOG IN&nbsp;<img src="https://i.imgur.com/FHjYyi0.png"></a>
  <% } %>
</nav>
```

There's a `class="login"` in use - let's update **public/stylesheets/style.css**:

```css
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 34px;
}

.login img {
  height: 30px;
}
```

#### Step 10.3 Try Logging In!

We've finally got to the point where you can test out our app's authentication!

May the force be with us!

### Step 11 - Code the User Stories

Our first user story reads:

> AAU, I want to be able to log in to the app using my Google account so that I can add reviews for a movie.

We already have a `<form>` for creating reviews on the **views/movies/show.ejs** template.

However, we **only** want this UI to show when there's a logged in user.

#### Step 11.1 Hide/Show the `<form>` for Adding Reviews

#### 💪 Exercise (2 minutes)

- Using an `<% if %>` EJS block in **views/movies/show.ejs**, render the `<form>` for adding a review ONLY if there's a logged in user.

#### Step 11.2 Update the `reviewSchema`

We're going to make three changes to the `reviewSchema`:

1. Add a `user` property that references the user that created the review.
2. To make it more efficient to display the user's name that created the review, we're also going to add a `userName` property to avoid having to populate reviews just to display the user's name with them.
3. Similar to above, let's also add a `userAvatar` property.

Here's the updated **models/movie.js**:

```js
const reviewSchema = new Schema({
  content: {type: String, required: true},
  rating: {type: Number, min: 1, max: 5, default: 5},
  // Add the two new properties below
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  userName: String,
  userAvatar: String
}, {
  timestamps: true
});
```

#### Step 11.3 Update the `create` action in the Reviews controller

Much of an application's CRUD data operations pertain to the logged in user.

The [Guide to User-Centric CRUD using Express & Mongoose](https://gist.github.com/jim-clark/a714016bab26fad52106f6b2490e3eb7) will prove very helpful when coding your projects.

We've already added the necessary properties to the `reviewSchmea`, now let's update the `create` action in the **controllers/reviews.js** controller:

```js
function create(req, res) {
  // Find the movie to embed the review within
  Movie.findById(req.params.id, function(err, movie) {

    // Add the user-centric info to req.body (the new review)
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    // Push the subdoc for the review
    movie.reviews.push(req.body);
    // Always save the top-level document (not subdocs)
    movie.save(function(err) {
      res.redirect(`/movies/${movie._id}`);
    });
  });
}
```

> Remember: `req.user` is the logged in user's Mongoose document!

#### Step 11.4 Update How Reviews are Being Displayed

Here's the updated **views/movies/show.ejs** that displays the user's name and avatar with each review:

```html
<table>
  <thead>
    <tr>
      <th>User</th>
      <th>Date</th>
      <th>Review</th>
      <th>Rating</th>
    </tr>
  </thead>
  <tbody>
    <% let total = 0 %>
    <% movie.reviews.forEach(function(r) { %>
      <% total += r.rating %>
      <tr>
        <td class="review-user"><img src="<%= r.userAvatar %>"><%= r.userName %></td>
        <td><%= r.createdAt.toLocaleDateString() %></td>
        <td><%= r.content %></td>
        <td><%= r.rating %></td>
      </tr>
    <% }); %>
    <tr>
      <td colspan="3"></td>
      <td><strong><%= (total / movie.reviews.length).toFixed(1) %></strong></td>
    </tr>
  </tbody>
</table>
```

Sprinkle in the the following CSS:

```css
.review-user {
  display: flex;
  justify-content: center;
  align-items: center;
}

.review-user img {
  border-radius: 50%;
  height: 40px;
}
```

#### Step 11.5 Test the First User Story

That should take care of our first user story - try it out!

Yes, the UX is not that great because of the full-page refresh, but we'll address that when we develop single-page apps with React.

#### Step 11.6 Code the Next User Story

Our next user story reads:

> AAU, I want to be able to delete a review that I previously created.

We want to ensure that only the user that created a review can delete it.

As usual, we'll follow the 5 steps to add delete functionality...

##### Step 1 - Determine the Proper Route

**❓ What is the proper route to delete a review?**

##### Step 2 - Display the UI to Send the HTTP Request

Nothing fancy...

Again, in **views/movies/show.ejs**:

```html
...
        <th>Rating</th>
        <!-- Add this placeholder header cell -->
        <th></th>
...
          <td><%= r.rating %></td>
          <!-- Add this td -->
          <td>
            <% if (user && user._id.equals(r.user)) { %>
              <form action="/reviews/<%= r._id %>?_method=DELETE" method="POST">
                <button type="submit">X</button>
              </form>
            <% } %>
          </td>
```

The `equals()` method is available on ObjectIds and is being used to compare the `_id`s - this is necessary because they are objects.

Also, the `(user && ...` in `if (user && user._id.equals(r.user))` prevents an error when there's no `user` logged in.  If, it was just `if (user._id.equals(r.user))` an error would occur due to attempting to access an `_id` property on `undefined`.

Lastly, looks like we need to install and mount `method-override` middleware:

```
npm i method-override
```

Require it:

```js
// server.js

var passport = require('passport');
// Add the line below 
var methodOverride = require('method-override');
```

Now let's mount it:

```js
app.use(cookieParser());
// Add the line below
app.use(methodOverride('_method'));
```

##### Step 3 - Define the Route

**💪 Exercise (1 min)**

- Add the new route to **routes/reviews.js** router.

**You got this!**

##### Step 4 - Code the `delete` Action

It's not enough to just hide the delete button when the review does not belong to the logged in user.

We should validate ownership in the controller action as well.  Again, using the [Guide to User-Centric CRUD using Express & Mongoose](https://gist.github.com/jim-clark/a714016bab26fad52106f6b2490e3eb7)...

```js
// controllers/reviews.js

// Include the next parameter - used for error handling in the catch
function deleteReview(req, res, next) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  Movie.findOne({'reviews._id': req.params.id}).then(function(movie) {
    // Find the review subdoc using the id method on Mongoose arrays
    // https://mongoosejs.com/docs/subdocs.html
    const review = movie.reviews.id(req.params.id);
    // Ensure that the review was created by the logged in user
    if (!review.user.equals(req.user._id)) return res.redirect(`/movies/${movie._id}`);
    // Remove the review using the remove method of the subdoc
    review.remove();
    // Save the updated movie
    movie.save().then(function() {
      // Redirect back to the movie's show view
      res.redirect(`/movies/${movie._id}`);
    }).catch(function(err) {
      // Let Express display an error
      return next(err);
      // res.redirect(`/movies/${movie._id}`);
    });
  });
}
```

> Note:  If you provide a non-`null` argument when calling `next()`, an error propagates through the Express framework which results in the built-in **views/error.ejs** error page displaying.

##### Step 5 - Render or Redirect

Already done in the above code!

Test it out!

Cool, just one step left!

### Step 12 - Authorization

**❓ What is _authorization_?**

We've already coded some client-side authorization by:

- Conditionally displaying the `<form>` used to add reviews.
- Showing the delete button for only the reviews created by the logged in user.

We also performed a bit of server-side authorization by ensuring that the logged in user was the owner of the review being deleted.

In this step, we will see how we can easily protect the routes that require a user to be logged in, e.g., adding a movie or review.

Passport adds a nice method to the `req` object, `req.isAuthenticated()` that returns `true` or `false` depending upon whether there's a logged in user or not.

We're going to write our own little middleware function to take advantage of `req.isAuthenticated()` to perform some authorization.

#### Step 12.1 Authorization Middleware

As we know by now, Express's middleware and routing is extremely flexible and powerful.

We can actually add multiple middleware functions before a route's final middleware function!

Let's modify **routes/movies.js** to see this in action:

```js
router.get('/', moviesCtrl.index);
// Use isLoggedIn middleware to protect routes
router.get('/new', isLoggedIn, moviesCtrl.new);
router.get('/:id', moviesCtrl.show);
router.post('/', isLoggedIn, moviesCtrl.create);
```

Note the inserted `isLoggedIn` middleware function!

If the `isLoggedIn` middleware calls `next()`, then the next middleware, e.g., `moviesCtrl.new` will be called.

#### Step 12.2 Authorization Middleware

Since we want to protect routes defined in multiple modules, we'll want to stay DRY and code the middleware function in its own module.

```
touch config/auth.js
```

We only want to export a single thing, a middleware function.  Thus, the best approach is to **assign** the function to `module.exports` as follows:

```js
// auth.js

// Middleware for routes that require a logged in user
module.exports = function isLoggedIn(req, res, next) {
  // Pass the req/res to the next middleware/route handler
  if ( req.isAuthenticated() ) return next();
  // Redirect to login if the user is not already logged in
  res.redirect('/auth/google');
}
```

Our custom `isLoggedIn` middleware function, like all middleware, will either call `next()`, or respond to the request.

Now all we have to do is require it:

```js
// routes/movies.js

const moviesCtrl = require('../controllers/movies');
// Require the auth middleware
const isLoggedIn = require('../config/auth');
```

Test it out by logging out, and manually attempting to browse to `http://localhost:3000/movies/new`.  Very cool!

**💪 Exercise (3 mins)**

- Protect the appropriate routes in:
  - **routes/performers.js**
  - **routes/reviews.js**

#### Congrats on implementing OAuth authentication and authorization!

Now you're ready to start your project and implement OAuth authentication before any other CRUD functionality.

## Challenge Exercise (optional)

As an optional challenge exercise, use the [Guide to User-Centric CRUD using Express & Mongoose](https://gist.github.com/jim-clark/a714016bab26fad52106f6b2490e3eb7) to help you implement the following user story:

> AAU, I want to be able to update a review that I previously created.

## References

- [Google OAuth2](https://developers.google.com/identity/protocols/OAuth2)

- [Guide to User-Centric CRUD using Express & Mongoose](https://gist.github.com/jim-clark/a714016bab26fad52106f6b2490e3eb7)

- [Mongoose](http://mongoosejs.com/)
