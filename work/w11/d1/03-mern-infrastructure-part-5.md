<img src="https://i.imgur.com/IKHxRMa.png">

# MERN-Stack Infrastructure - Part 5

## Learning Objectives

|Students Will Be Able To:|
|---|
| Describe the Benefits of Token-Based Authentication |
| Create a JSON Web Token that Includes the User's Data |

## Road Map

- The Plan - Part 5
- Infrastructure - Part 5 of 7

## The Plan - Part 5

In Part 5 we will continue to implement user authentication.

**Part 5 - Implementing Token-Based Auth (continued):**
  1. Discuss token-based authentication
  2. Add the `User` model
  3. Implement the `create` (sign-up) controller action

## 1. Discuss Token-Based Authentication

### What is Token-Based Authentication?

Token-based authentication uses a string of characters, a token, to identify who a request sent to the server is coming from.

There are different types of token-based authentication, in fact, Unit 2's OAuth used tokens obtained by the OAuth provider.

A [JSON Web Token (JWT)](https://jwt.io/introduction/) is the most popular type of token used in SPAs because of the advantages it provides...

### Advantages of Token and JWT-Based Authentication

Since a token itself is used to identify the user to the web server, the web server does not need to maintain sessions which require server resources and thus not as scalable as token-based auth.

The stateless nature of token-based auth allows the implementation of single sign-on (SSO) - where the same token can be used to access several different applications, for example, Google Mail, Google Docs, etc.  

Also, since sessions require the use of cookies, session-based auth cannot be used outside of browser apps. Because token-based auth does not require sessions, it can be used in applications running outside of browsers such as desktop and native mobile apps (cookies are a browser feature).

A [JSON Web Token (JWT)](https://jwt.io/introduction/) can contain a data payload including any data we wish. Typically we include data about the user in the payload so there's no need to query the database (an expensive operation) for the user every time a request hits the server.  This is way more efficient than with session-based auth.

We will only have to query the database for the user document/record if we need to modify the user or obtain additional information from the user that is not included in the JWT!

### What's a JSON Web Token (JWT)?

A JSON Web Token is a single encoded (not encrypted) string. Encryption makes the data completely unreadable until it's decrypted using keys, whereas, encoding simply converts one data format to another.

Some facts about JWTs:

- The token can contain whatever custom data (called _claims_) we want to put in it.
- The token is cryptographically _signed_ by the server when it is created so that if the token is changed in any way, it is considered invalid.
- The token is encoded, but **not encrypted**.  It is encoded (converted) using a standard known as [base64url](https://en.wikipedia.org/wiki/Base64) encoding so that it can be serialized across the internet or even be included in a URL's _querystring_. It may seem that encoded data is "secret" - it's not as you'll soon see!

Here's how a JWT is structured:

<img src="https://i.imgur.com/IXByEPP.png">

There is a great website dedicated to JWTs that explains them in detail and provides a playground to create them:  [https://jwt.io/](https://jwt.io/)

Let's take a JWT from the website and demonstrate that the token can be easily decoded in the browser's console:

```js
> const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
> const payload = jwt.split('.')[1]  // only interested in the payload (claims)
> atob(payload)
< "{"sub":"1234567890","name":"John Doe","admin":true}"
```
> The `atob()` method decodes a base-64 encoded string and `btoa()` base-64 encodes data.

Because the data in a JWT can be easily read, it's important not to include sensitive/secret data such as Social Security Numbers, etc.

Okay, JWT-based auth is cool, let's see how we use them in a SPA...

### Typical Token-Based Flow in a SPA

The following depicts the typical flow of JWT-based auth in a SPA:

<img src="https://i.imgur.com/3quZxs4.png">

Additional clarification on the above steps:

- STEP 1: Applies to logging in and signing up.
- STEP 2: The JWT is created only after the login credentials have been validated, or the visitor signing up has been saved to the database.
- STEP 3: After the JWT has been received by the client, it needs to be persisted, usually in local storage, so that it can be sent in future requests as needed (STEP 4).
- STEP 4: We will be including the JWT with any request that needs to be authenticated on the server.
- STEP 5: We will write a tidy middleware function used to validate the token and add the user data to Express's `req` object - cool beans for sure!

## Add the `User` Model

We need a `User` model so that we can save the user to the DB when they sign up and retrieve the user from the DB to validate their credentials when they log in.

### Create the **models/user.js**

Remember, the naming convention for model modules is singular:

```
touch models/user.js 
```

Now let's add the typical boilerplate for the schema, then compile and export the model:

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

});

module.exports = mongoose.model('User', userSchema);
```

### Add the Properties for the `User` Model

We'll just add the minimum required for authentication:

```js
const userSchema = new Schema({
  name: {type: String, required: true},
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    minLength: 3,
    required: true
  }
});
```

There's some nice validations and transformations in there, for example:

- `unique`: Although technically not a validator, `unique: true` creates a unique index in the database which will trigger an error if violated.
- `trim`: This transform causes Mongoose to trim spaces before and after the string before saving.
- `lowercase`: This transform causes Mongoose to convert the string to lowercase before saving.

### Be Cautious When Adding Additional Properties to the `User` Model

Feel free to add additional properties/attributes about the user in your projects.  However, **do not add properties used to embed related data or reference 1:M/M:M relationships!**. These properties should be added to the related models instead!

> IMPORTANT:  Keeping the User model lean is always a good practice. However, it's especially important with JWT-based authentication because the user document will be the data payload included in the JWT and you don't want the JWT to be bigger than it has to be!

### Add the Options for the `User` Model

Without looking at the code below...

<details><summary>❓ What's the option property we like to add to every schema?</summary>
<p>

**The `timestamps: true` property.**

</p>
</details>

Let's add it:

```js
...
  password: {
    type: String,
    trim: true,
    minLength: 3,
    required: true
  }
}, {
  timestamps: true
});
```

In addition to `timestamps`, let's add the `toJSON` option that is used to transform the document when it's serialized to JSON (converted to a string):

```js
...
}, {
  timestamps: true,
  // Even though it's hashed - don't serialize the password
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});
```

### Automatically Hashing the Password

We never want to store passwords as plain text, known as "clear text".

Instead, we need to hash the password anytime it has changed and store the hash instead.

Hashing is a one-way process which makes it **impossible** to revert back to the clear text password.

<details><summary>❓ If the hash cannot be un-hashed back to the original password, how will we be able to verify the user's clear text password when logging in?</summary>
<p>

**By hashing the password and comparing the two hashes** 😊

</p>
</details>

We _could_ write the code to hash the password in the controller function(s), but the better practice is to make the model itself responsible so that we never have to worry about it anytime a user's password is changed.

Let's add a Mongoose **pre-save hook** ([Mongoose middleware](https://mongoosejs.com/docs/middleware.html)) that will hash the password anytime the password has changed:

```js
// models/user.sj

...

userSchema.pre('save', function(next) {
  // Save the reference to the user doc
  const user = this;
  if (!user.isModified('password')) return next();
  // password has been changed - salt and hash it
  bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
    if (err) return next(err);
    // Update the password property with the hash
    user.password = hash;
    return next();
  });
});

module.exports = mongoose.model('User', userSchema);
```

The `SALT_ROUNDS` variable determines how much processing time it will take to perform the hash. Let's define it near the top of the module:

```js
// models/user.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SALT_ROUNDS = 6;  // 6 is a reasonable value
```

Next, we need to install and require the [`bcrypt` library](https://www.npmjs.com/package/bcrypt) used to hash data.

> Note: The bcrypt library is available for virtually every programming language.

Be careful of the spelling...

```
npm i bcrypt
```

Add it to the top of the module:

```js
// models/user.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Add the bcrypt library
const bcrypt = require('bcrypt');
```

Yay - we're done coding the `User` model!

Let's add it to **crud-helper.js** and test it out...

### Test Drive the User Model

First, let's uncomment the following two lines in **crud-helper.js**:

```js
const User = require('./models/user');
// const Item = require('./models/item');
// const Category = require('./models/category');
// const Order = require('./models/order');

// Local variables will come in handy
let u, i, c, o;
```

Feel free sit back and observe...

```
mern-infrastructure[master*] % node
Welcome to Node.js v15.2.0.
Type ".help" for more information.
> .load crud-helper.js
// Connect to the database
require('dotenv').config();
require('./config/database');
 
// Require the Mongoose models
const User = require('./models/user');
// const Item = require('./models/item');
// const Category = require('./models/category');
// const Order = require('./models/order');
 
// Local variables will come in handy
let u, i, c, o;
 
 
{}
> Connected to mern-infrastructure at localhost:27017

> User.create({
... name: 'Laura',
... email: 'laura@email.com',
... password: 'abcd'
... }).then(user => u = user)
Promise { <pending> }
> u
{
  _id: 6003389c334a04950d6dc0de,
  name: 'Laura',
  email: 'laura@email.com',
  password: '$2b$06$bU291F/dj37tJBgvdd3Hgu/a.CMKFHn/dOaP6IxDe.d3orRhOGrM2',
  createdAt: 2021-01-16T19:03:56.642Z,
  updatedAt: 2021-01-16T19:03:56.642Z,
  __v: 0
}
> JSON.stringify(u)
'{"_id":"6003389c334a04950d6dc0de","name":"Laura","email":"laura@email.com","createdAt":"2021-01-16T19:03:56.642Z","updatedAt":"2021-01-16T19:03:56.642Z","__v":0}'
> u.password = 'abcd1234'
'abcd1234'
> u.save()
Promise { <pending> }
> u
{
  _id: 6003389c334a04950d6dc0de,
  name: 'Laura',
  email: 'laura@email.com',
  password: '$2b$06$kA5M6FY2JvpuQUjjT6gRze5SztUUvuvl6i2P921YXlzioWohHKQVG',
  createdAt: 2021-01-16T19:03:56.642Z,
  updatedAt: 2021-01-16T19:05:37.618Z,
  __v: 0
}
> .exit
```

Now you can see why it's better to make the model responsible for the hashing instead of some controller somewhere!

Questions?

## 3. Implement the `create` (Sign-Up) Controller Action

Previously we baby stepped the `create` action in the users controller to simply send back a mocked user object when a user signed up.

Now it's time to get real and:

1. Add the user to the database.
2. Create the JWT.  We'll include a `user` property in the JWT's payload containing the user's document data.
3. Send the JWT to the client using `res.json()`

### Add the User to the Database

We need to require the `User` model before we can create users.

#### 💪 Practice Exercise (1 minute)

- Require the `User` model in **controllers/api/users.js**.

<hr>

<details><summary>❓ In the <code>create</code> controller action, how do we access the data sent by the client in the request? </summary>
<p>

**`req.body`**

</p>
</details>

As promised, we'll be using `async`/`await` with promises, so let's set up error handling in the following refactor:

```js
// controllers/api/users.js

function create(req, res) {
  try {
    // Add the user to the database
    const user = await User.create(req.body);
    
  } catch (err) {
    // Client will check for non-2xx status code 
    // 400 = Bad Request
    res.status(400).json(err);
  }
}
```

<details><summary>❓ The above code causes a syntax error in the Express server because we forgot to add something - what?</summary>
<p>

**Add `async` in front of `function` to make it an async function.**

</p>
</details>

Make that fix.

Now we're ready to create the JWT!

### Create the JWT

We're going to need to install another Node module for creating and verifying JWTs.

[https://jwt.io](https://jwt.io) lists libraries available for your programming language of choice.

The Node module we need to install and require is named `jsonwebtoken`.

#### 💪 Practice Exercise (1 minute)

1. Install the `jsonwebtoken` Node module.
2. Require the new module in the users controller but shorten the name of the variable to `jwt`.

<hr>

Creating a JWT requires a "secret" string used for "signing" the JWT. 

Let's define one in our **.env** file:

```
DATABASE_URL=mongodb://localhost/mern-infrastructure
SECRET=SEIRocks!
```

The `sign` method in the **jsonwebtoken** library is used to create JWTs.

Let's add a `createJWT` helper function at the bottom of **controllers/api/users.js** that we can use both when a user signs up and when they log in:

```js
/*-- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}
```

> Note: There are several ways to specify the expiration of the JWT. Check [the docs](https://www.npmjs.com/package/jsonwebtoken) for more info.

Cool. Now let's use the `createJWT` function in the `create` action and send back the newly created JWT:

```js
async function create(req, res) {
  try {
    // Add the user to the database
    const user = await User.create(req.body);
    // token will be a string
    const token = createJWT(user);
    // Yes, we can use res.json to send back just a string
    // The client code take this into consideration
    res.json(token);
  } catch (err) {
    // Client will check for non-2xx status code 
    // 400 = Bad Request
    res.status(400).json(err);
  }
}
```

Now for the moment of truth - sign up and verify that the token string is logged to the Console:

<img src="https://i.imgur.com/MJdTTmV.png">

Remember the demo earlier when we decoded the payload of the JWT?  Check it out!

<img src="https://i.imgur.com/uaiERcy.png">

#### Congrats! On to the lab!

