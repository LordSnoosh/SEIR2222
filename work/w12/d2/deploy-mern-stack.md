<img src="https://i.imgur.com/is8jF9z.jpg">

# Deploying a MERN-Stack App to Heroku

Because we've wisely integrated the frontend (React) and the backend (Express) into a single project/repo, deploying to Heroku will be swift.

In fact, with one minor exception, deploying your MERN-Stack project will be identical to Unit 2's deployment of your Node/Express project.

## Testing the Production Code Locally

Before deploying for the first time to Heroku, it's not a bad idea to test your production code locally following this process:

1. Update React's production code that's in the **build** folder: `npm run build`.
2. Start the Express server: `node server`
3. There's no need to run the React Dev Server as with during development. The Express app running on `localhost:3001` delivers the built React app from the **build** folder - so simply browse to `localhost:3001` to check out the production version of the app!

<img src="https://i.imgur.com/33fPRGx.png">

> Note: Because the browser's local storage isolates data based upon the page's origin (`protocol://host:port`), it's likely that you'll need to log in unless you've previously logged in on `localhost:3001`.

Be sure to troubleshoot any issues before deploying.

> IMPORTANT: Testing locally will not catch protocol and folder/file casing issues (refer to Unit 1's deployment guide in week 3 for more info).

With the MERN-Stack app tested, we're almost ready to deploy to Heroku...

## Add a `Procfile`

Compared to deployment in Unit 2, adding a **Procfile** is the only additional step required.

By default, Heroku runs the `"start"` script that's in the **package.json** immediately after each deployment.

However, if we take a look, we'll see that the `"start"` script runs React's dev server:

```
"scripts": {
  "start": "react-scripts start",  <---< Not what we want
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
},
```

Instead, we need Heroku to start the Express server (`node server.js`).

We can tell Heroku to ignore the `"start"` script by including a **Procfile** in the root of the project. Heroku will then use the **Procfile** to determine how to start the app.

So yes, we need to create a **Procfile** (named with an uppercase "P" and without a file extension):

```
touch Procfile
```

Then, a single line inside **Procfile** takes care of informing Heroku how to boot the Express app:

```
web: node server.js
```

Before deploying, we'll need to commit the **Procfile**:

```
git add -A
git commit -m "Deploy"
```

## Building the React App on Heroku

The production-ready code that we tested out locally lives in the **build** folder. However, the **build** folder is git ignored and thus will not be pushed to Heroku.

So, the production code needs to be built on Heroku...

Thankfully, when JS apps are deployed, Heroku automatically runs the `"build"` script if it exists, which it does!

> Note: If you use a different hosting platform, be sure to verify that the React app is going to be built.

## Create the App in Your Heroku Account

Now let's use the Heroku CLI to create the project in your Heroku dashboard:

```
heroku create <optional_preferred_subdomain>
```

> Note: It's highly recommended to name your project/subdomain with a name relevant to your project.  Using hyphens may help if the name you prefer is already taken.

The above command created a git remote named `heroku` that we push to in order to deploy...

## Deploy to Heroku

As you know, deploying and redeploying to Heroku is as easy as pushing the "production" branch (`main` or `master`) to the `heroku` remote:

```
git push heroku main
```

> Note: Heroku has recently added support for deploying a branch named `main`.

## Set the Environment Variables on Heroku

The last step is to ensure that the KEY=VALUE pairs in the **.env** file are set on the Heroku deployment.

No different than with the two previous projects deployed to Heroku. For each KEY=VALUE:

```
heroku config:set <Your Key>=<The Value>
```

> Note: If using zsh, it may be necessary to quote the KEY=VALUE pair and escape special characters like exclamations using a backslash, for example:<br>
> `heroku config:set "heroku config:set "SECRET=SEIRocks\!"`

With **all** of the environment variables set on Heroku, you should be able to browse to the app!

## Open the App

```
heroku open
```

Now everyone can start ordering those Mai Tais!

